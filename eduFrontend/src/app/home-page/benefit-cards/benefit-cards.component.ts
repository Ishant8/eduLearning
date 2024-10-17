import { Component } from '@angular/core';
import { BenefitCardComponent } from "./benefit-card/benefit-card.component";

@Component({
  selector: 'app-benefit-cards',
  standalone: true,
  imports: [BenefitCardComponent],
  templateUrl: './benefit-cards.component.html',
  styleUrl: './benefit-cards.component.css'
})
export class BenefitCardsComponent {

}
