import { AfterViewInit, Component, inject, Input, OnInit, output, signal } from '@angular/core';
import { CourseService } from '../courses/course.service';

@Component({
  selector: 'app-page-nav',
  standalone: true,
  imports: [],
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.css'
})
export class PageNavComponent implements OnInit {
  courseService = inject(CourseService);
  pages = signal<number[]>([]);
  @Input() currentPage =1 ;
  currentPageEvent=output<number>();



  ngOnInit(){
    this.courseService.pages$.subscribe(value=>{
      this.pages.set(Array(value).fill(0).map((x,i)=>i+1));
    })
  }

  eventEmit(page:number){
    this.currentPageEvent.emit(page);
    this.currentPage=page;
  }

  nextPage(){
    
    this.currentPage++;
    this.eventEmit(this.currentPage);
  }

  prevPage(){

    this.currentPage--;
    this.eventEmit(this.currentPage);
  }
}
