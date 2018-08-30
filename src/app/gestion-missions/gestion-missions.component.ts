import { Component, OnInit } from '@angular/core';
import { Mission } from '../domains';
import { MissionService } from '../mission-service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-gestion-missions',
  templateUrl: './gestion-missions.component.html',
  styleUrls: ['./gestion-missions.component.scss']
})
export class GestionMissionsComponent implements OnInit {

  missions:Mission[] = []

  constructor(private service:MissionService, private router:Router) { 
    this.mettreAJourDonnee()
  }

  ajouter(){
    this.router.navigateByUrl('gestion-missions/creation')
  }

  supprimer(id:number){
    if(confirm("Êtes-vous sûr de vouloir supprimer cette mission ?")){
      this.service.supprimerMission(id)
        .subscribe(
          ()=>{
            this.router.navigateByUrl('gestion-missions');
            this.mettreAJourDonnee()
          });
    }
  }

  ngOnInit() {
  }

  mettreAJourDonnee(){
    this.service.listerMission().subscribe(
      value => this.missions = value,
      error => console.log("Error : "+error),
      () => console.log("La récupération des données s'est bien passé")      
    )
  }

}
