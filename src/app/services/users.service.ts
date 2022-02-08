import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/shared/user.interface';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpService: HttpService) {}

  public fetchUsers(): Observable<User[]> {
    return this.httpService.get<User[]>('users');
  }

  public deleteUser(user: User): Observable<User> {
    return this.httpService.delete<User>(user.id, 'users');
  }

  public addUser(user: User): Observable<User> {
    return this.httpService.post<User>(user, 'users');
  }

  public updateUser(user: User): Observable<User> {
    return this.httpService.put<User>(user, 'users', user.id);
  }
}
