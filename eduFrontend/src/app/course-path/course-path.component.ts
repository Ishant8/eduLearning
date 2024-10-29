import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../courses/course.service';
import { AddSection } from '../add-course/add-course.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-path',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-path.component.html',
  styleUrl: './course-path.component.css'
})
export class CoursePathComponent implements OnInit {
  
  courseService = inject(CourseService);
  courseSections = signal<AddSection[]>([]);
  courseName:string='';
  completedSectionsIds = signal<number[]>([]);
  isCompleted = (id:number) => computed(()=>this.completedSectionsIds().includes(id));

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    
    this.route.queryParamMap.subscribe(params => {
      this.courseName = params.get('courseName') as string; 
      this.fetchSections();
      this.fetchCompletedSections();
    });
    

  }

  fetchSections(){
    this.courseService.getSections(this.courseName)
    .subscribe({
      next:(resData:AddSection[])=>{
        this.courseSections.set(resData);
        console.log(this.courseSections());
        
      }
    })
  }

  fetchCompletedSections(){
    this.courseService.getAllCompletedSections().subscribe({
      next:(resData:AddSection[])=>{
        for(let completedSection of resData){
          this.completedSectionsIds().push(completedSection.sectionId);
        }
      }
    })
  }

 

}
