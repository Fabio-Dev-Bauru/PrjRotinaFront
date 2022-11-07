import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "rotinas", loadChildren: () => import("./views/rotinas/rotinas.module").then(m => m.RotinasModule) },
  { path: "account", loadChildren: () => import("./views/account/account.module").then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
