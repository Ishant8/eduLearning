import { Component, DestroyRef, inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.css',
})
export class AccountSecurityComponent {
  profileService = inject(ProfileService);
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
      complete: () => {
          this.router.navigate(['/']).then(() => {
            window.location.reload(); // Refresh the page
          });
        },
      error: (err) => {
          console.log(err);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
