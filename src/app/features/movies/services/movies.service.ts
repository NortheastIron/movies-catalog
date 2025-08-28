import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from '@features/movies/types';

@Injectable()
export class MoviesService {
    private _apiUrl = 'api/movies';
    private _http = inject(HttpClient);
    private _filters: WritableSignal<{ name: string }> = signal({ name: '' });

    public updateFilters(filters: { name?: string }): void {
        this._filters.update(curFil => ({ ...curFil, ...filters}));
    }

    public getAllItems(): Observable<Movie[]> {
        const params = this._buildQueryParams();
        return this._http.get<Movie[]>(`${this._apiUrl}?${params}`);
    }

    public getItem(id: number): Observable<Movie> {
        return this._http.get<Movie>(`${this._apiUrl}/${id}`);
    }

    private _buildQueryParams(): string {
        const filters = this._filters();
        const params: string[] = [];

        if (filters.name) {
            params.push(`name=${encodeURIComponent(filters.name)}`);
        }

        return params.join('&');
    }
}