import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(private http: HttpClient) { }

  Get(caminho: string) {
    return this.http.get<T>(`${environment.baseUrl}${caminho}`).pipe(take(1));
  }

  GetList(caminho: string) {
    return this.http.get<T[]>(`${environment.baseUrl}${caminho}`).pipe(take(1));
  }

  Post(caminho: string, corpo: object) {
    return this.http.post<T>(`${environment.baseUrl}${caminho}`, corpo).pipe(take(1));
  }

  Put(caminho: string, corpo: object) {
    return this.http.put<T>(`${environment.baseUrl}${caminho}`, corpo).pipe(take(1));
  }

  Delete(caminho: string) {
    return this.http.delete<T>(`${environment.baseUrl}${caminho}`).pipe(take(1));
  }
}

