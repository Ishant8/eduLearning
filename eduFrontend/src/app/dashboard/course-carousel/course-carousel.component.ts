import { Component, ViewChild, ElementRef, Renderer2, HostListener, AfterViewInit, ViewEncapsulation, inject, signal, OnInit, ChangeDetectorRef, computed, input } from '@angular/core';
import { first } from 'rxjs';
import { CourseItemComponent } from './course-item/course-item.component';
import { Course } from '../../courses/course.model';
import { CourseService } from '../../courses/course.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-carousel',
  standalone: true,
  imports: [CourseItemComponent,RouterLink],
  templateUrl: './course-carousel.component.html',
  styleUrl: './course-carousel.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CourseCarouselComponent implements AfterViewInit {


  @ViewChild('carouselInner') carouselInner!: ElementRef;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselControl') carouselControl!: ElementRef;

  // url = input.required<string>();

  courses = input.required<Course[] | undefined>()
  sectionTitle = input<string>();
  carouselId = input.required<string>();

  scrollPosition = 0;
  cardWidth = computed(()=>{
    const firstCard = this.carouselInner.nativeElement.querySelector('.carousel-item');
    return firstCard.offsetWidth
  });
  carouselWidth = computed(()=> this.carouselInner.nativeElement.scrollWidth);
  visibleCards = 2; // cards being displayed, affects scroll


  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Add slide class if window width is below 768px
    if (window.matchMedia('(max-width: 550px)').matches) {
      this.visibleCards=1.3;
      this.renderer.addClass(this.carouselContainer.nativeElement, 'slide');
    }else if (window.matchMedia('(max-width: 992px)').matches){
      this.visibleCards=1.8;
      // this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn');
    }else{
      this.visibleCards=2.6;
      // this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn');
    }
  }

  scrollNext() {
    if (this.scrollPosition < this.carouselWidth() - this.cardWidth() * this.visibleCards) {
      this.scrollPosition += this.cardWidth();
      this.scrollCarousel();
    }
  }

  scrollPrev() {
    if (this.scrollPosition > 0) {
      this.scrollPosition -= this.cardWidth();
      this.scrollCarousel();
    }
  }

  scrollCarousel() {
    this.renderer.setStyle(
      this.carouselInner.nativeElement,
      'scroll-behavior',
      'smooth'
    );
    this.carouselInner.nativeElement.scrollLeft = this.scrollPosition;
  }

  // Listen to window resize event and reinitialize carousel on window size change
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // this.setupCarousel();
    // Reapply the 'slide' class on small screen sizes
    if (window.matchMedia('(max-width: 550px)').matches) {
      this.renderer.addClass(this.carouselContainer.nativeElement, 'slide');
      this.renderer.removeClass(this.carouselControl.nativeElement, 'carouselbtn')
      this.visibleCards=1.3;

    } else if (window.matchMedia('(max-width: 992px)').matches) {
      this.renderer.removeClass(this.carouselContainer.nativeElement, 'slide');
      // this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn')
      this.visibleCards=1.7;
    }else{
      // this.renderer.removeClass(this.carouselContainer.nativeElement, 'slide');
      // this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn')
      this.renderer.removeClass(this.carouselContainer.nativeElement, 'slide');
      this.visibleCards=2.5;
    }
  }
}
