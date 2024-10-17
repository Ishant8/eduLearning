import { Component, DestroyRef, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { ProfileService } from '../profile-page/profile.service';
import { Register } from './register.model';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // nameInput = viewChild<NgModel>('nameInput');

  // checkInputStatus() {
  //   return this.nameInput()!.invalid && (this.nameInput()!.dirty || this.nameInput()!.touched)
  // }

  checkInputStatus(elem:NgModel) {      
    return elem.invalid && (elem.dirty || elem.touched)
  }

  
  private profileService = inject(ProfileService);
  private router = inject(Router)

  fullName=''
  confirmPassword = '';
  agree = false
  destroyRef = inject(DestroyRef)
  
  userDetails:Register = {
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    role:"ROLE_USER"
  };
  aggrement=false;


  addUser(){
    this.userDetails.firstName = this.fullName.split(' ')[0];
    this.userDetails.lastName = this.fullName.split(' ')[1];
    
    const subscription = this.profileService.addUser(this.userDetails)
    .subscribe({
      next:(resData)=>{
        console.log(resData);
      },
      complete:()=>{
        this.router.navigate(["/login"]);
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
