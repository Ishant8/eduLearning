  import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { JumbotronComponent } from "../home-page/jumbotron/jumbotron.component";
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { TestimonialComponent } from '../home-page/testomonials/testimonial/testimonial.component';
import { CourseCardComponent } from "../course-card/course-card.component";
import { PageNavComponent } from "../page-nav/page-nav.component";
import { CourseService } from './course.service';
import { Course } from './course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, JumbotronComponent, TestomonialsComponent, TestimonialComponent, CourseCardComponent, PageNavComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  
  courseService = inject(CourseService);
  courses = signal<Course[] | undefined>(undefined);

  ngOnInit() {
    this.courseService.getCourses("http://localhost:8080/course/get")
    .subscribe({
      next:(resData)=>{
        this.courses.set(resData);
        this.courseService.course.set(resData)
        
      }
    })
  }
  
}



// this.courses()?.forEach((course)=>{
        //   console.log(course.courseId+' '+course.courseName+' '+course.categoryName);
        //   // course.instructorDetails.forEach((instructor)=>{
        //   //   console.log(instructor.id +" "+instructor.name);
        //   // })
        //   for(let id in course.instructorDetails)
        //   {
        //     console.log("    "+id +" "+course.instructorDetails[id]);
            
        //   }
          
        //   course.reviews.forEach((review)=>{
        //     console.log("           "+review.reviewId+" "+review.comment+" "+review.userName+" "+review.courseId+" "+review.userId + " " + review.rating);
            
        //   })
          
          
        // });
