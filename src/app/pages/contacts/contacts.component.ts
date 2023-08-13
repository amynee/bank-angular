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
}
