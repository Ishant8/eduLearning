import { Component, computed, inject, Injector, OnInit, signal } from '@angular/core';
import { CourseCarouselComponent } from "./course-carousel/course-carousel.component";
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.model';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../profile-page/profile.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CourseCarouselComponent,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  courseService = inject(CourseService);
  profileService = inject(ProfileService);
  courses = signal<Course[] | undefined>(undefined);
  categories = signal<Set<string>>(new Set());
  filterCourses = signal<Course[] | undefined>(undefined);
  instructorCourses = signal<Course[] | undefined>(undefined);
  firstElement = signal<string>('Photography');

  userDetails = computed(() => this.profileService.profile());

  
  constructor(private injector: Injector){}
  
  ngOnInit(): void {
    console.log('In testimonial onInit');

    setTimeout(()=>{
      console.log(this.profileService.profile());
      console.log(this.userDetails()?.role);
    }, 1000)

    console.log(this.userDetails()?.role);
    

    // if(this.role() !== "ROLE_ADMIN")
    // {
    //   this.courseService
    //   .getCourses('http://localhost:8080/course/user')
    //   .subscribe({
    //     next: (resData) => {

    //       this.courses.set(resData);

    //       if(resData.length == 0)
    //         {
    //           this.courseService.getAllCourses(1).subscribe({
    //             next:(resData2)=>{
    //               this.courseService.course.set(resData2);
    //               console.log(this.courseService.course());
    //             }
    //           })
    //         }
    //       else{
    //         resData.forEach((course) => {
    //           this.categories().add(course.categoryName);
    //         });
  
    //         this.firstElement.set(this.categories().values().next().value as string);
  
    //         this.getFilterCourses(this.firstElement());
    //       }
    //     },
    //   });
    // }else{
    //   this.getInstructorCourses()
    // }

    toObservable(this.userDetails, { injector: this.injector })
      .pipe(
        filter((userDetails) => userDetails !== undefined), // Wait until userdetails is available
        tap((userDetails) => {
          
          if (this.userDetails()?.role == 'ROLE_ADMIN') {
            this.getInstructorCourses();
          }
          this.courseService
            .getCourses('http://localhost:8080/course/user')
            .subscribe({
              next: (resData) => {
                this.courses.set(resData);

                if (resData.length == 0) {
                  this.courseService.getAllCourses(1).subscribe({
                    next: (resData2) => {
                      this.courseService.course.set(resData2);
                      console.log(this.courseService.course());
                    },
                  });
                } else {
                  resData.forEach((course) => {
                    this.categories().add(course.categoryName);
                  });

                  this.firstElement.set(
                    this.categories().values().next().value as string
                  );

                  this.getFilterCourses(this.firstElement());
                }
              },
            });
        })
      )
      .subscribe();

  }

  getFilterCourses(categoryName: string) {
    this.courseService
      .getCourses('http://localhost:8080/course/notenrolled/' + categoryName)
      .subscribe({
        next: (resData) => {
          this.filterCourses.set(resData);
        },
      });
  }

  getInstructorCourses(){

    this.courseService.getInstructorCourses(this.profileService.profile()?.email as string)
    .subscribe({
      next:(resData)=>{
        this.instructorCourses.set(resData);

        
      }
    })
  }

  getEnrollCourse(){
    this.courseService
            .getCourses('http://localhost:8080/course/user')
            .subscribe({
              next: (resData) => {
                this.courses.set(resData);

                if (resData.length == 0) {
                  this.courseService.getAllCourses(1).subscribe({
                    next: (resData2) => {
                      this.courseService.course.set(resData2);
                      console.log(this.courseService.course());
                    },
                  });
                } else {
                  resData.forEach((course) => {
                    this.categories().add(course.categoryName);
                  });

                  this.firstElement.set(
                    this.categories().values().next().value as string
                  );

                  this.getFilterCourses(this.firstElement());
                }
              },
            });
  }
}
