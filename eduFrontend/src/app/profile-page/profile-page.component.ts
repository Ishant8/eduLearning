import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile.model';
import { JsonPipe } from '@angular/common';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [EditProfileComponent,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  profileService = inject(ProfileService);
  profile = signal<Profile|undefined>(undefined)

  destroyRef = inject(DestroyRef)
  router = inject(Router)
  isTimeoutTriggered: boolean = false;

  ngOnInit(): void {
    console.log('on Init');
    this.loadTimeout();
    
    if(this.profileService.profile() === undefined)
    {const subscription = this.profileService.getUser().subscribe({
      next: (resData) => {
        this.profileService.profile.set(resData);            
      },
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })}

    setTimeout(() => {this.profile = this.profileService.profile;},1000)
    
  }

  loadTimeout(){
    if (!this.isTimeoutTriggered) {
      this.isTimeoutTriggered = true;
      setTimeout(() => {
        if (this.profile() === undefined) {
          alert('No data Found');
          this.router.navigate(['/']);
        }
      }, 4000);
    }
  }

}


// export class ProfilePageComponent implements OnInit{
//   profileService = inject(ProfileService);

//   // profile = computed(() => this.profileService.profile());
//   // profileString = computed(()=>this.profileService.profileString());

//   // httpClient = inject(HttpClient)
//   // destroyRef = inject(DestroyRef)
//   profile = signal<Profile|undefined>(undefined)

  
  
//   logUser(){
//     const subscription = this.profileService.getUser();
//     this.profile = this.profileService.profile;
//     // .subscribe({next: (resData) => {
//     //   this.profile.set(resData);
//     // }});
    


//     // console.log(this.profileString());
//     // this.profileService.printProfile();
//     // setTimeout(()=>{console.log(this.profileString());
//     // },3000);
    
//     // console.log(this.profileService.profileString());
//     // console.log('hello');
    
//   }

//   ngOnInit(): void {
//     console.log('on Init');
    
//     this.logUser();
//   }


  
//   // ngOnInit() {
//   //   const subscription = this.httpClient
//   //   .get<Profile>('http://localhost:8080/user/get/13')
//   //   .subscribe({
//   //     next: (resData) => {
//   //       // console.log(resData);
//   //       this.profile.set(resData);
//   //       // this.profileString.set(JSON.stringify(this.profile()))
//   //     },
//   //   })

//   //   this.destroyRef.onDestroy(() => {
//   //     subscription.unsubscribe();
//   //   })
//   // }

// }
