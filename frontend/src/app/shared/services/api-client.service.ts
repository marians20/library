import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class ApiClient {

    public apiUrl: string;

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        protected httpClient: HttpClient,
        protected logger: LoggingService) {
    }

    public get<T>(url: string): Observable<T> {
        this.logger.trace(`GET ${this.checkUrl(url)}`);
        return this.httpClient.get<T>(this.checkUrl(url))
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public post<T>(url: string, data: object): Observable<T> {
        this.logger.trace(`POST ${this.checkUrl(url)}`);
        this.logger.trace(data);
        this.logger.trace('===== END POST data =====');
        return this.httpClient.post<T>(this.checkUrl(url), data)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public put(url: string, data: object): Observable<object> {
        this.logger.trace(`PUT ${this.checkUrl(url)}`);
        this.logger.trace(data);
        this.logger.trace('===== END PUT data =====');
        return this.httpClient.put(this.checkUrl(url), data)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public patch(url: string, data: object): Observable<object> {
        this.logger.trace(`PATCH ${this.checkUrl(url)}`);
        this.logger.trace(data);
        this.logger.trace('===== END PATCH data =====');
        return this.httpClient.patch(this.checkUrl(url), data)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public delete(url: string): Observable<object> {
        this.logger.trace(`DELETE ${this.checkUrl(url)}`);
        return this.httpClient.delete(this.checkUrl(url))
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    private checkUrl(url: string): string {
        if (url.endsWith('/')) {
            return url;
        }
        return `${url}/`;
    }

    private handleError(error: HttpErrorResponse) {
        const logger: LoggingService = new LoggingService();
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            logger.error(error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            logger.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
