import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[testimonial]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
})
export class TestimonialComponent {

}
