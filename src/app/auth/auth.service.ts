import { Injectable } from '@angular/core';
import {Collaborateur} from "./auth.domains";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/internal/Observable";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Subject, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

/**
 * Collègue anonyme.
 *
 * @type {Collaborateur}
 */
const COLLABORATEUR_ANONYME = new Collaborateur({});

/**
 * Service de gestion de l'authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Flux du collègue connecté. Les abonnés sont notifiés dès qu'une connexion ou une déconnexion a lieu.
   *
   * A l'initialisation, le collègue connecté vaut 'undefined'.
   *
   * @type {BehaviorSubject<any>}
   */
  private collaborateurConnecteSub:BehaviorSubject<Collaborateur> = new BehaviorSubject(COLLABORATEUR_ANONYME);

  constructor(private _http:HttpClient) {
  }

  /**
   * Interface Observable du collègue connecté.
   *
   * @returns {Observable<Collaborateur>}
   */
  get collaborateurConnecteObs():Observable<Collaborateur> {
    return this.collaborateurConnecteSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un collegue est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collègue connecté s'il n'est pas en cache.
   *
   * @returns {Observable<Collaborateur>}
   */
  verifierAuthentification(): Observable<Collaborateur> {
    return this.collaborateurConnecteSub.getValue().estAnonyme() ?
            this._http.get<Collaborateur>(`${environment.baseUrl}${environment.apiAuthMe}`, {withCredentials: true})
                  .pipe(
                    map(colServeur => new Collaborateur(colServeur)),
                    tap(col => this.collaborateurConnecteSub.next(col)),
                    catchError(err => of(COLLABORATEUR_ANONYME))
                  ):     of(this.collaborateurConnecteSub.getValue())
              ;
  }

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   * @param {string} email : email de l'utilisateur
   * @param {string} mdp : mot de passe de l'utilisation
   * @returns {Observable<Collaborateur>}
   */
  connecter(email:string, mdp:string):Observable<Collaborateur> {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this._http.post(`${environment.baseUrl}${environment.apiLogin}`, new HttpParams().set('username', email).set('password', mdp), config)
      .pipe(
        map(colServeur => new Collaborateur(colServeur)),
        tap(col => this.collaborateurConnecteSub.next(col) )
      );
  }

  /**
   * Déconnexion de l'utilisateur.
   *
   * Le serveur provoque la suppression du cookie AUTH-TOKEN.
   *
   * @returns {Observable<any>}
   */
  seDeconnecter() {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this._http.post<Collaborateur>(`${environment.baseUrl}${environment.apiLogout}`, null , config)
      .pipe(
        tap(col => this.collaborateurConnecteSub.next(COLLABORATEUR_ANONYME))
      );
  }
}
