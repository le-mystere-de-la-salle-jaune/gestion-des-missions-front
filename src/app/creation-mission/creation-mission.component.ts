import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission-service';
import { Mission, NatureMision } from '../domains';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-creation-mission',
  templateUrl: './creation-mission.component.html',
  styleUrls: ['./creation-mission.component.scss']
})
export class CreationMissionComponent implements OnInit {
  mission:Mission= new Mission(null,"","",new NatureMision(0,"","","",0,0),"","","","",0)
  constructor(private service:MissionService, private router:Router) {
    
  }

  majMontantPrime(montant:number):number{
    let res:number = 0
    return res
  }

  submit(monForm:any){
    
    if(monForm.valid){
      this.mission.statut = "INITIALE"
      console.log(this.mission)
      this.service.creerMission(this.mission)
      .subscribe(
        ()=>this.router.navigateByUrl('gestion-missions')
      );
    }
  }

  annuler(){
    this.router.navigateByUrl('gestion-missions')
  }

  ngOnInit() {
  }

}
