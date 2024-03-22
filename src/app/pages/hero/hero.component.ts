import { Component, input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../services/heroes.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
  constructor(private formBuilder: FormBuilder,
     private heroesService: HeroesService,
     private toastr: ToastrService,
     private route: ActivatedRoute,
     private router: Router){
    this.heroForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      power: ['', Validators.required],
      isAlive: this.statusFormControl
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id !== "new"){
      console.log(id);
      this.heroesService.getHeroById(Number(id)).subscribe({
        error: error => {
          Swal.fire({
            title: `An error ocurred: ${error.error.title}`,
            text: `The application couldn\'t handle your request. Please contact an administrator: ${error.error.detail}`,
            icon: 'error'
          }).then(result => this.router.navigateByUrl('heros'));
          console.log(error);
        },
        next: (data) => this.heroForm.reset(data)
      })
    }
  }

  save(){
    if(!this.validateForm())
    {
      this.toastr.info('Please complete all the required fields');
      return;
    }

    Swal.fire({
      title: 'Wait a second',
      text: 'Saving your data',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();
    let hero = new Hero(this.heroForm.value);
    if(hero.id){
      this.sendRequestUpdateHero(hero);
    } else{
      this.sendRequestCreateHero(hero);
    }
  }

  private sendRequestCreateHero(hero: Hero) {
    this.heroesService.createHero(hero).subscribe({
      next: (heroResult) => this.heroForm.reset(heroResult),
      error: (error) => {
        Swal.fire({
          title: `An error ocurred: ${error.error.title}`,
          text: `The application couldn\'t handle your request. Please contact an administrator: ${error.error.detail}`,
          icon: 'error'
        });
        console.log(error);
      },
      complete: () => {
        Swal.fire({
          title: hero.name,
          text: 'Your data was created sucessfully',
          icon: 'success'
        });
      }
    });
  }

  private sendRequestUpdateHero(hero: Hero) {
    this.heroesService.updateHero(hero).subscribe({
      error: (error) => {
        Swal.fire({
          title: `An error ocurred: ${error.error.title}`,
          text: `The application couldn\'t handle your request. Please contact an administrator: ${error.error.detail}`,
          icon: 'error'
        });
        console.log(error);
      },
      complete: () => {
        Swal.fire({
          title: hero.name,
          text: 'Your data was updated sucessfully',
          icon: 'success'
        });
      }
    });
  }

  validateForm(){
    let isFormValid = true;
    if(this.heroForm.invalid){
      isFormValid = false;
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
    }

    return isFormValid;
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
