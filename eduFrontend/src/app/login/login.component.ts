import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProfileService } from '../profile-page/profile.service';
import { setCookie } from '../utils/cookie.util';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  profileService = inject(ProfileService)
  router = inject(Router)
  destroyRef = inject(DestroyRef)
  
  username = ''
  password = ''

  checkInputStatus(elem:NgModel) {
    return elem.invalid && (elem.dirty || elem.touched)
  }

  doLogin(){
    const subscription = this.profileService.login({email:this.username, password:this.password})
    .subscribe({
      next: (resData) => {
        console.log(resData);
      },
      complete: () => {
        this.router.navigate(['/profile']).then(()=>{
          window.location.reload();
        });
      },
      error:(err) => {
        console.log(err);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
