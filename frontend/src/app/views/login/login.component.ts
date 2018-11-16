import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../model';
import { ApiClient } from '../../shared/services';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/authentication.service';
import { SpinnerOverlayService } from '../../shared/core/ui-elements/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'ccpv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title: string = 'Login';
  public loginModel: LoginModel = {username: '', password: ''};
  constructor(
    private apiClient: ApiClient,
    private router: Router,
    private authentication: AuthService,
    private spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.spinnerService.hide();
  }

  public doLogin() {
    this.authentication.login(this.loginModel);
  }

  public onKeyUp(event) {
    if (event['keyCode'] === 13) {
      this.doLogin();
    }
  }
}
