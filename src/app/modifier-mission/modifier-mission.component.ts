import { Component, OnInit } from '@angular/core';
import { Mission, NatureMission } from '../domains';
import { MissionService } from '../mission-service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-modifier-mission',
  templateUrl: './modifier-mission.component.html',
  styleUrls: ['./modifier-mission.component.scss']
})
export class ModifierMissionComponent implements OnInit {

  id:string
  dateDebutHtml:string = ""
  dateFinHtml:string = ""
  mission:Mission= new Mission(null,new Date(),new Date(),new NatureMission(0,"",false,false,0,0,new Date(),new Date()),"","","","",0)

  constructor(private route: ActivatedRoute,private service:MissionService, private router:Router) {
    this.id = this.route.snapshot.paramMap.get("id")
    service.avoirMissionParId(this.id).subscribe(
      value => this.mission = value,
      error => console.log("Error : ",error),
      () => console.log("La récupération des données s'est bien passé")
    )
    this.dateDebutHtml = this.convertirDateToStringHtml(this.mission.dateDebut)
    this.dateFinHtml = this.convertirDateToStringHtml(this.mission.dateFin)
    
    console.log("dateDebutHtml : "+this.dateDebutHtml)
    console.log("dateFinHtml : "+this.dateFinHtml)
    
   }

  majMontantPrime(montant:number):number{
    let res:number = 0
    return res
  }

  submit(monForm:any){
    
    if(monForm.valid){
      console.log(this.mission)
      this.service.modifierMission(this.id,this.mission)
      .subscribe(()=>this.router.navigateByUrl('gestion-missions'));
    }
  }

  annuler(){
    this.router.navigateByUrl('gestion-missions')
  }

  convertirDateToStringHtml(dateBdd:Date){
    console.log(dateBdd)
    let date:Date = new Date(dateBdd)
    let res:string = ""
    res+=date.getFullYear()+'-'
    console.log(date.getMonth().toString)
    if(date.getMonth().toString.length == 1){
      res+="0"+date.getMonth()+'-'
    }
    else{
      res+=date.getMonth()
    }
    console.log("Taille de date.getDate : "+date.getDate().toString.length)
    if(date.getDate().toString.length == 0){
      res+="0"+date.getDate()
    }
    else{
      res+=date.getDate()
    }
    return res
  }

  ngOnInit() {
  }

}
