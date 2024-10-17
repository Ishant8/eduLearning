import { Component, ViewEncapsulation } from '@angular/core';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HeaderComponent } from '../header/header.component';
import { BenefitCardsComponent } from "./benefit-cards/benefit-cards.component";
import { ExploreComponent } from "./explore/explore.component";
import { TestomonialsComponent } from "./testomonials/testomonials.component";
import { AchievementsComponent } from "./achievements/achievements.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [JumbotronComponent, HeaderComponent, BenefitCardsComponent, ExploreComponent, TestomonialsComponent, AchievementsComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

}
