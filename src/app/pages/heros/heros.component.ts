import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/hero.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-heros',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './heros.component.html',
  styleUrl: './heros.component.scss'
})
export class HerosComponent {
  heroesArray: Hero[] = [];
  constructor(private heroesService: HeroesService){
    this.heroesService.getAllHeros().subscribe({
      next: (data) => this.heroesArray = data
    });
  }
}
