
/**
 * Creation de l'objet Nature de Mission
 */
export class NatureMission
{
    constructor(public id:number,public libelle:string,public facturee:boolean,public versementPrime:boolean,public tjm:number,public pourcentage:number,dateDebutValidite:Date,dateFinValidite:Date)
    {
   
    }
}

/**
 * Constructeur de la classe Mission
 */
export class Mission{
    constructor( public id:number, public dateDebut:Date, public dateFin:Date, public natureMission:NatureMission, public villeDepart:string, public villeArrivee:string, public transport:string, public statut:string, public montantPrime:number ){}

}