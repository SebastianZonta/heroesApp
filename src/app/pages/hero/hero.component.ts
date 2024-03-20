import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  providers: []
})
export class HeroComponent {

  hero: Hero = new Hero();
  statusFormControl = new FormControl(true, Validators.required);
  heroForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private herosService: HerosService){
    this.heroForm = this.formBuilder.group({
      id: '1',
      name: ['seba', Validators.required],
      power: ['a', Validators.required],
      isAlive: this.statusFormControl
    })
  }

  save(){
    if(this.heroForm.invalid)
      return;

    console.log(this.heroForm.value);
    let hero = new Hero(this.heroForm.value);
    console.log(hero);
  }
}
