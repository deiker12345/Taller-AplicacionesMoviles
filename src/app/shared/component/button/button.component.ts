import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color = 'primary';
  @Input() fill: 'solid' | 'outline' | 'clear' = 'solid';
  @Input() expand: 'full' | 'block' = 'full';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() iconPosition: 'start' | 'end' = 'start';

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
  }
}