import { Component, ViewEncapsulation } from '@angular/core';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HeaderComponent } from '../header/header.component';
import { BenefitCardsComponent } from "./benefit-cards/benefit-cards.component";
import { ExploreComponent } from "./explore/explore.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [JumbotronComponent, HeaderComponent, BenefitCardsComponent, ExploreComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

}
