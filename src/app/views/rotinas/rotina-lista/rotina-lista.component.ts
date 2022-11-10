import { ObjetoQuantidade } from './../../../models/ObjetoQuantidade';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RotinasService } from '../rotinas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rotina } from 'src/app/models/Rotina';
import { first } from 'rxjs';

@Component({
  selector: 'app-rotina-lista',
  templateUrl: './rotina-lista.component.html',
  styleUrls: []
})
export class RotinaListaComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  constructor(private service: RotinasService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  lista: Rotina[];
  quantidade: number = 0;
  pagina: number = 1;
  obj: ObjetoQuantidade<Rotina>;

  ngOnInit(): void {
    this.InicializarForm();

    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {

        if (queryParams["pagina"]) {
          this.pagina = Number(queryParams["pagina"]);
        }

        if (queryParams["texto"]) {
            this.form.patchValue({
              Texto: queryParams["texto"]
            });
        } else {
            this.form.patchValue({
              Texto: ""
            });
        }

        this.CarregarLista();
      }
    );

    this.Submit();
  }

  InicializarForm() {
    this.form = this.formBuilder.group({
      Texto: ["", []]
    });
  }

  CarregarLista() {
    var  lista: Rotina[];
    this.service.GetLista(this.pagina, this.RetornaCampo('Texto').value)
    .pipe(first())
    .subscribe( x => {
      this.lista = x;
      console.log(this.lista)
    })
  }

  Submit() {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {
        if (queryParams["texto"] != this.RetornaCampo('Texto').value)
          this.pagina = 1;
      }
    );

    this.router.navigate([], { queryParams: { "pagina": this.pagina, "texto": this.RetornaCampo('Texto').value  } });
  }

  RetornaCampo(campo: string) : FormControl {
    return this.form.get(campo) as FormControl;
  }

  excluirTarefa(id: string): void {
      this.service.Excluir(id)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(["/rotinas"]);
      });

  }

  AlterarPagina(pagina: number) {
    this.pagina = pagina;
    this.Submit();
  }

}
