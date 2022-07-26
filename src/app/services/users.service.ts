import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/shared/user.interface';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpService: HttpService) {}

  private users: Observable<User[]>;

  public fetchUsers(): Observable<User[]> {
    return this.httpService.get<User[]>('users');
  }

  public fetchUser(id: string): Observable<User> {
    const url = `users/${id}`;
    return this.httpService.get<User>(url);
  }

  public deleteUser(user: User): Observable<User> {
    return this.httpService.delete<User>(user.id, 'users');
  }

  public addUser(user: User): Observable<User> {
    return this.httpService.post<User>(user, 'users');
  }

  public updateUser(user: User, id: string): Observable<User> {
    return this.httpService.put<User>(user, 'users', id);
  }

  public getByName(name: string) {
    return this.users.forEach((proj) => proj);
  }
}
