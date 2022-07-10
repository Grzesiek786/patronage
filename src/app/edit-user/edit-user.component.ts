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
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    //   this.editMode = params['id'] != null;
    //   this.userService.fetchUser(this.id).subscribe(() => {
    //     console.log("fetch");
    //   })
    //   this.initForm();
    //   console.log(this.id, this.editMode);
    // });
    this.getUser();
    this.initForm();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.fetchUser(id).subscribe((user: User) => {
      this.user = user;
      console.log('user', this.user);
    });
  }

  onSubmit() {
    console.log(this.editForm);
  }

  private initForm(): void {
    let firstName = '';
    let lastName = '';
    let email = '';
    let age = '';
    let sex = '';
    let phone = '';
    let address = '';
    let dateOfBirth = '';
    let hobbies = ''

    if (this.editForm) {
      const edit = this.userService.fetchUser(this.id);
      console.log(edit);
    }

    this.editForm = new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      email: new FormControl(email),
      age: new FormControl(age),
      sex: new FormControl(sex),
      phone: new FormControl(phone),
      address: new FormControl(address),
      dateOfBirth: new FormControl(dateOfBirth),
      hobbies: new FormControl([hobbies])
    });
  }
}
