import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SidebarService {
    public visibilityChanged: EventEmitter<boolean> = new EventEmitter();
    public get isVisible(): boolean {
        return this._isVisible;
    }
    public set isVisible(value: boolean) {
        this._isVisible = value;
        this.visibilityChanged.emit(this._isVisible);
    }

    private _isVisible: boolean = true;

    constructor() {
    }

    public show() {
        if (this.isVisible) {
            return;
        }
        this.isVisible = true;
    }

    public hide() {
        if (!this.isVisible) {
            return;
        }
        this.isVisible = false;
    }

    public toggle() {
        this.isVisible = ! this.isVisible;
    }
}
