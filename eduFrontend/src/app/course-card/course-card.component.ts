import { Component, computed, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../courses/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit{
  
  instructor: string[] = []
  description: string=''
  ratingSum: number=0;
  avgRating: number=0;

  course = input.required<Course>();

  // instructor = computed(()=> Object.values(this.course().instructorDetails)[0]);
  ngOnInit(): void {
    this.instructor = Object.values(this.course().instructorDetails);
    this.description = this.course().courseDescription.split("-----")[0];

    console.log(this.course().instructorDetails, this.course().instructorEmail);
    
    
    if(this.course().reviews.length != 0)
    {
      this.course().reviews.forEach((review)=>{
        this.ratingSum+=review.rating;
      });
  
      this.avgRating= Math.round((this.ratingSum/this.course().reviews.length)*10)/10;
    }
    else this.avgRating=0;
      
    
  }
}
