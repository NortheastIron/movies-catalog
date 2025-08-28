import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    signal,
    WritableSignal
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';

import { AppEvents } from '@core';

import {
    LoadingStateDirective,
    LoadingIndicatorComponent,
    ErrorBoxComponent,
    ErrorBoxEvent,
} from '@shared';

import { Movie } from '@features/movies/types';
import { MoviesItemComponent } from '@features/movies/components/item';
import { MoviesService } from '@features/movies/services';

@Component({
    selector: 'app-movies-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: './movies.page.component.html',
    styleUrl: './movies.page.component.scss',
    imports: [
        MoviesItemComponent,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        LoadingIndicatorComponent,
        ErrorBoxComponent,
        LoadingStateDirective
],
    providers: [MoviesService]
})
export class MoviesPageComponent {

    private _moviesService = inject(MoviesService);

    protected movies: WritableSignal<Movie[]> = signal([]);
    protected filters = {
        name: signal<string>('')
    };
    protected isLoading: WritableSignal<boolean> = signal(false);
    protected error: WritableSignal<string | null> = signal(null);
    private _filterDebounceTimer: any;
    private _initialLoadDone: boolean = false;

    constructor() {

        effect(() => {
            const name = this.filters.name();

            if (!this._initialLoadDone) {
                this._initialLoadDone = true;

                this._updateServiceFilters({
                    name
                }, 0);
                return;
            }

            this._updateServiceFilters({
                name
            });
        });
    }

    protected onHandleErrorBoxEvent(event: AppEvents<ErrorBoxEvent>): void {
        if (event.type === ErrorBoxEvent.RELOAD) {
            this._loadData();
        }
    }

    private _loadData(): void {
        this.isLoading.set(true);
        this.error.set(null);

        this._moviesService.getAllItems().pipe(
            finalize(() => this.isLoading.set(false))
        ).subscribe({
            next: (data: Movie[]) => {
                this.movies.set(data);
            },
            error: (err) => {
                this.error.set('Ошибка загрузки данных. Попробуйте ещё раз.');
                console.error(err);
            }
        })
    }

    private _updateServiceFilters(filters: { name: string }, debounce = 300): void {
        clearTimeout(this._filterDebounceTimer);
        this._filterDebounceTimer = setTimeout(() => {
            this._moviesService.updateFilters(filters);
            this._loadData();
        }, debounce);
    }

}