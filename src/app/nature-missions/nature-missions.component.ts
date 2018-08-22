import { Component, OnInit } from '@angular/core';
import { NatureMissionService } from '../nature-mission.service';
import { NatureMision } from '../../domains';


@Component({
  selector: 'app-nature-missions',
  templateUrl: './nature-missions.component.html',
  styleUrls: ['./nature-missions.component.scss']
})
export class NatureMissionsComponent implements OnInit {

  listeNatureMisions:NatureMision[]=[];
  NMaModifier:NatureMision=null;

  constructor(private service:NatureMissionService) { 

    service.NatureMissionListe().then((NatureMisions:any) => {
      NatureMisions.forEach(NatureMision => {
        this.listeNatureMisions.push(NatureMision);
      });
    });

  }

  ngOnInit() {
  }

  natureModification( n:number){

  

  }

}
