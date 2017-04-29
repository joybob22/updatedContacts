import { Component } from '@angular/core';
import {ContactService} from "../../service/contactService";
import {ActivatedRoute} from "@angular/router";

@Component ({
  templateUrl: 'editContact.html'
})

export class EditContactComponent {
  contactIndex;
  contactID;
  contacts;
  firstName;
  lastName;
  phoneNumber;
  address;
  updated = false;

  constructor(private _route: ActivatedRoute, private contactService: ContactService) {
    this.contactID = _route.snapshot.params['id'];
    contactService.getUnsortedContacts().then((newInfo) => {
      this.contacts = newInfo;
      console.log(this.contacts);
      this.findContactIndex();
      this.firstName = this.contacts[this.contactIndex].firstName;
      this.lastName = this.contacts[this.contactIndex].lastName;
      this.phoneNumber = this.contacts[this.contactIndex].phoneNumber;
      this.address = this.contacts[this.contactIndex].address;
    })
  }

  findContactIndex() {
    for(let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id == this.contactID) {
        this.contactIndex = i;
        break;
      }
    }
  }

  editContact() {
    var newContact = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      id: this.contacts[this.contactIndex].id
    };
    this.contacts[this.contactIndex] = newContact;
    let updateContact = {contacts: this.contacts};
    this.contactService.editContact(updateContact).then((worked) => {
      if(worked) {
        this.updated = true;
      }
    });
  }
}
