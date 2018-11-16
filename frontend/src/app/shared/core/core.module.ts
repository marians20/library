import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { PageContentComponent } from './page-content/page-content.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ApiClient } from '../services/api-client.service';
import { DataViewComponent } from './ui-elements/data-view/data-view.component';
import { DataInputComponent } from './ui-elements/data-input/data-input.component';
import { DataTableComponent } from './ui-elements/data-table/data-table.component';
import { DataFormComponent } from './ui-elements/data-form/data-form.component';
import { AlertComponent, AlertService } from './ui-elements/alert';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ButtonComponent } from './button/button.component';
import { ConfirmDialogComponent } from './ui-elements/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../core/core.material.module';
import { SpinnerOverlayComponent } from './ui-elements/spinner-overlay/spinner-overlay.component';
import { TemperatureWidgetComponent } from './temperature-widget/temperature-widget.component';

const moduleComponents = [
  ClickOutsideDirective,
  PageContentComponent,
  PageTitleComponent,
  DataViewComponent,
  DataInputComponent,
  DataFormComponent,
  DataTableComponent,
  AlertComponent,
  ButtonComponent,
  ConfirmDialogComponent,
  SpinnerOverlayComponent,
  TemperatureWidgetComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularFontAwesomeModule,
    MaterialModule,
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents],
  providers: [ApiClient, AlertService],
})
export class CoreModule { }
