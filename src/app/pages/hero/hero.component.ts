import { Component, input } from '@angular/core';
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
      id: '',
      name: ['', Validators.required],
      power: ['', Validators.required],
      isAlive: this.statusFormControl
    })
  }

  save(){
    if(this.heroForm.invalid){
      Object.values(this.heroForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(subControl => {
            subControl.markAsTouched();
          })
        }
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    let hero = new Hero(this.heroForm.value);
    if(hero.id){
      this.herosService.updateHero(hero);
    } else{
      this.herosService.createHero(hero).subscribe(resp => {
        this.heroForm.reset(hero);
      });
    }
  }

  public get NameFormField() : boolean {
    let nameFormControl = this.heroForm.get('name')!;
    return nameFormControl.invalid && nameFormControl.touched
  }

  
  public get PowerformField() : boolean {
    let powerFormControl = this.heroForm.get('power')!;
    return powerFormControl.invalid && powerFormControl.touched;
  }
  
}
