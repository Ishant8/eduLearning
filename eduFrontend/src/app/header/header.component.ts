import {
  Component,
  computed,
  HostListener,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../profile-page/profile.service';
import { deleteCookie, getCookie } from '../utils/cookie.util';
import { Course } from '../courses/course.model';
import { CourseService } from '../courses/course.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { query } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private profileService = inject(ProfileService);

  searchControl = new FormControl('');

  userDetail = computed(() => this.profileService.profile());
  isLoggedIn = signal<boolean>(false);

  courses = signal<Course[] | undefined>(undefined);

  searchString: string | null = null;

  courseService = inject(CourseService);
  router = inject(Router);

  private renderer = inject(Renderer2);

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) =>
          this.courseService.getCoursesBySearch(query as string)
        )
      )
      .subscribe({
        next: (resData) => {
          // this.showDropdown();
          this.courses.set(resData);
        },
      });
  }

  ngOnInit(): void {
    if (getCookie('JwtToken')) {
      this.profileService.getUser().subscribe({
        next: (resData) => {
          this.profileService.profile.set(resData);
        },
      });
      this.isLoggedIn.set(true);
    }
  }

  // showDropdown(){
  //   this.renderer.removeClass(document.getElementById('dropdown-custom'),"d-none");
  // }

  // hideDropdown(){
  //   this.renderer.addClass(document.getElementById('dropdown-custom'),"d-none");
  //   this.searchControl.setValue('');
  // }

  navigateToCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
    this.searchControl.setValue('');
    // this.hideDropdown();
  }

  instructorNames(obj: {}) {
    const values = Object.values(obj);
    let result = '';

    for (let i = 0; i < values.length; i++) {
      result += values[i] + ' | ';
    }

    result = result.slice(0, result.length - 3);

    return result;
  }

  logout() {
    this.isLoggedIn.set(true);
    deleteCookie('JwtToken');
    window.location.reload();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    console.log('clicked');

    // If the click is outside the dropdown or input, hide it
    if (!targetElement.closest('.search-functionality')) {
      // this.hideDropdown();
      this.searchControl.setValue('');
    }
  }
}
