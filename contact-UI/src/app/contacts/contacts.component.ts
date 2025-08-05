import { Component, OnInit } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[] = [];

  contact: Contact = { id: 0, name: '', email: '', phone: '' };
  child: Contact = { id: 0, name: '', email: '', phone: '' };

  isEditingParent = false;
  isEditingChild = false;
  selectedParentIdForChild = 0;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  saveParent() {
    if (this.isEditingParent) {
      this.contactService.updateContact(this.contact);
    } else {
      this.contactService.addContact({ ...this.contact });
    }
    this.resetParentForm();
  }

  editParent(c: Contact) {
    this.contact = { ...c };
    this.isEditingParent = true;
  }

  deleteParent(id: number) {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getContacts();
  }

  resetParentForm() {
    this.contact = { id: 0, name: '', email: '', phone: '' };
    this.isEditingParent = false;
    this.contacts = this.contactService.getContacts();
  }

  // Child
  startAddChild(parentId: number) {
    this.selectedParentIdForChild = parentId;
    this.child = { id: 0, name: '', email: '', phone: '' };
    this.isEditingChild = false;
  }

  editChild(parentId: number, child: Contact) {
    this.selectedParentIdForChild = parentId;
    this.child = { ...child };
    this.isEditingChild = true;
  }

  saveChild() {
    if (this.isEditingChild) {
      this.contactService.updateChild(this.selectedParentIdForChild, this.child);
    } else {
      this.contactService.addChild(this.selectedParentIdForChild, { ...this.child });
    }
    this.resetChildForm();
  }

  deleteChild(parentId: number, childId: number) {
    this.contactService.deleteChild(parentId, childId);
    this.contacts = this.contactService.getContacts();
  }

  resetChildForm() {
    this.child = { id: 0, name: '', email: '', phone: '' };
    this.selectedParentIdForChild = 0;
    this.isEditingChild = false;
    this.contacts = this.contactService.getContacts();
  }
}
