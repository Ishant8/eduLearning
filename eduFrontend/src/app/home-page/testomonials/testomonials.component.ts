import { Component, ViewChild, ElementRef, Renderer2, HostListener, AfterViewInit, ViewEncapsulation, inject, signal, OnInit, ChangeDetectorRef, computed, input } from '@angular/core';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { Review } from './testimonial.model';
import { TestimonialService } from './testimonial.service';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { ProfileService } from '../../profile-page/profile.service';

@Component({
  selector: 'app-testomonials',
  standalone: true,
  imports: [TestimonialComponent],
  templateUrl: './testomonials.component.html',
  styleUrl: './testomonials.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TestomonialsComponent implements AfterViewInit, OnInit {


  @ViewChild('carouselInner') carouselInner!: ElementRef;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselControl') carouselControl!: ElementRef;

  url = input.required<string>();

  testimonialService = inject(TestimonialService)
  profileService = inject(ProfileService);
  reviews = signal<Review[] | undefined>(undefined)

  private reviewsSubject = new BehaviorSubject<Review[] | string>(' default string');
  public reviews$: Observable<Review[] | string>;

  scrollPosition = 0;
  cardWidth = computed(()=>{
    const firstCard = this.carouselInner.nativeElement.querySelector('.carousel-item');
    return firstCard.offsetWidth
  });
  carouselWidth = computed(()=> this.carouselInner.nativeElement.scrollWidth);
  visibleCards = 2.5; // cards being displayed, affects scroll


  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.reviews$ = this.reviewsSubject.asObservable();
  }
  ngOnInit(): void {
    console.log("In testimonial onInit");
    
    this.testimonialService.getReview(this.url()).subscribe({
      next:(resData)=>{
        this.reviews.set(resData);
        this.testimonialService.reviews.set(resData);
        this.reviewsSubject.next(resData);
        console.log(this.testimonialService.reviews());
        
      },
      error: (error) => console.error('Error fetching reviews:', error)
    })
  }

  ngAfterViewInit(): void {

    


    // Add slide class if window width is below 768px
    if (window.matchMedia('(max-width: 768px)').matches) {
      this.visibleCards=1.3;
      this.renderer.addClass(this.carouselContainer.nativeElement, 'slide');
    }else if (window.matchMedia('(max-width: 992px)').matches){
      this.visibleCards=1.8;
      this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn');
    }else{
      this.visibleCards=2.6;
      this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn');
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
    if (window.matchMedia('(max-width: 768px)').matches) {
      this.renderer.addClass(this.carouselContainer.nativeElement, 'slide');
      this.renderer.removeClass(this.carouselControl.nativeElement, 'carouselbtn')
      this.visibleCards=1.3;

    } else if (window.matchMedia('(max-width: 992)').matches) {
      this.renderer.removeClass(this.carouselContainer.nativeElement, 'slide');
      this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn')
      this.visibleCards=1.7;
    }else{
      // this.renderer.removeClass(this.carouselContainer.nativeElement, 'slide');
      this.renderer.addClass(this.carouselControl.nativeElement, 'carouselbtn')
      this.renderer.removeClass(this.carouselContainer.nativeElement, 'slide');
      this.visibleCards=2.5;
    }
  }
}
