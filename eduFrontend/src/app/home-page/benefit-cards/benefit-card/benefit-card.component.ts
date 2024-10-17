import { Component, input } from '@angular/core';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  imports: [],
  templateUrl: './benefit-card.component.html',
  styleUrl: './benefit-card.component.css'
})
export class BenefitCardComponent {

  title = input.required<string>();
  icon = input.required<string>();
}
