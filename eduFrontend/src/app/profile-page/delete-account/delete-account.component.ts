import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css',
})
export class DeleteAccountComponent {

  profileService = inject(ProfileService);

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
        
      }
    })
    
  }

  checkInputStatus(elem: NgModel) {
    return elem.invalid && (elem.dirty || elem.touched);
  }
}
