import { Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { ProfileService } from '../profile-page/profile.service';
import { Register } from './register.model';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  // nameInput = viewChild<NgModel>('nameInput');

  // checkInputStatus() {
  //   return this.nameInput()!.invalid && (this.nameInput()!.dirty || this.nameInput()!.touched)
  // }
  
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);
  private router = inject(Router)

  fullName=''
  confirmPassword = '';
  agree = false
  destroyRef = inject(DestroyRef)

  role=signal<"user"|"instructor">("user");
  
  userDetails:Register = {
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    role:""
  };
  aggrement=false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role.set(params.get('role') as "user"|"instructor"); 
    });
  }

  checkInputStatus(elem:NgModel) {      
    return elem.invalid && (elem.dirty || elem.touched)
  }

  addUser(){
    this.userDetails.firstName = this.fullName.split(' ')[0];
    this.userDetails.lastName = this.fullName.split(' ')[1];
    let url;
    if(this.role() === "user"){
      this.userDetails.role="ROLE_USER";
    }
    else if(this.role() === "instructor"){
      this.userDetails.role="ROLE_INSTRUCTOR";
    }
    
    const subscription = this.profileService.addUser("http://localhost:8080/user/create",this.userDetails)
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
