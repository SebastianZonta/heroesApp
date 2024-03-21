import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(private http: HttpClient) {
   }

  createHero(hero: Hero){
    return this.http.post(`${environment.baseUrl}/hero`, hero)
      .pipe(map( (data: any) => {
        hero.id = data;
        return hero;
      }))
  }

  updateHero(hero: Hero){
    return this.http.put(`${environment.baseUrl}/hero/${hero.id}`, hero);
  }
}
