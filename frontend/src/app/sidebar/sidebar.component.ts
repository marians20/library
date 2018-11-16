import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiClient, LoggingService } from '../shared/services';
import { environment } from '../../environments/environment';
import { UserDto } from '../shared/core/model';
import { AuthService } from '../shared/services/authentication.service';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'ccpv-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() title: string = '';
  public isVisible: boolean = true;

  public user: UserDto = new UserDto();

  private userSubscriber: Subscription = this.auth.userChanged.subscribe((user: UserDto) => {
    this.user = user;
  });

  private visibilitySubsriber: Subscription = this.service.visibilityChanged.subscribe((isVisible: boolean) => {
    this.isVisible = isVisible;
  });

  private apiUrl: string = `${environment.apiUrl}/v1/Token`;
  constructor(
    private auth: AuthService,
    private apiClient: ApiClient,
    private logger: LoggingService,
    private service: SidebarService,
  ) { }

  ngOnInit() {
    this.auth.whoAmI();
    this.user = this.auth.user;
  }
  ngOnDestroy(): void {
    this.userSubscriber.unsubscribe();
  }

  private getData() {
    this.apiClient.get<UserDto>(this.apiUrl)
      .subscribe((response: UserDto) => {
        this.logger.debug(response);
        this.user = response;
      }, error => {
        this.logger.error(error);
      });
  }
public toggle() {
  this.service.toggle();
}
}
