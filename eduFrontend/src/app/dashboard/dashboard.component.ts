import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseCarouselComponent } from "./course-carousel/course-carousel.component";
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CourseCarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  courseService = inject(CourseService);
  courses = signal<Course[] | undefined>(undefined);
  categories = signal<Set<string>>(new Set());
  filterCourses = signal<Course[] | undefined>(undefined);
  firstElement = signal<string>('Photography');

  ngOnInit(): void {
    console.log('In testimonial onInit');

    this.courseService
      .getCourses('http://localhost:8080/course/user')
      .subscribe({
        next: (resData) => {

          this.courses.set(resData);

          if(resData.length == 0)
            {
              this.courseService.getAllCourses().subscribe({
                next:(resData2)=>{
                  this.courseService.course.set(resData2);
                  console.log(this.courseService.course());
                }
              })
            }
          else{
            resData.forEach((course) => {
              this.categories().add(course.categoryName);
            });
  
            this.firstElement.set(this.categories().values().next().value);
  
            this.getFilterCourses(this.firstElement());
          }
        },
      });
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
}
