import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.css'
})
export class JumbotronComponent {

}
