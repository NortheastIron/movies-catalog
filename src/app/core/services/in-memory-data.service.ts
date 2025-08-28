import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import moviesData from '../../../../public/data.json';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService  {

    createDb() {
        return { movies: moviesData };
    }
}