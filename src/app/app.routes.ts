import { Routes } from '@angular/router';

import { MoviesPageComponent } from '@features';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        component: MoviesPageComponent,
        title: 'Movies Catalog'
    },
    {
        path: '**',
        redirectTo: '/movies',
        pathMatch: 'full'
    }
];
