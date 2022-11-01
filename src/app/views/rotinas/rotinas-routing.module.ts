import { RotinaListaComponent } from './rotina-lista/rotina-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RotinaCadastroComponent } from './rotina-cadastro/rotina-cadastro.component';

const routes: Routes = [
  { path: '', component: RotinaListaComponent},
  { path: 'cadastrar', component: RotinaCadastroComponent },
  { path: ':id', component: RotinaCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RotinasRoutingModule { }
