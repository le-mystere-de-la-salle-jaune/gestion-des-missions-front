import { Component, OnInit, ViewChild } from '@angular/core';
import { NatureMissionService } from '../nature-mission.service';
import { NatureMission } from '../domains';
import { Router } from '@angular/router';
import { EditNatureMissionsComponent } from '../edit-nature-missions/edit-nature-missions.component';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-nature-missions',
  templateUrl: './nature-missions.component.html',
  styleUrls: ['./nature-missions.component.scss']
})


export class NatureMissionsComponent implements OnInit {

  listeNatureMisions:NatureMission[]=[];
  // Récupere le modal crée dans le component enfant  
  @ViewChild('editModal') editModal : EditNatureMissionsComponent;

  constructor(private service:NatureMissionService,private router: Router) { 
    /**
     * Ici, est appelé le service permettant d'afficher les multiple nature de mission
     */
    service.NatureMissionListe().then((NatureMisions:any) => {
      NatureMisions.forEach(NatureMision => {
        this.listeNatureMisions.push(NatureMision);
      });
    });

  }

  ngOnInit() {
  }

}
