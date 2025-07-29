import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact } from './contact.entity';
import { ContactChannel } from 'src/contact-channel/contact-channel.entity';
import { User } from 'src/users/user.entity';
import { CreateContactInput } from './dto/create-contact.input';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  async createContact(
    input: CreateContactInput,
    userId: string,
  ): Promise<Contact> {
    return await this.contactsRepository.manager.transaction(
      async (manager) => {
        const user = await manager.findOne(User, { where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }

        const contact = manager.create(Contact, {
          name: input.name,
          user,
        });

        const savedContact = await manager.save(Contact, contact);

        let savedContactChannels: ContactChannel[] = [];
        if (input.contactChannels && input.contactChannels.length > 0) {
          const contactChannels = input.contactChannels.map((channel) =>
            manager.create(ContactChannel, {
              ...channel,
              contact: savedContact,
            }),
          );

          savedContactChannels = await manager.save(
            ContactChannel,
            contactChannels,
          );
        }

        savedContact.contactChannels = savedContactChannels;
        return savedContact;
      },
    );
  }
}
