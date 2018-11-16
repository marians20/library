import { LoginModel } from './../../model/auth/login.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { UserDto } from '../core/model';
import { ApiClient, LoggingService } from '.';
import { environment } from '../../../environments/environment';
import { SpinnerOverlayService } from '../core/ui-elements/spinner-overlay/spinner-overlay.service';

@Injectable()
export class AuthService implements CanActivate {

    public set user(val: UserDto) {
        this._user = val;
        this.userChanged.emit(this._user);
    }
    public get user(): UserDto {
        if (!this.isLoggedIn
            || this._user.userName === undefined) {
            this.whoAmI();
        }
        return this._user;
    }

    public userChanged: EventEmitter<UserDto> = new EventEmitter();

    private _user: UserDto = new UserDto();
    private apiUrl: string = `${environment.apiUrl}/token/`;

    constructor(
        private router: Router,
        private apiClient: ApiClient,
        private logger: LoggingService,
        private spinnerService: SpinnerOverlayService,
    ) {
    }

    public logout() {
        localStorage.removeItem('jwt');
        this.router.navigate(['/login']);
        this.user = new UserDto();
    }

    public login(loginModel: LoginModel) {
        this.apiClient.post(`${environment.apiUrl}/token/`, loginModel)
        .subscribe((response) => {
          this.spinnerService.hide();
          if (response['token'] !== undefined) {
            localStorage.setItem('jwt', response['token']);
            this.whoAmI();
            this.router.navigate(['/dashboard']);
          }
        }, (error) => {
          this.spinnerService.hide();
        });
    }

    public get isLoggedIn() {
        return (!this.isTokenExpired(localStorage['jwt']));
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.isLoggedIn) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    public decodeJwt(): object {
        const jwtData = localStorage['jwt'].split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        return decodedJwtData;
    }

    public get fullName(): string {
        return `${this.user.firstName || ''} ${this.user.lastName || ''}`;
    }

    public whoAmI() {
        this.user = new UserDto();
    }

    public isAdmin(user: UserDto): boolean {
        if (!this.isLoggedIn
            || user === undefined
            || user.roles === undefined) {
            return false;
        }

        return user.roles.find(x => x.name === 'sysadmin') !== undefined;
    }

    private getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    private isTokenExpired(token?: string): boolean {
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }

        const result: boolean = !(date.valueOf() > new Date().valueOf());

        // if te token is expired, remove it from storage
        if (result) {
            localStorage.removeItem('jwt');
        }

        return result;
    }
}
