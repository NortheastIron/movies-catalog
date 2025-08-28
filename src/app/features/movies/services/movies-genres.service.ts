import { Injectable } from '@angular/core';

import { MoviesGenres } from '@features/movies/enums';

@Injectable({
    providedIn: 'root'
})
export class MoviesGenresService {
    private readonly _genresMap = new Map<MoviesGenres, string>([
        [MoviesGenres.action, 'Боевик'],
        [MoviesGenres.adventure, 'Приключения'],
        [MoviesGenres.comedy, 'Комедия'],
        [MoviesGenres.crime, 'Криминал'],
        [MoviesGenres.detective, 'Детектив'],
        [MoviesGenres.drama, 'Драма'],
        [MoviesGenres.fantasy, 'Фантастика'],
        [MoviesGenres.history, 'История'],
        [MoviesGenres.melodrama, 'Мелодрамма'],
        [MoviesGenres.thriller, 'Триллер'],
        [MoviesGenres.war, 'Война']
    ]);

    public getGenreName(genre: MoviesGenres): string {
        return this._genresMap.get(genre) || '---';
    }
}