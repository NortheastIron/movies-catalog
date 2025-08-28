import { Directive, HostBinding, input, InputSignal } from '@angular/core';

@Directive({
    selector: "[appLoadingState]",
    standalone: true
})
export class LoadingStateDirective {

    public isLoading: InputSignal<boolean> = input(false, {alias: 'appLoadingState'});

    @HostBinding('style.position') get getPosition() {
        return 'relative';
    }

    @HostBinding('class.loading-blur') get getBlurClass() {
        return this.isLoading();
    }
}