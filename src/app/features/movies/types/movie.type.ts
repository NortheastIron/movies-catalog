import { MoviesGenres } from '@features/movies/enums';

export type Movie = {
    id: number;
    name: string;
    year: number;
    description: string;
    genres: MoviesGenres[];
    rate: number;
    img: string;
};