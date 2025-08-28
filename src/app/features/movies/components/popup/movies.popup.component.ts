import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    signal,
    ViewChild,
    WritableSignal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppEvents } from '@core';

import { Movie } from '@features/movies/types';

import { MoviesPopupEvent } from './enums';
import { MoviesGenresService } from '@features/movies/services';

@Component({
    selector: 'app-movies-popup',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: './movies.popup.component.html',
    styleUrl: './movies.popup.component.scss',
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class MoviesPopupComponent {

    private _moviesGenresService = inject(MoviesGenresService);

    protected popStyle: WritableSignal<{ top?: string; left?: string }> = signal({});

    public data: InputSignal<Movie> = input.required();
    public popupEvents: OutputEmitterRef<AppEvents<MoviesPopupEvent>> = output();

    protected genresNames = computed(() => {
        return this._genres().map(genre => this._moviesGenresService.getGenreName(genre));
    });

    private _genres = computed(() => this.data()?.genres);

    constructor(private _el: ElementRef) {}

    @ViewChild('popupElement', {static: false})
    private _popupElement: ElementRef | undefined;

    @HostListener('window:resize')
    onWindowChange() {
        this._calculatePosition();
    }

    ngAfterViewInit() {
        this._calculatePosition();
    }

    protected onClose(): void {
        this.popupEvents.emit({ type:  MoviesPopupEvent.CLOSE });
    }

    private _calculatePosition() {
        const popupElement = this._popupElement?.nativeElement;
        const parentElement = this._el.nativeElement.parentElement;

        if (!popupElement || !parentElement) return;

        const parentRect = parentElement.getBoundingClientRect();
        const popupRect = popupElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const ledgeX = (popupRect.width - parentRect.width) / 2;
        let top = 50;
        let left = -ledgeX;

        if ((parentRect.left - ledgeX < 0)) {
            left -= (parentRect.left - ledgeX - 15);
        } else if ((parentRect.right + ledgeX > viewportWidth)) {
            left -= (parentRect.right + ledgeX - viewportWidth + 15);
        }

        if ((parentRect.top + popupRect.height + top > viewportHeight)) {
            top -= parentRect.top + popupRect.height + top - viewportHeight + 20;
        }

        this.popStyle.set({
            top: `${top}px`,
            left: `${left}px`
        });
    }
}