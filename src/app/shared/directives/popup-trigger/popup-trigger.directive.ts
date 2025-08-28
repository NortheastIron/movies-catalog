import {
    Directive,
    ElementRef,
    HostListener,
    InputSignal,
    input,
    OutputEmitterRef,
    output,
    effect
} from '@angular/core';

@Directive({
    selector: '[appPopupTrigger]',
    standalone: true
})
export class PopupTriggerDirective {

    public appPopupTrigger: InputSignal<boolean> = input(false);

    public popupOpened: OutputEmitterRef<void> = output();
    public popupClosed: OutputEmitterRef<void> = output();

    private _isOpen = false;

    constructor(private elementRef: ElementRef) {

        effect(() => {
            if (this.appPopupTrigger() !== this._isOpen) {
                this._isOpen = this.appPopupTrigger();
            }
        });
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        event?.stopPropagation

        if (!this._isOpen ) {
            this.openPopup();
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this._isOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.closePopup();
        }
    }

    openPopup() {
        this._isOpen = true;
        this.popupOpened.emit();
    }

    closePopup() {
        this._isOpen = false;
        this.popupClosed.emit();
    }
}