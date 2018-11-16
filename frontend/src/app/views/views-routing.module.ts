import { RelaysComponent } from './relays/relays.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomRoutes } from '../model';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from '../shared/services/authentication.service';
import { LoginComponent } from './login/login.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { RelaysCrudComponent } from './relays-crud/relays-crud.component';
import { PeopleComponent } from './people/people.component';

export const viewsRoutes: CustomRoutes = [
  {
    name: 'Home',
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    name: 'Login',
    path: 'login',
    component: LoginComponent
  },
  {
    name: 'People',
    path: 'people',
    component: PeopleComponent,
    // canActivate: [AuthService]
  },
  {
    name: 'Relays',
    path: 'relays',
    component: RelaysComponent,
    canActivate: [AuthService]
  },
  {
    name: 'RelaysCrud',
    path: 'relayscrud',
    component: RelaysCrudComponent,
    canActivate: [AuthService]
  },
  {
    name: 'Scheduler',
    path: 'scheduler',
    component: SchedulerComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    component: DashboardComponent
  }];

const routes: Routes = [...viewsRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
