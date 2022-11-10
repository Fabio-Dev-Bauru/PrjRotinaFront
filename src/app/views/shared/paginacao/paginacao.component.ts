import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styles: [
  ]
})
export class PaginacaoComponent implements OnInit {

  @Input() Quantidade: number = 1;
  @Input() Pagina: number = 1;
  @Output() AlterarPagina: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  OnSubmit() {
    this.AlterarPagina.emit(this.Pagina);
  }

  RetornarPaginas(){
    var inicio = this.Pagina;

    switch (this.Pagina) {
      case 1:
        inicio = 1;
        break;
      case 2:
        inicio = 1;
        break;

      default:
        inicio = inicio-2;
        break;
    }

    var fim = this.Pagina+2;

    if (fim > this.Quantidade) {
      fim = this.Quantidade;
    }

    var listaPaginas = [];

    while (inicio <= fim) {
      listaPaginas.push({ pagina: inicio });
      inicio = inicio + 1;
    }

    return listaPaginas;
  }

  RetornarBotao10Anteriores(){
    if (this.Pagina - 10 >= 1) {
      return this.Pagina - 10;
    }
    else {
      return 1;
    }
  }

  RetornarBotao10Proximo(){
    if (this.Pagina + 10 <= this.Quantidade) {
      return this.Pagina + 10;
    } else if (this.Quantidade === 0) {
      return 1;
    } else {
      return this.Quantidade;
    }
  }

}
