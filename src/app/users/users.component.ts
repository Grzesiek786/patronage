import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hobby } from 'src/shared/hobby.interface';
import { User } from 'src/shared/user.interface';
import { HobbiesService } from '../services/hobbies.service';
import { UsersService } from '../services/users.service';
import { Destroyable } from '../shared/destroyable';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { SearchedUser } from 'src/shared/searched-user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent extends Destroyable implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input()
  public groupFilters: Object;

  public hobbies: Hobby[] = [];
  sortedData: Hobby[] = [];
  public messageError: string =
    'Ups coś poszło nie tak, proszę spróbować ponownie 💥💥💥';
  public isError: boolean = false;
  public users: any[] = [];
  public filteredUsers: any[] = [];

  public displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'age',
    'gender',
    'phoneNumber',
    'address',
    'dateOfBirth',
    'action',
  ];
  public dataSource: MatTableDataSource<User>;
  public dataSourceWithAllData: MatTableDataSource<User>;

  constructor(
    private usersService: UsersService,
    private hobbiesService: HobbiesService
  ) {
    super();
  }

  public ngOnInit(): void {
    const users$: Observable<User[]> = this.usersService.fetchUsers();
    const hobbies$: Observable<Hobby[]> = this.hobbiesService.fetchHobbies();

    combineLatest([users$, hobbies$])
      .pipe(
        takeUntil(this.destroyed$),
        catchError(() => {
          this.isError = !this.isError;
          return EMPTY;
        })
      )
      .subscribe(
        ([users, hobbies]) =>
          this.handleUserWithHobbiesSubscription(users, hobbies)
      );
  }

  private handleUserWithHobbiesSubscription(
    users: User[],
    hobbies: Hobby[]
  ): void {
    users.forEach((user: User) => {
      if (!user.hobbyNames) {
        user.hobbyNames = [];
      }

      user.hobbies.forEach((hobbyName: string) => {
        const foundHobby: Hobby = hobbies.find(
          (searchedHobby: Hobby) => searchedHobby.id === hobbyName
        );
        user.hobbyNames.push(foundHobby.name);
      });
    });
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSourceWithAllData = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public deleteUser(user: User): void {
    if (
      confirm(
        `Czy jesteś pewny że chcesz usunąć tego użytkownika ${user.name} ${user.lastName}`
      )
    ) {
      this.usersService
        .deleteUser(user)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          console.log(user);
        });
    }
    console.log(user);
  }

  public editUser(user: User): void {
    console.log(user);
  }

  public sortData(sort: Sort) {
    const data = this.dataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'lastName':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'address':
          return this.compare(a.address, b.address, isAsc);
        case 'age':
          return this.compare(a.age, b.age, isAsc);
        case 'dateOfBirth':
          return this.compare(a.dateOfBirth, b.dateOfBirth, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public filtersApplied(searchedUser: SearchedUser): void {
    const filteredUsers: User[] = [];

    this.dataSourceWithAllData.data.forEach((singleUser: User) => {

      if (searchedUser.firstName && singleUser.name.includes(searchedUser.firstName)) {
        console.log('dodaje bo name', singleUser.name, searchedUser.firstName);
        filteredUsers.push(singleUser);
        return;
      }

      if (searchedUser.lastName && singleUser.lastName.includes(searchedUser.lastName)) {
        console.log('dodaje bo nazwisko', singleUser.lastName, searchedUser.lastName);
        filteredUsers.push(singleUser);
        return;
      }

      if (searchedUser.dateOfBirth && singleUser.dateOfBirth.includes(searchedUser.dateOfBirth)) {
        console.log('dodaje bo data', singleUser.dateOfBirth, searchedUser.dateOfBirth);
        filteredUsers.push(singleUser);
        return;
      }

      if (searchedUser.hobbies && singleUser.hobbyNames.includes(searchedUser.hobbies)) {
        console.log('dodaje bo hobbies', singleUser.hobbyNames, searchedUser.hobbies);
        filteredUsers.push(singleUser);
        return;
      }

      if (searchedUser.email && singleUser.email.includes(searchedUser.email)) {
        console.log('dodaje bo email', singleUser.email, searchedUser.email);
        filteredUsers.push(singleUser);
        return;
      }

      if (searchedUser.address && singleUser.address.includes(searchedUser.address)) {
        console.log('dodaje bo address', singleUser.address, searchedUser.address);
        filteredUsers.push(singleUser);
        return;
      }
    });

    console.log(filteredUsers);

    this.dataSource = new MatTableDataSource<User>(filteredUsers);
  }

  public filterReset(): void {
    this.dataSource = this.dataSourceWithAllData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
