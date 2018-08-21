import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment'
import {NatureMission} from '../app/auth/auth.domains'

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  constructor(private _http:HttpClient) { }

  listerNatures():Observable<NatureMission[]>{

    const natures$ = this._http.get(environment.natureApiUrl)
    .pipe(
      map((postsExterne: any[]) => postsExterne.map(pE => new NatureMission(pE.id,pE.libelle, pE.facturee, pE.versementPrime, pE.tjm, pE.pourcentage      )))
    )
    return natures$;

  }


}
