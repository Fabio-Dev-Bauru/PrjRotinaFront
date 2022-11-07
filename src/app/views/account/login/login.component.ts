import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBaseComponent } from '../../shared/form-base/form-base.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  exibirSenhaTexto: boolean = false;
  sistema: string = 'rotina'

  constructor(
    protected override formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AuthService) {
    super(formBuilder);
   }

   override ngOnInit(): void {
    this.InicializarForm();
  }

  InicializarForm() {
    this.form = this.formBuilder.group({
      Login: [null, [Validators.required]],
      Senha: [null, [Validators.required]]
    });
  }

  Submit() {
    this.service.Login(this.form.value, this.sistema)
      .pipe(first())
      .subscribe();
  }

}
