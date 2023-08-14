import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactRequest, ContactResponse } from 'src/app/services/models';
import { ContactsService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-manage-contacts',
  templateUrl: './manage-contacts.component.html',
  styleUrls: ['./manage-contacts.component.scss']
})
export class ManageContactsComponent implements OnInit {

  contactRequest: ContactRequest = {
    email: '',
    firstName: '',
    iban: '',
    lastName: '',
    userId: -1
  };

  errorMsgs: string[] = [];

  private contactId: number | undefined;

  title = 'Create Contact';

  constructor(
    private router: Router,
    private contactsService: ContactsService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.contactId = this.activatedRoute.snapshot.params['id'] as number;

    if (this.contactId) {
      this.title = 'Update Contact';
      this.contactsService.findById1({'contact-id': this.contactId})
        .subscribe({
          next: (data) => {
            this.contactRequest = this.transform(data);
          }
        })
    }
  }

  cancel() {
    this.router.navigate(['contacts']);
  }

  save() {
    this.contactRequest.userId = this.tokenService.getUserId;
    this.contactsService.save2({body: this.contactRequest})
      .subscribe({
        next: () => {
          this.router.navigate(['contacts']);
        },
        error: (err) => {
          this.errorMsgs = err.error.validationErrors;
        }
      })
  }

  private transform(contact: ContactResponse): ContactRequest {
    return <ContactRequest> {
      id: contact.id,
      userId: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      iban: contact.iban
    }
  }
}
