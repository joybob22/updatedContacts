import { Component } from '@angular/core';
import {ContactService} from "../../service/contactService";

@Component ({
  templateUrl: 'createContact.html'
})

export class CreateContactComponent {

  firstName;
  lastName;
  phoneNumber;
  address;

  constructor(private contactService: ContactService){}

  submitNewContact() {
    if (this.firstName && this.lastName && (this.firstName != "" && this.firstName != " ") && (this.lastName != "" && this.lastName != " ")) {
      let newContact = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        address: this.address
      };

      this.contactService.addNewContact(newContact);

      this.firstName = "";
      this.lastName = "";
      this.phoneNumber = "";
      this.address = "";

    }
  }
}
