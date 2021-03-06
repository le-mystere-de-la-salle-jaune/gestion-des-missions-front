import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NatureMissionService } from '../nature-mission.service';
import { NatureMission,NatureMissionVM } from '../domains';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-edit-nature-missions',
  templateUrl: './edit-nature-missions.component.html',
  styleUrls: ['./edit-nature-missions.component.scss']
})



 export class EditNatureMissionsComponent implements OnInit {

  @ViewChild('editModal') public editModal : ModalDirective; // Pop-up #editNatureMission="ngForm"

  natureaModifier= new NatureMissionVM(undefined,undefined,"Non","Non",0,0,new Date,null); // Nature de mission de base avec contrôle minimal   

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
      this.service.NatureMissionListebyid(this.id).subscribe(value=>this.natureaModifier=this.convertview(value[0]))
    }else{
      // Dans le cas, Où il y aurait une nature de mission à modifier 
      this.Titre="Creation d'une nature de mission";
      this.natureaModifier = this.convertview(new NatureMission(undefined,undefined,false,false,0,0,new Date,null));

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

  convertview(element:any):any
  {
    
 console.log(element.constructor.name)
    if(element.constructor.name == ( "NatureMission"|| "NatureMissionVM"))
   {
      if(element.constructor.name == NatureMission){
        return new NatureMissionVM(element.id,element.libelle,this.translatebooltoyes(element.facturee),this.translatebooltoyes(element.versementPrime),element.tjm,element.pourcentage,element.dateDebutValidite,element.dateFinValidite)
      }else{
        return new NatureMission(element.id,element.libelle,this.translatestringtobool(element.facturee),this.translatestringtobool(element.versementPrime),element.tjm,element.pourcentage,element.dateDebutValidite,element.dateFinValidite)
      }
   } 
  }


  /**
   submit() 
   * Cette fonction permet d'affecter le resultal
   * par default en fonction du choix de l'utilistateur
   * avant d'envoyer les informations dans la base de données.
   * #Controle #Bigbrother
   */
  submit()
  {
    if(this.natureaModifier.facturee==("Non"||undefined||null)){
      this.natureaModifier.facturee="Non";
      this.natureaModifier.versementPrime="Non";
      this.natureaModifier.tjm=0;
      this.natureaModifier.pourcentage=0;
      this.service.creationNaturemission(this.convertview(this.natureaModifier))
      this.editModal.hide()
      window.location.reload();
      console.log("cons 1")
      if(this.id!=(null||undefined)){
        this.service.suppressionNaturemission(this.id)
      }
    }else{
      if(this.natureaModifier.versementPrime==("Non"||undefined||null)){
        this.natureaModifier.versementPrime="Non";
        this.natureaModifier.pourcentage=0;
        this.service.creationNaturemission(this.convertview(this.natureaModifier))
        this.editModal.hide()
        window.location.reload();
        console.log("cons 2")
        if(this.id!=(null||undefined)){
          this.service.suppressionNaturemission(this.id)
        }
      }else{
        if(this.natureaModifier.tjm>=0&&(this.natureaModifier.pourcentage>=0&&this.natureaModifier.pourcentage<=10)){
          this.service.creationNaturemission(this.convertview(this.natureaModifier))
          this.editModal.hide()
          window.location.reload();
          console.log("cons 3")
          if(this.id!=(null||undefined)){
            this.service.suppressionNaturemission(this.id)
          }
        }
      }
    }

  }

    /*
  translatestringtobool(string):boolean{
  * Cette fonction permet la conversion de String en boolean
  * afin de traduire la volonté de utilistateur à la base de donnees 
  * de façon optimiser. 
  */
 translatestringtobool(st:string):boolean{
  if(st=="Oui"){
    return true
  }else{
    return false
  }
}

  /*
  translatebooltoyes(boolean):string
  * Cette Fonction permet la conversion de boolean en String
  * afin d'ameliorer l'affichage des information transmis à l'utilisateur
  */
 translatebooltoyes(bool:boolean):string{
  if(bool){
    return "Oui"
  }else{
    return "Non"
  }
}

}
