import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/authentication.service';
import { UserDto } from '../shared/core/model';
import { Subscription } from 'rxjs';
import { SidebarService } from '../sidebar/sidebar.service';
import { ApiClient } from '../shared';

@Component({
  selector: 'ccpv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: UserDto = new UserDto();

  constructor(
    public authentication: AuthService,
    public sideBarService: SidebarService,
    public apiClient: ApiClient) { }

  ngOnInit() {
  }

  public doLogout() {
    this.authentication.logout();
  }

  public get isAdmin(): boolean {
    return this.user !== undefined && this.authentication.isAdmin(this.user);
  }

  public onTemperatureClick(event) {
    if (event['temperature'] === undefined) {
      return;
    }

    console.log(event);
    return false;
  }
}
