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
            .then((data: any) => data.map(el => new NatureMision(el.id,el.libelle,this.translatebooltoyes(el.facturee),this.translatebooltoyes(el.versementPrime),el.tjm,el.pourcentage)));
  } 

  NatureMissionListebyid(id:number):Promise<NatureMision>
  {
   return this._http.get(`${URL_BACKEND}api/natureMission`)
            .toPromise()
            .then((data: any) => data.filter(el => el.id == id).map(el => new NatureMision(el.id,el.libelle,this.translatebooltoyes(el.facturee),this.translatebooltoyes(el.versementPrime),el.tjm,el.pourcentage)));
  } 

  translatebooltoyes(bool:boolean):string{
    if(bool){
      return "OUI"
    }else{
      return "NON"
    }
  }

}
