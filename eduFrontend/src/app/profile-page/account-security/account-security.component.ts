import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.css',
})
export class AccountSecurityComponent {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  
  profileService = inject(ProfileService);
  toastService = inject(ToastService);
  router = inject(Router);
  destroyRef = inject(DestroyRef)

  profile = this.profileService.profile;

  oldPassword = '';
  newPassword = '';
  confirmPassword=''

  checkInputStatus(elem:NgModel) {
    return elem.invalid && (elem.dirty || elem.touched)
  }

  changePassword() {
    const subscription = this.profileService
    .changePassword(this.oldPassword, this.newPassword)
    .subscribe({
      next:()=>{
        this.toastService.generateToast(this.toastComponent,true,"Changed Password Successfully")
      },
      complete: () => {
          setTimeout(()=>{
            this.router.navigate(['/']).then(() => {
              window.location.reload(); // Refresh the page
            })
          },700);
        },
      error: (err) => {
          console.log(err);
          this.toastService.generateToast(this.toastComponent,false,"Failed to Change Password")
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
