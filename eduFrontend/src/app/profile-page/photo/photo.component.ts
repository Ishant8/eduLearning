import { Component, computed, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProfileService } from '../profile.service';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../toast/toast.service';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage, OutputFormat } from 'ngx-image-cropper';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [FormsModule, ToastComponent, ImageCropperComponent],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
})
export class PhotoComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  imgSrc = signal<string | ArrayBuffer>(
    'images/placeholder/placeholder-600x400.png'
  );
  imgSrc2 = signal<string | undefined>(
    'images/placeholder/placeholder-600x400.png'
  );

  imageSelected:boolean = false;

  imageFormat: OutputFormat = 'png';

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  private profileService = inject(ProfileService);
  private toastService = inject(ToastService);

  imgDet = viewChild.required<File>('imgDetail');

  selectedImage: File | null = null;

  ngOnInit(): void {
    if (this.profileService.profile()?.profileImage) {
      this.imgSrc.set(
        'data:image/*;base64,' + this.profileService.profile()?.profileImage
      );
      this.imgSrc2.set(
        'data:image/*;base64,' + this.profileService.profile()?.profileImage
      );
    }
  }

  constructor(private sanitizer: DomSanitizer) {}

  imgDetails(event: Event) {
    this.imageChangedEvent = event;

    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.selectedImage = input.files[0];
      this.imageFormat = this.selectedImage.type.split('/')[1] as OutputFormat;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imgSrc.set(reader.result as ArrayBuffer);
        this.imgSrc2.set(reader.result as string);

        const img = new Image();
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          if (height < 400)
            document.getElementById('cropperWrapper')!.style.height =
              height + 'px';
          else
            document.getElementById('cropperWrapper')!.style.height = '400px';
        };
        img.src = e.target!.result as string;
      };

      reader.readAsDataURL(file);
    }
  }



  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.selectedImage as File);

    this.profileService
      .uploadProfileImage('http://localhost:8080/user/image', formData)
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.toastService.generateToast(
            this.toastComponent,
            true,
            'Image Set Successfully'
          );
        },
        complete: () => {
          setTimeout(() => {
            window.location.reload();
          }, 700);
        },
        error: () => {
          this.toastService.generateToast(
            this.toastComponent,
            false,
            'Failed to set Image!'
          );
        },
      });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    const blob = event.blob as Blob;

    const croppedImageFile = new File(
      [blob],
      this.selectedImage?.name
        ? (this.selectedImage?.name as string)
        : 'newFile.jpg',
      { type: blob.type }
    );
    this.selectedImage = croppedImageFile;
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
