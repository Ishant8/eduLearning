import { Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { ProfileService } from '../profile-page/profile.service';
import { Register } from './register.model';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  // nameInput = viewChild<NgModel>('nameInput');

  // checkInputStatus() {
  //   return this.nameInput()!.invalid && (this.nameInput()!.dirty || this.nameInput()!.touched)
  // }
  
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);
  private router = inject(Router)
  private toastService = inject(ToastService)

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
      this.userDetails.role="ROLE_ADMIN";
    }
    
    const subscription = this.profileService.addUser("http://localhost:8080/user/create",this.userDetails)
    .subscribe({
      next:(resData)=>{
        console.log(resData);
        this.toastService.generateToast(this.toastComponent,true,"Registration Successful")
      },
      complete:()=>{
        setTimeout(()=>{
          this.router.navigate(["/login"]);
        },700)
      },
      error:(err)=>{
        console.log(err);
        this.toastService.generateToast(this.toastComponent,false,"Registration Failed!")
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
