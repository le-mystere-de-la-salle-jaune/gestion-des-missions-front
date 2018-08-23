import { Component, OnInit } from '@angular/core';
import { Mission } from '../domains';
import { MissionService } from '../mission-service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-gestion-missions',
  templateUrl: './gestion-missions.component.html',
  styleUrls: ['./gestion-missions.component.scss']
})
export class GestionMissionsComponent implements OnInit {

  missions:Mission[] = []

  constructor(private route: ActivatedRoute, private service:MissionService) { 
    service.listerMission().subscribe(
      value => this.missions = value,
      error => console.log("Error : "+error),
      () => console.log("La récupération des données s'est bien passé")      
    )
  }

  ngOnInit() {
  }

}
