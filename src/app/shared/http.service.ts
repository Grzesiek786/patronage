import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/shared/user.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    const fullUrl: string = this.prepareFullUrl(url);
    return this.httpClient.get<T>(fullUrl);
  }

  private prepareFullUrl(url: string): string {
    return `${this.apiUrl}/${url}`;
  }

  public delete<T>(id: string, url: string): Observable<T> {
    const deleteUrl: string = `${this.prepareFullUrl(url)}/${id}`
    return this.httpClient.delete<T>(deleteUrl);
  }

  public post<T>(t: T, url: string): Observable<T> {
    return this.httpClient.post<T>(this.prepareFullUrl(url), t, httpOptions);
  }

  public put<T>(t: T, url: string, id: string): Observable<T> {
    const putUrl: string = `${this.prepareFullUrl(url)}/${id}`;
    return this.httpClient.put<T>(putUrl, t, httpOptions);
  }
}
