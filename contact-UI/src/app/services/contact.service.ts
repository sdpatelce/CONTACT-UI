import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  private currentId = 1;

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact): void {
    contact.id = this.currentId++;
    contact.children = [];
    this.contacts.push(contact);
  }

  updateContact(updated: Contact): void {
    const i = this.contacts.findIndex(c => c.id === updated.id);
    if (i > -1) this.contacts[i] = updated;
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }

  addChild(parentId: number, child: Contact): void {
    const parent = this.contacts.find(c => c.id === parentId);
    if (parent) {
      child.id = this.currentId++;
      if (!parent.children) parent.children = [];
      parent.children.push(child);
    }
  }

  updateChild(parentId: number, child: Contact): void {
    const parent = this.contacts.find(c => c.id === parentId);
    if (parent && parent.children) {
      const index = parent.children.findIndex(c => c.id === child.id);
      if (index !== -1) parent.children[index] = child;
    }
  }

  deleteChild(parentId: number, childId: number): void {
    const parent = this.contacts.find(c => c.id === parentId);
    if (parent && parent.children) {
      parent.children = parent.children.filter(c => c.id !== childId);
    }
  }
}
