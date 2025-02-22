import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="show"
      class="toast"
      [class.success]="type === 'success'"
      [class.error]="type === 'error'"
    >
      {{ message }}
    </div>
  `,
  styles: [
    `
      .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
      }

      .success {
        background-color: #4caf50;
      }

      .error {
        background-color: #f44336;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent {
  @Input() message = '';
  @Input() show = false;
  @Input() type: 'success' | 'error' = 'success';
}
