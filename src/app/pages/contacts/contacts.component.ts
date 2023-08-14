import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactResponse } from 'src/app/services/models/contact-response';
import { ContactsService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: ContactResponse[] = [];

  contactIdToDelete: number | undefined;

  constructor(
    private router: Router,
    private contactService: ContactsService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.fetchAllContacts();
  }

  newContact() {
    this.router.navigate(['contacts', 'manage']);
  }

  private fetchAllContacts(): void {
    this.contactService.findAll3({'user-id': this.tokenService.getUserId})
      .subscribe({
        next: (data) => {
          this.contacts = data;
        }
      })
  }

  editContact(id: number | undefined) {
    this.router.navigate(['contacts', 'manage', id])
  }

  saveContactId(contactId: number | undefined) {
    this.contactIdToDelete = contactId;
  }

  cancelDelete() {
    this.contactIdToDelete = undefined;
  }

  confirmDelete() {
    if (this.contactIdToDelete) {
      this.contactService.delete({'contact-id': this.contactIdToDelete})
        .subscribe({
          next: () => {
            this.fetchAllContacts();
          }
        })
    }
  }
}
