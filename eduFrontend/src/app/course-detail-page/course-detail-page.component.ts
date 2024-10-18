import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.model';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [TestomonialsComponent, RouterLink],
  templateUrl: './course-detail-page.component.html',
  styleUrl: './course-detail-page.component.css'
})
export class CourseDetailPageComponent implements OnInit {
  
  courseId:number | undefined
  courseService = inject(CourseService)
  course = signal<Course | undefined>(undefined)

  profileService = inject(ProfileService);

  instructor = computed(() => Object.values(this.course()!.instructorDetails)[0])
  ratingSum: number=0;
  avgRating = computed(() => {
    if (this.course()!.reviews.length != 0) {
      this.course()!.reviews.forEach((review) => {
        this.ratingSum += review.rating;
      });

      return Math.round((this.ratingSum / this.course()!.reviews.length) * 10) / 10;
    }
    return 0
  });

  description = computed(() => this.course()?.courseDescription.split("-----") as string[])
  // description:string[] = [] ;


  constructor(private route: ActivatedRoute) {}

  ngOnInit(){

    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));    
    
    if(!this.courseService.course())
    {
      this.courseService.getCourses("http://localhost:8080/course/get").subscribe({
        next:(resData)=>{
          this.course.set(resData.find((course)=>course.courseId === this.courseId));
          this.courseService.course.set(resData)
          // this.description = this.course()!.courseDescription.split("\n");
        }
      })
    }
    else{
      this.course.set(this.courseService.course()?.find((course)=>course.courseId === this.courseId));
      // this.description = this.course()?.courseDescription.split("\n") as string[];
    }
    
    

    // this.instructor.set(Object.values(this.course()!.instructorDetails)[0]);
    
    // if (this.course()!.reviews.length != 0) {
    //   this.course()!.reviews.forEach((review) => {
    //     this.ratingSum += review.rating;
    //   });

    //   this.avgRating =
    //     Math.round((this.ratingSum / this.course()!.reviews.length) * 10) / 10;
    // } else this.avgRating = 0;

    // this.description.set(this.course()?.courseDescription.split("\n") as string[])
    // console.log(this.description);
    
    
    
  }

  
  
}
