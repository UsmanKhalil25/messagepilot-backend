import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactMethod } from './contact-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMethod])],
})
export class ContactMethodsModule {}
