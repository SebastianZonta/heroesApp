import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/hero.model';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heros',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './heros.component.html',
  styleUrl: './heros.component.scss'
})
export class HerosComponent {
  heroesArray: Hero[] = [];
  isLoading: boolean = false;
  constructor(private heroesService: HeroesService){
    this.isLoading = true;
    this.heroesService.getAllHeros().subscribe({
      next: (data) => {
        this.heroesArray = data;
        this.isLoading = false;
      }
    });
  }

  deleteHero(hero: Hero, index: number){
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to delete the hero <br>${hero.name}</br>?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.deleteHero(Number(hero.id)).subscribe({
          next: (data) => {
            this.heroesArray.splice(index, 1);
          },
          error: (error) => {
            Swal.fire({
              title: `An error ocurred: ${error.error.title}`,
              text: `The application couldn\'t handle your request. Please contact an administrator: ${error.error.detail}`,
              icon: 'error'
            });
          },
          complete: () => Swal.fire("The hero was successfully deleted!", "", "success")
        });
      } else if (result.isDenied) {
        Swal.fire("The hero won\' be deleted", "", "info");
      }
    });
  }
}
