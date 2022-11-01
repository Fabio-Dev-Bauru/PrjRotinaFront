import { ErroComponent } from './erro/erro.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ErroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    ErroComponent,
  ]
})
export class SharedModule { }
