import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(private http: HttpClient) {
   }

  createHero(hero: Hero){
    return this.http.post(`${environment.baseUrl}/hero`, hero);
  }
}
