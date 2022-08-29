import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hobby } from 'src/shared/hobby.interface';
import { User } from 'src/shared/user.interface';
import { HobbiesService } from '../services/hobbies.service';
import { UsersService } from '../services/users.service';
import { Destroyable } from '../shared/destroyable';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends Destroyable implements OnInit {
  public id: string;
  public editMode = false;
  public editForm: FormGroup;
  public user: User | undefined;
  public users: User[] = [];
  public hobbies: string[] = [];
  // public hobbies: Hobby[] = []

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private hobbiesService: HobbiesService,
    private router: Router
  ) {
    super();
  }

  // ngOnInit(): void {
  //   this.route.params.subscribe((params: Params) => {
  //     this.id = params['id'];
  //     this.editMode = params['id'] != null;
  //     const users$: Observable<User[]> = this.usersService.fetchUsers();
  //     const hobbies$: Observable<Hobby> = this.hobbiesService.fetchHobby(this.id);
  //     // combineLatest()
  //     this.initForm();
  //     hobbies$.subscribe((hobby: Hobby) => console.log(hobby.name));
  //     this.usersService.fetchUser(this.id).subscribe((user: User) => {
  //       // this.getHobbies();
  //       // this.hobbies = user.hobbies;
  //       this.users.forEach((user: User) => {
  //         if (!user.hobbyNames) {
  //           user.hobbyNames = [];
  //         }

  //         user.hobbies.forEach((hobbyName: string) => {
  //           const foundHobby: Hobby = this.hobbies.find(
  //             (searchedHobby: Hobby) => searchedHobby.id === hobbyName
  //           );
  //           user.hobbyNames.push(foundHobby.name);
  //         });
  //       });
  //       // console.log(this.hobbies);
  //       this.editForm = new FormGroup({
  //         name: new FormControl(user.name),
  //         lastName: new FormControl(user.lastName),
  //         email: new FormControl(user.email),
  //         age: new FormControl(user.age),
  //         gender: new FormControl(user.gender),
  //         phoneNumber: new FormControl(user.phoneNumber),
  //         address: new FormControl(user.address),
  //         dateOfBirth: new FormControl(user.dateOfBirth),
  //         hobbies: new FormControl(this.hobbies),
  //       });
  //     });
  //   });
  // }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      this.usersService.fetchUser(this.id).subscribe((user: User) => {
        console.log(user.hobbies);
        user.hobbies.forEach((id: string) => {
          const hobbies$: Observable<Hobby> =
            this.hobbiesService.fetchHobby(id);
          hobbies$.subscribe((hobby: Hobby) => this.hobbies.push(hobby.name));
        });
        console.log(this.hobbies);
        this.editForm = new FormGroup({
          name: new FormControl(user.name),
          lastName: new FormControl(user.lastName),
          email: new FormControl(user.email),
          age: new FormControl(user.age),
          gender: new FormControl(user.gender),
          phoneNumber: new FormControl(user.phoneNumber),
          address: new FormControl(user.address),
          dateOfBirth: new FormControl(user.dateOfBirth),
          hobbies: new FormControl(this.hobbies),
        });
      });
    });
  }

  // private getHobbies(): void {
  //   const hobbies$: Observable<Hobby[]> = this.hobbiesService.fetchHobbies();
  //   hobbies$
  //   .pipe(
  //     takeUntil(this.destroyed$)
  //   ).subscribe((hobby: Hobby[]) => {
  //     this.hobbies = hobby;
  //   })
  // }

  // private getUser(): void {
  //   const id = this.route.snapshot.paramMap.get('id')!;
  //   this.userService.fetchUser(id).subscribe((user: User) => {
  //     console.log("id", user);
  //     // this.initForm();
  //   });
  // }

  public onSubmit() {
    if (this.editMode) {
      this.usersService
        .updateUser(this.editForm.value, this.id)
        .subscribe(() => {
          console.log('wykonano');
        });
    } else {
      this.usersService.addUser(this.editForm.value);
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

    this.editForm = new FormGroup({
      name: new FormControl(firstName),
      lastName: new FormControl(lastName),
      email: new FormControl(email),
      age: new FormControl(age),
      gender: new FormControl(sex),
      phoneNumber: new FormControl(phone),
      address: new FormControl(address),
      dateOfBirth: new FormControl(dateOfBirth),
      hobbies: new FormControl(userHobbies),
    });
  }
}
