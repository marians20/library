import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { viewsRoutes } from './views/views-routing.module';

const routes: Routes = [
  {path: '', children: [...viewsRoutes]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
