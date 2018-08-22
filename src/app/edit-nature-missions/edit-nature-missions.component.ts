import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NatureMissionService } from '../nature-mission.service';
import { NatureMision } from '../../domains';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-edit-nature-missions',
  templateUrl: './edit-nature-missions.component.html',
  styleUrls: ['./edit-nature-missions.component.scss']
})



 export class EditNatureMissionsComponent implements OnInit {

  @ViewChild('editModal') public editModal : ModalDirective;
  natureM = new NatureMision(undefined,undefined,undefined,undefined,undefined,undefined);
  Titre:string;
  id:number;
  constructor(private service:NatureMissionService) {
       
  }

  show(idn:number){
    this.id=idn
    if(idn!=(null||undefined)){
      this.Titre="Modification de la nature de mission" 
      this.service.NatureMissionListebyid(this.id).then((data:NatureMision)=>this.natureM=new NatureMision(data.id,data.libelle,data.facture,undefined,undefined,undefined));
    }else{
      this.Titre="Creation d'une nature de mission";
    }
    this.editModal.show();
  }
  hide(){
    this.editModal.hide();
  }

  ngOnInit() {
    
  }

}
