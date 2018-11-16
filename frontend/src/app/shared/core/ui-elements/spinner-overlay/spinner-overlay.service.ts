import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerOverlayComponent } from './spinner-overlay.component';

@Injectable()
export class SpinnerOverlayService {

  public statusChanged: EventEmitter<boolean> = new EventEmitter();

  private overlayRef: OverlayRef;
  private timerSubscription: Subscription;

  public set isVisible(val: boolean) {
    this._isVisible = this._isVisible + (val ? 1 : -1);
    this.statusChanged.emit(this.isVisible);
  }

  public get isVisible(): boolean {
    return this._isVisible > 0;
  }

  private _isVisible: number = 0;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-preloader-pane'
    });
  }

  show(delay: number = 100): void {
    this.hide();
    if (!this.overlayRef.hasAttached()) {
      this.timerSubscription = timer(delay).subscribe(() => {
        this.isVisible = true;
        const preloaderPortal: ComponentPortal<SpinnerOverlayComponent> = new ComponentPortal(SpinnerOverlayComponent);
        const instance: SpinnerOverlayComponent = this.overlayRef.attach(preloaderPortal).instance;
      });
    }
  }

  hide(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.isVisible = false;
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
