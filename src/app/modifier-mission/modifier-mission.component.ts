import { Component, OnInit } from '@angular/core';
import { Mission, NatureMision } from '../domains';
import { MissionService } from '../mission-service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-modifier-mission',
  templateUrl: './modifier-mission.component.html',
  styleUrls: ['./modifier-mission.component.scss']
})
export class ModifierMissionComponent implements OnInit {

  id:string
  mission:Mission = new Mission(0,"","",new NatureMision(0,"","","",0,0),"","","","",0)

  constructor(private route: ActivatedRoute,private service:MissionService, private router:Router) {
    this.id = this.route.snapshot.paramMap.get("id")
    service.avoirMissionParId(this.id).subscribe(
      value => {this.mission = value;
                this.mission.dateDebut = this.convertirDateBddAHtml(this.mission.dateDebut);
                this.mission.dateFin = this.convertirDateBddAHtml(this.mission.dateFin);
              },
      error => console.log("Error : ",error),
      () => console.log("La récupération des données s'est bien passé")
    )
    
    
   }

   convertirDateBddAHtml(date:string):string{
     let aux:string
     aux = date[6]+date[7]+date[8]+date[9]+'-'+date[3]+date[4]+'-'+date[0]+date[1]
     return aux
   }

   convertirDateHtmlABdd(date:string):string{
    let aux:string
    aux = date[8]+date[9]+'/'+date[5]+date[6]+'/'+date[0]+date[1]+date[2]+date[3]
    return aux
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

  ngOnInit() {
  }

}
