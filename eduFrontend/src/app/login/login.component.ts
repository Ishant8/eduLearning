import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProfileService } from '../profile-page/profile.service';
import { setCookie } from '../utils/cookie.util';
import { Router, RouterLink } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink,ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  
  toastService = inject(ToastService);
  profileService = inject(ProfileService)
  router = inject(Router)
  destroyRef = inject(DestroyRef)
  
  username = ''
  password = ''

  checkInputStatus(elem:NgModel) {
    return elem.invalid && (elem.dirty || elem.touched)
  }

  doLogin(event:Event){
    event.preventDefault();
    const subscription = this.profileService.login({email:this.username, password:this.password})
    .subscribe({
      next: (resData) => {
        this.toastService.generateToast(this.toastComponent,true,"Login successful!")
      },
      complete: () => {
        setTimeout(()=>{
          this.router.navigate(['/dashboard']).then(()=>{
            window.location.reload();
          });
        },700)
      },
      error:(err) => {
        this.toastService.generateToast(this.toastComponent,false,"Login failed!");
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  // onLogin(flag:boolean) {

  //   const loginSuccess = flag;

  //   if (loginSuccess) {
  //     this.toastComponent.toastMessage = 'Login successful!';
  //     this.toastComponent.isLoginSuccessful = true;
      
  //   } else {

  //     this.toastComponent.toastMessage = 'Login failed!';
  //     this.toastComponent.isLoginSuccessful = false;
      
  //   }
  //   this.toastComponent.showToast();
  // }
}
