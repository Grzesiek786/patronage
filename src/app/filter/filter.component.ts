import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public form: FormGroup;
  @Output()
  public groupFilters: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      names: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      dateOfBirth: new FormControl(''),
      hobbies: new FormControl(''),
    });
  }

  public search(filters: any): void {
    Object.keys(filters).forEach((key) => {
      console.log(filters[key]);
      console.log('key ', key);
      filters[key] === '' ? delete filters[key] : key;
    });

    this.groupFilters.emit(filters);
  }

  public clear(): void {
    this.form.reset();
    this.buildForm();
  }
}
