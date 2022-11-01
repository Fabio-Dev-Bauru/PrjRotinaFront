import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { Rotina } from 'src/app/models/Rotina';
import { RotinasService } from './../rotinas.service';

@Component({
  selector: 'app-rotina-cadastro',
  templateUrl: './rotina-cadastro.component.html',
  styleUrls: []
})
export class RotinaCadastroComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private service: RotinasService,
    private formBuilder: FormBuilder,
    private router: Router) { }

    form: FormGroup = this.formBuilder.group({});
    texto: string = "";
    pageTitle: string = '';
    showStatus: Boolean;

  ngOnInit(): void {
    this.InicializarForm();

    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {

        if (queryParams["texto"]) {
          this.texto = queryParams["texto"];
        }

        this.CarregarObjeto();
      }
    );

    this.CarregarParametros();
  }

  InicializarForm() {
    this.form = this.formBuilder.group({
      Id: ["", []],
      Nome: [null, [Validators.required, Validators.maxLength(50)]],
      Detalhes: [null, [Validators.required, Validators.maxLength(1000)]],
      Concluido: [null, []],
    });
  }

  CarregarObjeto() {
    this.activatedRoute.params
    .pipe(
      map(params => params["id"]),
      switchMap(id => this.service.GetObjeto(id))
      )
      .subscribe((x: Rotina) => {
        if (x.id == '') {
          this.pageTitle = 'Adicionar Tarefa';
          this.showStatus = false;
        } else {
          this.pageTitle = `Editar Tarefa: ${x.nome}`;
          this.showStatus = true;
        }

        this.form.patchValue({
          Id: x.id,
          Nome: x.nome,
          Detalhes: x.detalhes,
          Concluido: x.concluido
        });

      });
  }

  CarregarParametros() {
      this.router.navigate([], { queryParams: { "texto": this.texto } });
  }

  OnSubmit() {
    if (this.form.valid) {
      this.Submit();
    } else {
      this.ExibirValidacoes(this.form);
    }
  }

  Submit() {
    console.log(this.form.value.Concluido);
    if (this.form.value.Id != '') {
      this.service.Atualizar(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(["/rotinas"]);
      }
      );
    } else {
      this.service.Inserir(this.form.value)
        .pipe(first())
        .subscribe(() => {
              this.router.navigate(["/rotinas"]);
      }
      );
    }
  }

  ExibirValidacoes(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const controle = form.get(field);
      if (controle instanceof FormControl) {
        controle.markAsTouched({ onlySelf: true });
      } else if (controle instanceof FormGroup) {
        this.ExibirValidacoes(controle);
      }
    });
  }

  RetornaCampo(campo: string ) : FormControl {
    return this.form.get(campo) as FormControl;
  }

  AplicaCssErro(campo: string) {
     return { 'is-invalid': this.VerificaValidTouched(campo) }  
   }

   VerificaValidTouched(campo: string) {    
    return !this.RetornaCampo(campo).valid && this.RetornaCampo(campo).touched;  
  }

}
