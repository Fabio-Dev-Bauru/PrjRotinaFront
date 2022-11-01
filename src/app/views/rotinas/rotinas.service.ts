import { map, Observable } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Injectable } from '@angular/core';
import { Rotina } from 'src/app/models/Rotina';

@Injectable({
  providedIn: 'root'
})
export class RotinasService {

  constructor(private httpService: HttpService<Rotina>) { }

  GetLista(texto: string = ""): Observable<Rotina[]> {
    return this.httpService.GetList(`Rotinas/lista/${texto}`)
    .pipe(map((x: Rotina[]) => {
      return x;
    }));
  }

  GetObjeto(codigo: number) {
    return this.httpService.Get(`Rotinas/${codigo}`)
    .pipe(map(x => {
      return x;
    }));
  }

  Inserir(objeto: Rotina) {
    return this.httpService.Post("Rotinas", objeto);
  }

  Atualizar(objeto: Rotina) {
    return this.httpService.Put("Rotinas", objeto);
  }

  Excluir(id: string){
    return this.httpService.Delete(`Rotinas/${id}`)
  }
}
