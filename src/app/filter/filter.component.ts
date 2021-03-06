import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchedUser } from 'src/shared/searched-user.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public form: FormGroup;
  @Output()
  public filtersApplied: EventEmitter<SearchedUser> = new EventEmitter<SearchedUser>();
  @Output()
  public filterReset: EventEmitter<SearchedUser> = new EventEmitter<SearchedUser>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      dateOfBirth: new FormControl(''),
      hobbies: new FormControl(''),
    });
  }

  public applyFilter(): void {
    const searchedUser: SearchedUser = this.prepareSearchedUser();
    this.filtersApplied.emit(searchedUser);
  }

  public clear(): void {
    this.form.reset();
    this.buildForm();
    this.filterReset.emit();
  }

  private prepareSearchedUser(): SearchedUser {
    return {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      address: this.form.get('address')?.value,
      email: this.form.get('email')?.value,
      hobbies: this.form.get('hobbies')?.value,
      dateOfBirth: this.form.get('dateOfBirth')?.value,
    };
  }
}
