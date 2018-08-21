import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { NatureMision } from '../domains';
import {environment} from '../environments/environment';

const URL_BACKEND = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class NatureMissionService {

  constructor(private _http:HttpClient) { 
  }

  NatureMissionListe():Promise<NatureMision[]>
  {
   return this._http.get(`${URL_BACKEND}api/natureMission`)
            .toPromise()
            .then((data: any) => data.map(el => new NatureMision(el.id,el.libelle,el.facturee,el.versementPrime,el.tjm,el.pourcentage)));
  } 

}
