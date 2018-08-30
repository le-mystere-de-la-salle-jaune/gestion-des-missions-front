import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { NatureMission } from './domains';
import {environment} from '../environments/environment';
import { Observable, from } from 'rxjs';

const URL_BACKEND = environment.baseUrl;

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})

export class NatureMissionService {

  

  constructor(private _http:HttpClient) { 
  }

  /**
   NatureMissionListe():Promise<NatureMission[]>
   * Cette Fonction permet le listage des multiple nature
   * de mission presentent dans la base de donnees
   */
  NatureMissionListe():Promise<NatureMission[]>
  {
   return this._http.get(`${URL_BACKEND}api/natureMission`)
            .toPromise()
            .then((data: any) => data.map(el => new NatureMission(el.id,el.libelle,this.translatebooltoyes(el.facturee),this.translatebooltoyes(el.versementPrime),el.tjm,el.pourcentage,new Date(el.expiration))));
  } 

  /**
   NatureMissionListe(number):Promise<NatureMission[]>
   * Cette Fonction permet d'envoyer la nature
   * de mission present dans la base de donnees par son ID
   */
  NatureMissionListebyid(id:number):Observable<NatureMission>
  {

   return from(this._http.get(`${URL_BACKEND}api/natureMission`)
            .toPromise()
            .then((data: any) => data.filter(el => el.id == id).map(el => new NatureMission(el.id,el.libelle,this.translatebooltoyes(el.facturee),this.translatebooltoyes(el.versementPrime),el.tjm,el.pourcentage,new Date(el.expiration)))));
  } 

  /*
  creationNaturemission(NatureMission)
   * Cette Fonction permet la creation d'une nature de mission
   * dans la base de donnees via un API.
   * Cette fonction transmet une nature de mission sans ID et 
   * ne revoir rien.
   */
  creationNaturemission(nMission:NatureMission)
  {
    this._http.post(`${URL_BACKEND}api/natureMission`,{libelle:nMission.libelle,
       facturee:this.translatestringtobool(nMission.facture),
      versementPrime:this.translatestringtobool(nMission.versementPrime),
      tjm:nMission.tjm,
      pourcentage:nMission.pourcentage},httpOptions).toPromise()
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: HttpErrorResponse) => {
        console.log("error", error);
      });
  }

  /*
  suppressionNaturemission(NatureMission)
   * Cette Fonction permet de supprimer d'une nature de mission
   * dans la base de donnees via un API par son ID.
   */
  suppressionNaturemission(id:number)
  {
    this._http.delete(`${URL_BACKEND}api/natureMission/${id}`,httpOptions).toPromise()
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: HttpErrorResponse) => {
        console.log("error", error);
      });
  }

  /*
  translatebooltoyes(boolean):string
  * Cette Fonction permet la conversion de boolean en String
  * afin d'ameliorer l'affichage des information transmis à l'utilisateur
  */
  translatebooltoyes(bool:boolean):string{
    if(bool){
      return "Oui"
    }else{
      return "Non"
    }
  }

  /*
  translatestringtobool(string):boolean{
  * Cette fonction permet la conversion de String en boolean
  * afin de traduire la volonté de utilistateur à la base de donnees 
  * de façon optimiser. 
  */
  translatestringtobool(st:string):boolean{
    if(st=="Oui"){
      return true
    }else{
      return false
    }
  }

}
