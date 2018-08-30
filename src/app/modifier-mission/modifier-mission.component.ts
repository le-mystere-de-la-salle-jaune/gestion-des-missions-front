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
  mission:Mission= new Mission(null,new Date(),new Date(),new NatureMission(0,"",false,false,0,0,new Date(),new Date()),"","","","",0)

  constructor(private route: ActivatedRoute,private service:MissionService, private router:Router) {
    this.id = this.route.snapshot.paramMap.get("id")
    service.avoirMissionParId(this.id).subscribe(
      value => this.mission = value,
      error => console.log("Error : ",error),
      () => console.log("La récupération des données s'est bien passé")
    )
    
    
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
