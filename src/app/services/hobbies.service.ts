import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from 'src/shared/hobby.interface';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class HobbiesService {
  constructor(private httpService: HttpService) {}

  public fetchHobbies(): Observable<Hobby[]> {
    return this.httpService.get<Hobby[]>('hobbies');
  }

  public fetchHobby(id: string): Observable<Hobby> {
    const url = `hobbies/${id}`;
    return this.httpService.get<Hobby>(url);
  }

  public addHobby(hobby: Hobby): Observable<Hobby> {
    return this.httpService.post<Hobby>(hobby, 'hobbies');
  }
}
