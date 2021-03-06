import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable , Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Mission} from './domains';
import { environment } from '../environments/environment';
import { ValueTransformer } from '../../node_modules/@angular/compiler/src/util';

const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

@Injectable({
    providedIn: 'root'
  })
  export class MissionService {

    constructor(private _http:HttpClient){}

    listerMission():Observable<Mission[]> {
        const missions$ = this._http.get(environment.missionApiUrl)
            .pipe(
                map((postsExterne: any[]) =>  postsExterne.map(pE => new Mission( pE.id, pE.dateDebut, pE.dateFin, pE.nature, pE.villeDepart, pE.villeArrivee, pE.transport, pE.statut, pE.montantPrime )))
            )
            return missions$
    }

    avoirMissionParId(id:string):Observable<Mission>{
        const mission$ = this._http.get(environment.missionApiUrl+'/'+id)
        .pipe(
            map((pE: any) =>  new Mission( pE.id, pE.dateDebut, pE.dateFin, pE.nature, pE.villeDepart, pE.villeArrivee, pE.transport, pE.statut, pE.montantPrime ))
        )
        return mission$
    }

    modifierMission(id,ngForm):Observable<any>{
        return this._http.post(environment.missionApiUrl+'/'+id,ngForm,{responseType:'text'}).pipe()
    }

    creerMission(ngForm):Observable<any>{
        return this._http.post(environment.missionApiUrl,ngForm,{responseType:'text'}).pipe()
    }

    supprimerMission(id):Observable<any>{
        return this._http.delete(environment.missionApiUrl+'/'+id,{responseType:'text'}).pipe()
    }

  }