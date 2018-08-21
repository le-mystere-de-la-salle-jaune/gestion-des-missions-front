/**
 * Collègue utilisateur de l'application.
 */
export class Collaborateur {
  nom:string;
  prenom:string;
  email:string;
  motDePasse:string;
  roles:string[];

  constructor(params:any) {
    Object.assign(this, params);
  }

  estAnonyme():boolean {
    return this.email == undefined;
  }

}

/**
 * Nature d'une mission
 */
export class NatureMission{
  constructor( public id:number, public libelle:string, public facturee:boolean, public versementPrime:boolean, public tjm:number, public pourcentage:number ){}

}
