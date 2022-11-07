import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
//import { RecuperarSenha } from '../models/RecuperarSenha';
import { Usuario } from '../models/Usuario';
import { RecuperarSenha } from '../models/RecuperarSenha';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuarioLogado: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

    constructor(
        private router: Router,
        private httpService: HttpService<Usuario>
    ) {
      this.usuarioLogado = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem("usuarioLogado_LoginUnico")  || "{}"));
      this.usuario = this.usuarioLogado.asObservable();
    }

    public get RetornaUsuario(): Usuario {
        return this.usuarioLogado.value;
    }

    Login(usuario : Usuario, sistema: string | null) {
        return this.httpService.Post("account", usuario)
            .pipe(map(x => {
                if (x.Codigo > 0) {
                  localStorage.setItem("usuarioLogado_LoginUnico", JSON.stringify(x));
                  this.usuarioLogado.next(x);
                  this.usuario = this.usuarioLogado.asObservable();
                  if(sistema) {
                    this.router.navigate(["/principal", sistema + '']);
                  } else {
                    this.router.navigate(["/principal"]);
                  }
                }
                return x;
            }));
    }

    Logout() {
        localStorage.removeItem("usuarioLogado_LoginUnico");
        this.usuarioLogado.next(new Usuario());
        this.router.navigate(["/"]);
    }

    RecuperarSenha(email: string) {
      return this.httpService.Get(`account/${email}`)
          .pipe(map(x => {
              this.Logout();
              this.router.navigate(["/"]);
          }));
    }

    AlterarSenha(token: string, objeto: RecuperarSenha) {
      return this.httpService.PutComHeader("account/alterasenha", objeto, token)
          .pipe(map(x => {
            this.router.navigate(["/"]);
          }));
    }
}
