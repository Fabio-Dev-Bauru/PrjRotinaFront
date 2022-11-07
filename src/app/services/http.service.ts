import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, take, tap } from 'rxjs';

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

  GetListSemPaginacao(caminho: string) {
    return this.http.get<T[]>(`${environment.baseUrl}${caminho}`).pipe(take(1));
  }

  Post(caminho: string, corpo: object) {
    return this.http.post<T>(`${environment.baseUrl}${caminho}`, corpo).pipe(take(1));
  }

  Put(caminho: string, corpo: object) {
    return this.http.put<T>(`${environment.baseUrl}${caminho}`, corpo).pipe(take(1));
  }

  Delete(caminho: string) {
    return this.http.delete(`${environment.baseUrl}${caminho}`).pipe(take(1));
  }

  PutComHeader(caminho: string, corpo: object, token: string) {
    return this.http.put<T>(`${environment.baseUrl}${caminho}`, corpo, {headers: { Authorization: `Bearer ${token}` }}).pipe(take(1));
  }

  PostComArquivo(caminho: string, corpo: object, arquivo: File) {
    return this.http.post<T>(`${environment.baseUrl}${caminho}`, corpo).pipe(delay(0), tap((e: any) => {
      if (arquivo) {
        this.PostArquivo(caminho + `/upload/${e.Codigo}`, arquivo);
      }
    }));
  }

  PutComArquivo(caminho: string, codigo: number, corpo: object, arquivo: File) {
    return this.http.put<T>(`${environment.baseUrl}${caminho}`, corpo).pipe(delay(0), tap(() => {
      if (arquivo) {
        this.PostArquivo(caminho + `/upload/${codigo}`, arquivo);
      }
    }));
  }

  PostArquivo(caminho: string, arquivo: File) {
    const formData: FormData = new FormData();
    formData.append('arquivo', arquivo, arquivo.name);
    return this.http.post<T>(`${environment.baseUrl}${caminho}`, formData).subscribe();
  }
}

