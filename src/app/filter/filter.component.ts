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
  groupFilters: EventEmitter<any> = new EventEmitter<any>();
  @Output() 
  public nameValue: EventEmitter<string> = new EventEmitter<string>();
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

  public applyFilter(event: Event) {
    this.nameValue.emit((event.target as HTMLInputElement).value);
  }

  public clear(): void {
    this.form.reset();
  }
}
