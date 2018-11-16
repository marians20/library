import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/authentication.service';
@Component({
  selector: 'ccpv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public title = 'Dashboard';
  constructor(
    public authentication: AuthService
  ) { }

  ngOnInit() {
  }

}
