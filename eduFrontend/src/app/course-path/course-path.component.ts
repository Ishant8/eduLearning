import { AfterViewChecked, Component, computed, ElementRef, inject, OnInit, Renderer2, signal, viewChild } from '@angular/core';
import { CourseService } from '../courses/course.service';
import { AddSection } from '../add-course/add-course.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-course-path',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-path.component.html',
  styleUrl: './course-path.component.css'
})
export class CoursePathComponent implements OnInit {
  
  courseService = inject(CourseService);
  profileService = inject(ProfileService)
  courseSections = signal<AddSection[]>([]);
  isHovered = signal<Boolean>(false);
  courseName:string='';
  completedSectionsIds = signal<number[]>([]);
  isCompleted = (id:number) => computed(()=>this.completedSectionsIds().includes(id));
  progress = signal<number>(0);
  confettiDisplay = false;
  

  constructor(private route: ActivatedRoute, private renderer:Renderer2) {}

  hoverTimeout: any;

  onMouseOver() {
    this.hoverTimeout = setTimeout(() => {
      this.isHovered.set(true);
    }, 100); // Adjust delay as needed (100ms here)
  }

  onMouseLeave() {
    clearTimeout(this.hoverTimeout);
    this.isHovered.set(false);
  }
  
  ngOnInit() {
    
    this.route.queryParamMap.subscribe(params => {
      this.courseName = params.get('courseName') as string; 
      this.fetchSections();
      
    });

    
    

  }

  fetchSections(){
    this.courseService.getSections(this.courseName)
    .subscribe({
      next:(resData:AddSection[])=>{
        for(let section of resData){
          if(section.courseName === this.courseName){
            this.courseSections().push(section);
          }
        }
        console.log("line 58",this.courseSections());
        
      },
      complete:()=>{
        this.fetchCompletedSections();
      }
    })
  }

  fetchCompletedSections(){
    this.courseService.getAllCompletedSections().subscribe({
      next:(resData:AddSection[])=>{
        for(let completedSection of resData){
          if(completedSection.courseName === this.courseName){
            this.completedSectionsIds().push(completedSection.sectionId);
          }
        }
      },
      complete:()=>{
        const progress = (this.completedSectionsIds().length / this.courseSections().length)*100;
        // console.log("line 72",this.completedSectionsIds.length);
        
        if(progress===100 ){
          if(!this.courseService.oneTimeFlag.includes(this.courseName)){
            this.confettiDisplay = true;
            setTimeout(()=>{
              this.confettiDisplay = false;
              this.courseService.oneTimeFlag.push(this.courseName);
            },4000);
          }
          
        }

        this.css3RadialProgressBar(parseFloat(progress.toFixed(1)));
      }
    })
  }

  css3RadialProgressBar(xvaluenow:number) {
    /* Vars */
    // var xvaluenow = Math.floor((Math.random() * 100) + 0); //Generates a random number (0-100) only for demonstration
    //var xvaluenow = 0; //Insert here a specific number (0-100) and remove the comment this var, and the above code
    var rotatenum = 'rotate(' + xvaluenow * 1.8 + 'deg)';
    // var progress = document.getElementById('progress');
    var progress_circle = document.getElementById('progress-circle');
    let progress_style = document.getElementById('progress-style') as HTMLStyleElement;

    // console.log(this.progressStyle());
    // console.log(progress);
    
    
    /* Fix: Cover gap with shadow */
    if (xvaluenow == 0) {
      var shadowfix = "0";
    }
    else {
      var shadowfix = "1px";
    }
    
    /* Inserting values */
    // progress!.innerHTML = xvaluenow + '%';
    this.progress.set(xvaluenow);
    progress_circle!.setAttribute("aria-valuenow", ""+xvaluenow);  
  //   progress_style!.innerHTML = " \
  // .p-h:before, .p-f, .p-f:before{ \
  // -moz-transform: " + rotatenum + "; \
  // -webkit-transform: " + rotatenum + "; \
  // -o-transform: " + rotatenum + "; \
  // -ms-transform: " + rotatenum + "; \
  // transform: " + rotatenum + "; \
  // -webkit-box-shadow: 0 0 0 " + shadowfix + " #828282; \
  //   box-shadow: 0 0 0 " + shadowfix + " #828282;}\
  // \ ";


  const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(`
      .p-h:before, .p-f, .p-f:before{ 
        -moz-transform: ${rotatenum}; 
        -webkit-transform: ${rotatenum};
        -o-transform: ${rotatenum};
        -ms-transform: ${rotatenum};
        transform: ${rotatenum};
        -webkit-box-shadow: 0 0 0 ${shadowfix} #828282;
        box-shadow: 0 0 0 ${shadowfix} #828282;
      }
    `));
    this.renderer.appendChild(document.head, styleElement);
  // console.log(this.progressStyle());

  }
  
  // document.body.onload = function() {};
 

}
