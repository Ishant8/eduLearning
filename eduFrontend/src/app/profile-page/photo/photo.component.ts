import { Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProfileService } from '../profile.service';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  
  imgSrc = signal<string | ArrayBuffer>("images/placeholder/placeholder-600x400.png");

  private profileService = inject(ProfileService);
  private toastService = inject(ToastService)

  imgDet = viewChild.required<File>("imgDetail");

  selectedImage:File|null = null;

  imgDetails(event:Event){
    // console.log(event);
    const input = event.target as HTMLInputElement;

    if(input.files && input.files[0]){
      const file = input.files[0];

      this.selectedImage = input.files[0];
    // console.log(this.selectedImage);

      const reader = new FileReader();

      reader.onload = (e) =>{
        this.imgSrc.set(reader.result as ArrayBuffer);
      }

      reader.readAsDataURL(file);
    }
    
  }

  uploadImage(){
  
    const formData = new FormData();
    formData.append("file",this.selectedImage as File);
    

    this.profileService.uploadProfileImage("http://localhost:8080/user/image",formData).subscribe({
      next:(resData)=>{
        console.log(resData);
        this.toastService.generateToast(this.toastComponent,true,"Image Set Successfully")
      },
      complete:()=>{
        setTimeout(()=>{
          window.location.reload();
        },700)
      },
      error:()=>{
        this.toastService.generateToast(this.toastComponent,false,"Failed to set Image!")
      }
    })

    
  }
}
