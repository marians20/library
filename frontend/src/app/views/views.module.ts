import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from '../shared/core/core.module';
import { RelaysComponent } from './relays/relays.component';
import { ControllRelayComponent } from './relays/controll-relay/controll-relay.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { CronDItemComponent } from './scheduler/cron-d-item/cron-d-item.component';
import { CronDItemListComponent } from './scheduler/cron-d-item-list/cron-d-item-list.component';
import { RelaysCrudComponent } from './relays-crud/relays-crud.component';
import { MaterialModule } from '../shared/core/core.material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerOverlayComponent } from '../shared/core/ui-elements/spinner-overlay/spinner-overlay.component';
import { PeopleComponent } from './people/people.component';

const moduleComponents = [
  DashboardComponent,
  LoginComponent,
  RelaysComponent,
  SchedulerComponent,
  ControllRelayComponent,
  CronDItemComponent,
  CronDItemListComponent,
  RelaysCrudComponent,
  PeopleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule.forRoot()
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents],
  entryComponents: [
    SpinnerOverlayComponent
  ]
})
export class ViewsModule { }
