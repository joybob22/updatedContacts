import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../service/contactService";

@Component ({
  templateUrl: 'specificContact.html'
})

export class SpecificContactComponent {
  contactIndex;
  contactID;
  contacts;

  constructor(private _route: ActivatedRoute, private contactService: ContactService) {
    this.contactID = _route.snapshot.params['id'];
    contactService.getContacts().then((newInfo) => {
      this.contacts = newInfo;
      this.findContactIndex();
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
}
