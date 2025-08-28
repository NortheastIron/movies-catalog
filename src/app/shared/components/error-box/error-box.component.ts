import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppEvents } from '@core';

import { ErrorBoxEvent } from '@shared/components/error-box';

@Component({
    selector: 'app-error-box',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './error-box.component.html',
    styleUrl: './error-box.component.scss'
})
export class ErrorBoxComponent {
    public error: InputSignal<string | null> = input.required();
    public appEvents: OutputEmitterRef<AppEvents<ErrorBoxEvent>> = output();

    protected isStrongClose: boolean = false;

    constructor() {
        effect(() => {
            this.error();
            this.isStrongClose = false;
        });
    }

    protected loadData(): void {
        this.appEvents.emit({type: ErrorBoxEvent.RELOAD});
    }

    protected onClose(): void {
        this.isStrongClose = true;
         this.appEvents.emit({type: ErrorBoxEvent.CLOSE});
    }
}