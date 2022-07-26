import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Hobby } from 'src/shared/hobby.interface';
import { User } from 'src/shared/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public id: string;
  public editMode = false;
  public editForm: FormGroup;
  public user: User | undefined;
  public hobbies: Hobby;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      this.userService.fetchUser(this.id).subscribe((user: User) => {
        console.log('id', user.hobbies);
        this.editForm = new FormGroup({
          firstName: new FormControl(user.name),
          lastName: new FormControl(user.lastName),
          email: new FormControl(user.email),
          age: new FormControl(user.age),
          sex: new FormControl(user.gender),
          phone: new FormControl(user.phoneNumber),
          address: new FormControl(user.address),
          dateOfBirth: new FormControl(user.dateOfBirth),
        });
      });
    });
    // this.initForm();
    // this.getUser();
  }

  // private getUser(): void {
  //   const id = this.route.snapshot.paramMap.get('id')!;
  //   this.userService.fetchUser(id).subscribe((user: User) => {
  //     console.log("id", user);
  //     // this.initForm();
  //   });
  // }

  public onSubmit() {
    if (this.editMode) {
      this.userService
        .updateUser(this.editForm.value, this.id)
        .subscribe(() => {
          console.log('wykonano');
        });
    } else {
      this.userService.addUser(this.editForm.value);
    }
    this.onCancel();
  }

  public onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private initForm(): void {
    let firstName = '';
    let lastName = '';
    let email = '';
    let age = 0;
    let sex = '';
    let phone = '';
    let address = '';
    let dateOfBirth = '';
    let userHobbies = '';

    // if (this.editMode) {
    //   this.userService.fetchUser(this.id).subscribe((user: User) => {
    //     firstName = user.name;
    //     lastName = user.lastName;
    //     email = user.email;
    //     age = user.age;
    //     sex = user.gender;
    //     phone = user.phoneNumber;
    //     address = user.address;
    //     dateOfBirth = user.dateOfBirth;
    //   });
    // }

    this.editForm = new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      email: new FormControl(email),
      age: new FormControl(age),
      sex: new FormControl(sex),
      phone: new FormControl(phone),
      address: new FormControl(address),
      dateOfBirth: new FormControl(dateOfBirth),
      hobbies: new FormControl([userHobbies]),
    });
  }
}
