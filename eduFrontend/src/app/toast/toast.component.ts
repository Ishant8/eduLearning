// toast.component.ts
import { Component, ElementRef, ViewChild, Input, signal, input } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @ViewChild('liveToast') liveToast!: ElementRef;
  @Input() toastMessage = 'This is a toast message.';
  @Input() isSuccessful = true;
  isToastVisible = signal(false); 

  showToast() {
    const toastElement = this.liveToast.nativeElement;
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    toastInstance.show();
    this.isToastVisible.set(true);
  }

  hideToast() {
    const toastElement = this.liveToast.nativeElement;
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    toastInstance.hide();
    this.isToastVisible.set(false);
  }
}
