import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CoreModule } from './shared/core/core.module';
import { LoggingService, SocketService } from './shared/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtInterceptor } from './shared/jwt-interceptor';
import { MyErrorHandler } from './shared/services/my-error-handler.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AuthService } from './shared/services/authentication.service';
import { MasterDetailsService } from './shared/services/master-details.service';
import { SidebarService } from './sidebar/sidebar.service';
import { SpinnerOverlayService } from './shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { ViewsModule } from './views/views.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ViewsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    LoggingService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (router: Router) {
        return new JwtInterceptor(router);
      },
      multi: true,
      deps: [Router]
    },
    {
      provide: ErrorHandler,
      useFactory: function( logger: LoggingService) {
        return new MyErrorHandler(logger);
      },
      deps: [LoggingService]
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false}
    },
    MasterDetailsService,
    SidebarService,
    SpinnerOverlayService,
    // SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
