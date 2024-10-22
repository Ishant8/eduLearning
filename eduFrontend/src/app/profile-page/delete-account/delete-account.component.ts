import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css',
})
export class DeleteAccountComponent {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  private toastService = inject(ToastService)
  profileService = inject(ProfileService);

  router = inject(Router);

  password=''
  checked = signal<boolean>(false);
  validPass = signal<boolean>(false);
  
  checkPassword() {
    
    this.profileService.checkPassword(this.password)
    .subscribe({
      next: (resData)=>{
        this.validPass.set(resData);
        this.checked.set(true);
        console.log(resData);
        if(this.validPass())
          this.toastService.generateToast(this.toastComponent,true,"Account Deleted Successfully")
        else
        this.toastService.generateToast(this.toastComponent,false,"Account Deletion Failed")
      },
      error:()=>{
        this.toastService.generateToast(this.toastComponent,false,"Account Deletion Failed")
      }
    })
    
  }

  checkInputStatus(elem: NgModel) {
    return elem.invalid && (elem.dirty || elem.touched);
  }
}
