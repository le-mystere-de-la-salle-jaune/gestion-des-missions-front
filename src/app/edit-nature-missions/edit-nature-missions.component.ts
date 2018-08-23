import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NatureMissionService } from '../nature-mission.service';
import { NatureMission } from '../domains';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-edit-nature-missions',
  templateUrl: './edit-nature-missions.component.html',
  styleUrls: ['./edit-nature-missions.component.scss']
})



 export class EditNatureMissionsComponent implements OnInit {

  @ViewChild('editModal') public editModal : ModalDirective; // Pop-up #editNatureMission="ngForm"
  natureaModifier= new NatureMission(undefined,undefined,"Non","Non",0,0); // Nature de mission de base avec contrôle minimal   
  natureMissionaSauvergarde:NatureMission=null;  // Nature de mission de modification logique
  Titre:string; // Titre du pop-up
  id:number; // ID de la nature de mission.
  constructor(private service:NatureMissionService) {
       
  }

  /**
   show(number)
   * @param idn 
   * Cette fonction permet l'affichage du popup(modal) de creation ou de modification
   * en fonction du parametre.
   * Si le parametre contient un ID, alors il s'agit de la modification d'une nature de mission
   * sinon il s'agit tout simplement de la creation d'une nouvelle nature de mission.
   */
  show(idn:number){
    this.id=idn
    if(idn!=(null||undefined)){
      // Dans le cas, Où il n'y aurait pas de nature de mission à modifier 
      this.Titre="Modification de la nature de mission" 
      this.service.NatureMissionListebyid(this.id).subscribe(value=>this.natureaModifier=value[0])
      this.natureMissionaSauvergarde=this.natureaModifier
    }else{
      // Dans le cas, Où il y aurait une nature de mission à modifier 
      this.Titre="Creation d'une nature de mission";
      this.natureaModifier = new NatureMission(undefined,undefined,"Non","Non",0,0);
    }
    this.editModal.show();
  }

  /**
   hide() 
   * Cette fonction permet la fermeture du popup(modal) de creation ou de modification.
   */
  hide(){
    this.editModal.hide();
  }

  ngOnInit() {

  }

  submit()
  {
    console.log(this.natureaModifier)
    this.service.creationNaturemission(this.natureaModifier)
    this.editModal.hide()
  }

}