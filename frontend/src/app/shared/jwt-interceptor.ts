
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) {
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        console.log('something terrible happened!');
        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl(`/login`);
            return observableOf(err.message);
        }
        return observableThrowError(err);
    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<any> {
        if (localStorage['jwt'] === undefined) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set(
                'Authorization',
                `Bearer ${localStorage['jwt']}`)
        });

        return next.handle(authReq)
        .pipe(retry(0), catchError(x => this.handleAuthError(x)));
    }
}
