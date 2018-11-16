import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonTypes } from '../model';

let nextId = 0;

@Component({
  selector: 'ccpv-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() id = `button-${++nextId}`;
  @Input() type: string = ButtonTypes.Search;
  @Output() click: EventEmitter<object> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    // this.click.emit(null);
  }

}
