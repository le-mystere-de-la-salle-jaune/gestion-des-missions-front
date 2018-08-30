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

  listeNatureMissions:NatureMission[]=[];
  Hello="Helllo"
  // Récupere le modal crée dans le component enfant  
  @ViewChild('editModal') editModal : EditNatureMissionsComponent;

  constructor(private service:NatureMissionService,private router: Router) { 
    
      /**
     * Ici, est appelé le service permettant d'afficher les multiple nature de mission
     */
    this.service.NatureMissionListe().then((NatureMissions:any) => {
      NatureMissions.forEach(NatureMission => {
        this.listeNatureMissions.push(NatureMission);
      });
    });

    console.log(this.listeNatureMissions);

  }

  /**
   Validite(Date):string
   * @param d 
   * Cette fonction permet d'envoyer une chaine de caractere
   * si la nature de données a expiré ou non
   */
  Validite(d:Date):string
  {
    console.log(d)
    if((d.valueOf()<=Date.now())&&(d.valueOf()!=0)){
      return "Expiré"
    }else{
      return "-"
    }
  }

  /**
   tostringnumber(number):string
   * @param n
   * Cette fonction permet de changer les zeros en "-" 
   */
  tostringnumber(n:number):string{
    if(n==0){
      return "-"
    }
    return n+""
  }

  /**
   natureSuppression(number) 
   * @param id 
   * Cette fonction permet la suppression d'une nature de mission
   */
  natureSuppression(id:number){
    this.service.suppressionNaturemission(id);
    window.location.reload();
  }

  ngOnInit() {

  }

}
