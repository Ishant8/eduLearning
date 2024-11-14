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
  totalPages:number=0;
  // prevPage = computed(()=>{
  //   return
  // })
  currentPageEvent=output<number>();



  ngOnInit(){
    this.courseService.pages$.subscribe(value=>{
      this.totalPages=value;
      
      let arr:number[] = []
      arr[0] = this.currentPage -1;
      arr[1] = this.currentPage;
      arr[2] = this.currentPage + 1;
      // this.pages.set(Array(value).fill(0).map((x,i)=>i+1));
      this.pages.set(arr);
    })
  }

  eventEmit(page:number){
    this.currentPageEvent.emit(page);
    this.currentPage=page;
    window.scrollTo(520, 520);
  }

  nextPage(){
    
    this.currentPage++;
    this.eventEmit(this.currentPage);
    window.scrollTo(520, 520);
  }

  prevPage(){

    this.currentPage--;
    this.eventEmit(this.currentPage);
    window.scrollTo(520, 520);
  }
}
