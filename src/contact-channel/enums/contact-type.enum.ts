import { registerEnumType } from '@nestjs/graphql';
export enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone',
}

registerEnumType(ContactType, {
  name: 'ContactType',
});
