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
          console.log(resData);

          this.courses.set(resData);

          resData.forEach((course) => {
            this.categories().add(course.categoryName);
          });

          this.firstElement.set(this.categories().values().next().value);
          console.log(this.firstElement());

          this.getFilterCourses(this.firstElement());
          this.courseService.course.set(resData);
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
