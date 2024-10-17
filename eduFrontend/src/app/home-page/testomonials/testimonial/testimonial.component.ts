import { Component, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Review } from '../testimonial.model';
import { TestimonialService } from '../testimonial.service';

@Component({
  selector: '[testimonial]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
})
export class TestimonialComponent {
  review = input<Review>();

}
