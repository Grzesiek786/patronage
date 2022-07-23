import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.userService.fetchUser(this.id).subscribe(() => {
        this.initForm();
      })
    });
    // this.getUser();
  }

  private getUser(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.fetchUser(id).subscribe((user: User) => {
      this.initForm();
    });
  }

  public onSubmit() {
    console.log('edit', this.editForm);
  }

  private initForm(): void {
    let userFirstName = '';
    let userLastName = '';
    let userEmail = '';
    let userAge = 0;
    let userSex = '';
    let userPhone = '';
    let userAddress = '';
    let userDateOfBirth = '';
    let userHobbies = '';

    if (this.editMode) {
      const edit = this.userService.fetchUser(this.id);
      edit.subscribe((user: User) => {
        userFirstName = user.name;
        userLastName = user.lastName;
        userEmail = user.email;
        userAge = user.age;
        userSex = user.gender;
        userPhone = user.phoneNumber;
        userAddress = user.address;
        userDateOfBirth = user.dateOfBirth;
      });
    }

    this.editForm = new FormGroup({
      'firstName': new FormControl(userFirstName),
      'lastName': new FormControl(userLastName),
      'email': new FormControl(userEmail),
      'age': new FormControl(userAge),
      'sex': new FormControl(userSex),
      'phone': new FormControl(userPhone),
      'address': new FormControl(userAddress),
      'dateOfBirth': new FormControl(userDateOfBirth),
      // 'hobbies': new FormControl([userHobbies]),
    });
  }
}
