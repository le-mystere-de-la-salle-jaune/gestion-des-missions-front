import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from '../../../node_modules/rxjs';
import { Collaborateur } from '../auth/auth.domains';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  collab:Collaborateur
  testAdmin:boolean
  testManager:boolean
  testEmploye:boolean

  constructor(private _authSrv:AuthService) { }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {
    
    this._authSrv.collaborateurConnecteObs.subscribe(
      value => this.collab = value
    )
    let i:number
    for( i = 0 ; i < this.collab.roles.length ; i++ ){
      let role:string = this.collab.roles[i]
      if(role == "ROLE_ADMINISTRATEUR"){
        this.testAdmin = true
      }
      else if(role == "ROLE_MANAGER"){
        this.testManager = true
      }
      else if(role == "ROLE_UTILISATEUR"){
        this.testEmploye = true
      }
    }
  }

}

