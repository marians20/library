import { ErrorHandler } from '@angular/core';
import { LoggingService } from '.';
import { HttpErrorResponse } from '@angular/common/http';


export class MyErrorHandler implements ErrorHandler {

    constructor(
        private logger: LoggingService
    ) { }
    handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
            } else {
                // Handle Http Error (error.status === 403, 404...)
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)
        }
        // this.logger.debug('Something terrible happened!');
        console.error(error);
    }
}
