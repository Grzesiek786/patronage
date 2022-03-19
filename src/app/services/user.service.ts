import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private setGroupFilter$ = new Subject<any>();
  public getGroupFilter = this.setGroupFilter$.asObservable();

  constructor(private usersService: UsersService) {}

  public fetchUsers(): Observable<any> {
    return of(this.usersService.fetchUsers());  
  }
}
