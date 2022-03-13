import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() public name: string;
  @Input() public lastName: string;
  @Input() public email: string;
  @Input() public age: string;
  @Input() public address: string;
  @Input() public dateOfBirth: string;
  @Input() public hobby: string;

  // private name$ = new Subject<string>();

  constructor() {}

  ngOnInit(): void {}

  public searchName(term: string) {
    // this.name$.next(term);
    const names = (this.name = term);
    console.log(names);
  }

  public searchLastName(term: string) {
    const lastNames = (this.lastName = term);
    console.log(lastNames);
  }
  public searchEmail(term: string) {
    const emails = (this.email = term);
    console.log(emails);
  }
  public searchAge(term: string) {
    const age = (this.age = term);
    console.log(age);
  }
  public searchAdres(term: string) {
    const addresses = (this.address = term);
    console.log(addresses);
  }
  public searchDateOfBirth(term: string) {
    const dateOfBirths = (this.dateOfBirth = term);
    console.log(dateOfBirths);
  }
  public searchHobbies(term: string) {
    const hobbies = (this.hobby = term);
    console.log(hobbies);
  }
}
