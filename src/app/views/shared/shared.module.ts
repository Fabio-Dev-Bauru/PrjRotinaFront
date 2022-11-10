import { ErroComponent } from './erro/erro.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { PaginacaoComponent } from './paginacao/paginacao.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ErroComponent,
    PaginacaoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    ErroComponent,
    PaginacaoComponent,
  ]
})
export class SharedModule { }
