import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable , Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Mission} from './domains';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class MissionService {

    constructor(private _http:HttpClient){}

    listerMission():Observable<Mission[]> {
        const missions$ = this._http.get(environment.missionApiUrl)
            .pipe(
                map((postsExterne: any[]) =>  postsExterne.map(pE => new Mission( pE.id, pE.dateDebut, pE.dateFin, pE.nature, pE.villeDepart, pE.villeArrivee, pE.transport, pE.statut, pE.prime )))
            )
            return missions$
    }
  }