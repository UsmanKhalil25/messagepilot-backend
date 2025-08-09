import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ContactType } from '../enums/contact-type.enum';

@InputType()
export class CreateContactChannelInput {
  @Field(() => ContactType)
  @IsEnum(ContactType)
  type: ContactType;

  @Field()
  @IsString()
  @IsNotEmpty()
  value: string;
}
