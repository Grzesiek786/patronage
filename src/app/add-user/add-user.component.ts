import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Hobby } from 'src/shared/hobby.interface';
import { HobbiesService } from '../services/hobbies.service';
import { Destroyable } from '../shared/destroyable';
import { User } from 'src/shared/user.interface';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends Destroyable implements OnInit {
  public hobbies: Hobby[];

  public form: FormGroup;
  private emailRegx: RegExp =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  public;

  constructor(
    public fb: FormBuilder,
    private hobbiesService: HobbiesService,
    private usersService: UsersService,
    private location: Location,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      age: [null, Validators.required],
      gender: [null, [Validators.required]],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      hobbies: [null],
    });

    this.getHobbies();
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }

    const user: User = {
      id: Date.now() + '',
      name: this.form.get('name').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      age: +this.form.get('age').value,
      gender: this.form.get('gender').value,
      phoneNumber: this.form.get('phone').value,
      address: this.form.get('address').value,
      dateOfBirth: this.form.get('dateOfBirth').value,
      hobbies: this.form.get('hobbies').value,
    };
    console.log(user);
    this.usersService.addUser(user)
    .pipe(
      catchError(err => {throw `Nie dodano użytkownika ${err}`}),
      takeUntil(this.destroyed$))
    .subscribe(() => this.router.navigate(['/users']));

  }

  private getHobbies(): void {
    this.hobbiesService
      .fetchHobbies()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((hobbies: Hobby[]) => {
        this.hobbies = hobbies;
      });
  }

  public goBack(): void {
    this.location.back();
  }
}
