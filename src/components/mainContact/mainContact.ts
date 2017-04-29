import { Component } from '@angular/core';
import {ContactService} from "../../service/contactService";

@Component ({
  templateUrl: 'mainContact.html'
})

export class MainContactComponent {

  contacts = [];
  searchParam = "";
  constructor(private contactService: ContactService){
    contactService.getContacts().then((newInfo) => {
      this.contacts = newInfo;
    });
  }

  deleteContact(index) {
    this.contactService.deleteContact(index).then(() => {
      this.contactService.getContacts().then((data) => {
        this.contacts = data;
      })
    })
  }

  sortContacts() {
    if(this.searchParam !== "") {
      this.contactService.sortContacts(this.searchParam).then((data) => {
        this.contacts = data;
      })
    } else {
      this.contactService.getContacts().then((newInfo) => {
        this.contacts = newInfo;
      })
    }

  }

}
