import { FormBuilder, FormGroup } from '@angular/forms';
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

  ngOnInit(): void {
    this.InicializarForm();

    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {

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
    this.service.GetLista(this.form.value.Texto)
    .pipe(first())
    .subscribe({
      next: (rotina: Rotina[]) => this.lista = rotina
    });
    console.log(this.lista);
  }

  Submit() {
    this.router.navigate([], { queryParams: { "texto": this.form.value.Texto }});
  }

  excluirTarefa(id: string): void {
      this.service.Excluir(id)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(["/rotinas"]);
      });

  }

}
