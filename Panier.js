
export class Panier{
    #produit
    #basket
    /**
     * Represente le panier d'Achat
     * @constructor
     */
    constructor(){     
        this.get();
    }
    #save(){
       localStorage.setItem("basket",JSON.stringify(this.#basket))
    }
    get(){
        this.#basket = JSON.parse(localStorage.getItem("basket"));
        if(this.#basket === null){
            return this.#basket = [];
        }else{
            return this.#basket;
        }
    }
    /**
     * Permet d'ajouter un produit
     * @param {Object} produit 
     */
    add(produit){
        this.#produit = produit;
        const produitExisting = this.#basket.find(prod => prod.id == this.#produit.id)
      
        if(produitExisting != undefined){
            produitExisting.qte++;
            produitExisting.montant = produitExisting.qte * produitExisting.prix;
        }else{
           this.#produit.montant = this.#produit.qte * this.#produit.prix;
           this.#basket.push(this.#produit);
        }  
        this.#save()
        console.log(this.#basket);
    }
    /**
     * Permet de supprimer un produit
     * @param {number} id
     */
    delete(id){
        this.#produit = id;
        this.#basket = this.#basket.filter(prod => prod.id !== this.#produit)
        this.#save();
        console.log(this.#basket);
    }
     /**
     * Permet de modifier un produit
     * @param {Object} produit 
     */
    modify(produit){
        this.#produit = produit;
        const produitExisting = this.#basket.find(prod => prod.id == this.#produit.id)
        if(produitExisting != undefined){
            if(produitExisting.qte + this.#produit.qte <= 0){
                this.deletet(this.#produit.id)
            }else{
                produitExisting.qte += this.#produit.qte;
                produitExisting.prix = this.#produit.prix;
                produitExisting.montant = produitExisting.qte * this.#produit.prix;
                this.#save()
            }
        }
        console.log(this.#basket);
    }
    getQteProduit(){
        let numb = 0
        let Tmontant = 0
        for (const prod of this.#basket) {
            numb += prod.qte
            Tmontant += prod.montant
        }
        let recap = {totalLigne : this.#basket.length, totalQte : numb, totalPrix : Tmontant}
        console.log(recap);
        return recap;
    }
}