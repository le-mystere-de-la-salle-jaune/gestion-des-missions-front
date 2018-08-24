export class NatureMision
{
    constructor(public id:number,public libelle:string,public facture:string,public versementPrime:string,public tjm:number,public pourcentage:number)
    {
   
    }

}

/**
 * Constructeur de la classe Mission
 */
export class Mission{
    constructor( public id:number, public dateDebut:string, public dateFin:string, public nature:NatureMision, public villeDepart:string, public villeArrivee:string, public transport:string, public statut:string, public montantPrime:number ){}
}