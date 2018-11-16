import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class MasterDetailsService {
    public set value(val: object) {
        this._value = _.cloneDeep(val);
    }
    public get value(): object {
        return this._value;
    }
    private _value: object;
}
