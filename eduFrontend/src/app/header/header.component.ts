import { Component, computed, inject, Renderer2, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../profile-page/profile.service';
import { deleteCookie, getCookie } from '../utils/cookie.util';
import { Course } from '../courses/course.model';
import { CourseService } from '../courses/course.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private profileService = inject(ProfileService);

  userDetail = computed(()=>this.profileService.profile())
  isLoggedIn = signal<boolean>(false);

  courses = signal<Course[]|undefined>(undefined);

  searchString:string|null=null;

  courseService = inject(CourseService);

  private renderer = inject(Renderer2);

  ngOnInit(): void {
    if(getCookie('JwtToken')){
      this.profileService.getUser().subscribe({
        next:(resData) => {
          this.profileService.profile.set(resData)
        }
      });
      this.isLoggedIn.set(true);
    }
  }

  showDropdown(){
    this.renderer.removeClass(document.getElementById('dropdown-custom'),"d-none");
  }
  
  hideDropdown(){
    this.renderer.addClass(document.getElementById('dropdown-custom'),"d-none");
    this.searchString = null;
  }

  getCoursesByFilter(){
    this.showDropdown();
    console.log(this.searchString);
    
    const courses = this.courseService.getCoursesBySearch(this.searchString as string).subscribe({
      next:(resData)=>{
        this.courses.set(resData);
      }
    })
  }


  logout(){
    this.isLoggedIn.set(true);
    deleteCookie("JwtToken");
    window.location.reload();
  }
}
