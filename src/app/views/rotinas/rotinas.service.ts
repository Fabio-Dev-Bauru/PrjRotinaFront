import { map, Observable } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Injectable } from '@angular/core';
import { Rotina } from 'src/app/models/Rotina';
import { ObjetoQuantidade } from 'src/app/models/ObjetoQuantidade';

@Injectable({
  providedIn: 'root'
})
export class RotinasService {

  constructor(private httpService: HttpService<Rotina>) { }

  GetLista(pagina: number, texto: string) {
    return this.httpService.GetList(`Rotinas/lista/${pagina}/${texto}`)
    .pipe(map(x => {
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
