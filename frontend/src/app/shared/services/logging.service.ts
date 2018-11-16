import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LogLevels } from './log-levels.enum';
import * as moment from 'moment';
import * as JSON from 'circular-json';

@Injectable()
export class LoggingService {
    public logLevel: LogLevels = LogLevels.Trace;

    public debug(message: any) {
        if (this.logLevel <= LogLevels.Debug) {
            this.log(message);
        }
    }

    public info(message: any) {
        if (this.logLevel <= LogLevels.Info) {
            this.log(message);
        }
    }

    public trace(message: any) {
        if (this.logLevel <= LogLevels.Trace) {
            this.log(message);
        }
    }
    public warning(message: any) {
        if (this.logLevel <= LogLevels.Warning) {
            this.err(message);
        }
    }

    public error(message: any) {
        if (this.logLevel <= LogLevels.Error) {
            this.err(message);
        }
    }

    private log(message: any) {
        console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${this.stringify(message)}`);
    }

    private err(message: any ) {
        console.error(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${this.stringify(message)}`);
    }

    private stringify(message: any): string {
        if (typeof(message) === 'object') {
            return JSON.stringify(message);
        }
        return message;
    }
}
