import { RotinasRoutingModule } from './rotinas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotinaCadastroComponent } from './rotina-cadastro/rotina-cadastro.component';
import { RotinaListaComponent } from './rotina-lista/rotina-lista.component';
import { RotinasService } from './rotinas.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RotinaCadastroComponent,
                 RotinaListaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RotinasRoutingModule,
    SharedModule,
  ],
  providers: [RotinasService]
})
export class RotinasModule { }
