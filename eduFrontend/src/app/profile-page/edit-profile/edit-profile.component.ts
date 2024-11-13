import { Component, computed, inject, input, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { Profile } from '../profile.model';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { FormsModule, NgModel } from '@angular/forms';
import { first } from 'rxjs';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
 
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  
  profileService = inject(ProfileService)
  toastService = inject(ToastService)
  router = inject(Router);
  myProfile :any;

  firstName = '';
  lastName = '';
  prevEmail = ''
  email = '';

  checkInputStatus(elem:NgModel) {
    return elem.invalid && (elem.dirty || elem.touched)
  }

  checkEmailStatus(){
    return this.email === this.prevEmail
  }

  ngOnInit(): void {
    
    this.myProfile = this.profileService.profile;
    this.firstName = this.myProfile().firstName;
    this.lastName = this.myProfile().lastName;
    this.email = this.myProfile().email;
    this.prevEmail = this.myProfile().email;
  }

  updateUser(){
    // this.myProfile.update((data:Profile) => {return {...data, firstName:this.firstName, lastName:this.lastName, email: this.email}});
    this.profileService.setUser({...this.myProfile(), firstName:this.firstName, lastName:this.lastName, email: this.email})
    .subscribe({
      next: (resData) => {
        this.profileService.profile.set(resData);
        this.toastService.generateToast(this.toastComponent,true,"Updated User Successfully.")
      },
      complete:()=>{
        setTimeout(()=>{
          if(!this.checkEmailStatus())
            this.router.navigate(['/dashboard']);
          },1000)
      },
      error:()=>{
        this.toastService.generateToast(this.toastComponent,false,"User Updation Failed")
      }
    });;
  }

}


// export class EditProfileComponent {
 
//   profileService = inject(ProfileService)
//   // firstName = '';
//   myProfile :any;

//   firstName = '';
//   lastName = '';
//   email = '';
  
//   // firstName = computed(() => this.profileService.profile()?.firstName);

//   // updateFirstName(newFirstName: string): void {
//   //   console.log(this.firstName() == newFirstName);
    
//   //   const currentProfile = this.profileService.profile();
//   //   if (currentProfile) {
//   //     this.profileService.profile.set({ ...currentProfile, firstName: newFirstName });
//   //   }
//   // }

//   ngOnInit(): void {
//     this.myProfile = this.profileService.profile;
//     this.firstName = this.myProfile().firstName;
//     this.lastName = this.myProfile().lastName;
//     this.email = this.myProfile().email;
//     // this.firstName = this.myProfile()?.firstName as string;
//   }

//   // ngOnChanges(changes: SimpleChanges): void {
//   //   // this.profile = this.profileService.profile;

//   //   for (const inputName in changes) {
//   //     const inputValues = changes[inputName];
//   //     console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
//   //     console.log(`Current ${inputName} == ${inputValues.currentValue}`);
//   //     console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
//   //   }
//   // }


  

//   // firstName = computed(()=>this.profileService.profile()?.firstName);
//   // lastName = computed(()=>this.profileService.profile()?.lastName);
//   // email = computed(()=>this.profileService.profile()?.email);
//   // myEmail = this.email();
  



// }

