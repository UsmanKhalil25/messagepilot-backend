import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Contact } from '../contact.entity';
import { CreateContactInput } from '../inputs/create-contact.input';

@ObjectType()
export class BulkCreateContactError {
  @Field(() => Int)
  index: number;

  @Field(() => CreateContactInput)
  contact: CreateContactInput;

  @Field()
  error: string;
}

@ObjectType()
export class BulkCreateContactSummary {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  successful: number;

  @Field(() => Int)
  failed: number;
}

@ObjectType()
export class BulkCreateContactResponse {
  @Field(() => [Contact])
  created: Contact[];

  @Field(() => [BulkCreateContactError])
  errors: BulkCreateContactError[];

  @Field(() => BulkCreateContactSummary)
  summary: BulkCreateContactSummary;
}
