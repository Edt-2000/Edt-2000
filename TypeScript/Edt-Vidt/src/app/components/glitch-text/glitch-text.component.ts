import { Component, Input } from '@angular/core';

@Component({
    selector: 'edt-glitch-text',
    templateUrl: './glitch-text.component.html',
    styleUrls: ['./glitch-text.component.scss']
})
export class GlitchTextComponent {
    @Input() text!: string;
    @Input() level?: number
}
