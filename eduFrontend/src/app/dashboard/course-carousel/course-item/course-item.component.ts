import { Component, inject, input, ViewChild } from '@angular/core';
import { Course } from '../../../courses/course.model';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../profile-page/profile.service';
import { CourseService } from '../../../courses/course.service';
import { ToastComponent } from '../../../toast/toast.component';
import { ToastService } from '../../../toast/toast.service';

@Component({
  selector: '[course-item]',
  standalone: true,
  imports: [RouterLink, ToastComponent],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {
  instructor: string[] = []
  description: string=''
  ratingSum: number=0;
  avgRating: number=0;

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  
  profileService = inject(ProfileService);
  courseService = inject(CourseService)
  private toastService = inject(ToastService);

  course = input.required<Course>();
  enrolled = input.required<boolean>();

  starRating = Array(5).fill(0).map((x,i)=>i+1);
  isHalf(rate:number) { 
    return  Math.ceil(this.avgRating)===rate;
  };

  // instructor = computed(()=> Object.values(this.course().instructorDetails)[0]);
  ngOnInit(): void {
    this.instructor = Object.values(this.course().instructorDetails);
    this.description = this.course().courseDescription.split("\n")[1];

    console.log(this.course().instructorDetails);
    
    
    if(this.course().reviews.length != 0)
    {
      this.course().reviews.forEach((review)=>{
        this.ratingSum+=review.rating;
      });
  
      this.avgRating= Math.round((this.ratingSum/this.course().reviews.length)*10)/10;
    }
    else this.avgRating=0;
      
    
  }

  deleteCourse() {
    this.courseService.courseDelete(this.course().courseId).subscribe({
      next:()=>{
        this.toastService.generateToast(
          this.toastComponent,
          true,
          'Course Deleted Successfully'
        );
        setTimeout(()=>{
          window.location.reload();
        },1000);
      },
      error:(err)=>{
        console.log(err);
        
        this.toastService.generateToast(
          this.toastComponent,
          true,
          'Course Deletion Failed'
        );
        setTimeout(()=>{
          window.location.reload();
        },1000);
      }
    })
  }
    
}
