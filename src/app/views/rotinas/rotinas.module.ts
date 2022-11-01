import { SharedModule } from './../shared/shared.module';
import { RotinasRoutingModule } from './rotinas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotinaCadastroComponent } from './rotina-cadastro/rotina-cadastro.component';
import { RotinaListaComponent } from './rotina-lista/rotina-lista.component';
import { RotinasService } from './rotinas.service';



@NgModule({
  declarations: [RotinaCadastroComponent,
                 RotinaListaComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RotinasRoutingModule,
  ],
  providers: [RotinasService]
})
export class RotinasModule { }
