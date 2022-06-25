import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      console.log(this.id, this.editMode);
    });
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

    this.editForm = new FormGroup({
      firstName: new FormControl(),
    });
  }
}
