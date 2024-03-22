import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {
   }

  createHero(hero: Hero) : Observable<Hero>{
    return this.http.post<number>(`${environment.baseUrl}/hero`, hero)
      .pipe(map( (data: number) => {
        hero.id = String(data);
        return hero;
      }));
  }

  updateHero(hero: Hero) : Observable<Hero>{
    return this.http.put(`${environment.baseUrl}/hero/${hero.id}`, hero)
      .pipe(map((response: any) =>{
        return hero;
      }));
  }

  getAllHeros() : Observable<Hero[]>{
    return this.http.get<Hero[]>(`${environment.baseUrl}/hero`);
  }

  getHeroById(heroId: number): Observable<Hero>{
    return this.http.get<Hero>(`${environment.baseUrl}/hero/${heroId}`);
  }
}
