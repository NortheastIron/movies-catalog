import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading-indicator',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatProgressSpinnerModule
    ],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {

    public isLoading: InputSignal<boolean> = input(true);
}