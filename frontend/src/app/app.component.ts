import { Component } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import { SpinnerOverlayService } from './shared/core/ui-elements/spinner-overlay/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ctrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Control';

  public isSidebarVisible: boolean = true;
  public set isSpinnerVisible(val: boolean) {
    this._isSpinnerVisible = val;
    console.log(`Spinner visibility is ${val}`);
  }

  public get isSpinnerVisible(): boolean {
    return this._isSpinnerVisible;
  }

  public _isSpinnerVisible: boolean = false;
  private visibilitySubsriber: Subscription = this.sideBarService.visibilityChanged.subscribe((isVisible: boolean) => {
    this.isSidebarVisible = isVisible;
  });

  private spinnerSubscription: Subscription = this.spinnerOverlayService.statusChanged
    .subscribe((isSpinnerVisible: boolean) => {
      this.isSpinnerVisible = isSpinnerVisible;
    });

  constructor(
    private sideBarService: SidebarService,
    private spinnerOverlayService: SpinnerOverlayService,
  ) {}
}
