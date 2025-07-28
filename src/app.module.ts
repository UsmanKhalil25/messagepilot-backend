import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ContactsModule } from './contacts/contacts.module';
import { ContactMethodsModule } from './contact-methods/contact-methods.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        synchronize: configService.get('database.synchronization'),
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        graphiql: true,
        context: ({ req, res }) => ({ req, res }),
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    AuthModule,
    UsersModule,
    CampaignsModule,
    ContactsModule,
    ContactMethodsModule,
  ],
})
export class AppModule {}
