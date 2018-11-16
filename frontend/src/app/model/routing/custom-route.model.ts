import { Route } from '@angular/router';

export interface CustomRoute extends Route {
    name?: string;
    includeInNav?: boolean;
    children?: CustomRoute[];
    iconId?: string;
}

export declare type CustomRoutes = CustomRoute[];
