import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public form: FormGroup;
  @Output()
  public groupFilters: EventEmitter<any> = new EventEmitter<any>();
  public searchText: string = '';

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

  public search(filters: any): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === '' ? delete filters[key] : key
    );
    this.groupFilters.emit(filters);
  }

  public clear(): void {
    this.form.reset();
  }
}
