import {
    ChangeDetectionStrategy,
    Component,
    input,
    InputSignal,
    signal,
    WritableSignal
} from '@angular/core';

import { AppEvents } from '@core';

import { PopupTriggerDirective } from '@shared';

import { Movie } from '@features/movies/types';
import { MoviesPopupComponent, MoviesPopupEvent } from '@features/movies/components/popup';

@Component({
    selector: 'app-movies-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: './movies.item.component.html',
    styleUrl: './movies.item.component.scss',
    imports: [PopupTriggerDirective, MoviesPopupComponent]
})
export class MoviesItemComponent {
    public data: InputSignal<Movie> = input.required();

    protected isPopup: WritableSignal<boolean> = signal(false);

    protected onPopupClosed() {
        console.log('closed popup');
        this.isPopup.set(false);
    }

    protected onPopupHandlerEvents(event: AppEvents<MoviesPopupEvent>) {
        if (event.type === MoviesPopupEvent.CLOSE) {
            this.onPopupClosed();
        }
    }

    protected onPopupOpened() {
        this.isPopup.set(true);
    }
}