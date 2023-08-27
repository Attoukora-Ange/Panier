function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket))
}
function getBasket(){
    let basket = JSON.parse(localStorage.getItem("basket"));
    if(basket === null){
        return [];
    }else{
        return basket;
    }
}

function addBasket(produit){
    let basket = getBasket()
    const produitExisting = basket.find(prod => prod.id == produit.id)
  
    if(produitExisting != undefined){
        produitExisting.qte++;
        produitExisting.montant = produitExisting.qte * produitExisting.prix;
    }else{
        produit.montant = produit.qte * produit.prix;
        basket.push(produit);
    }  
    saveBasket(basket)
    console.log(basket);
}

function deleteBasket(produit){
    let basket = getBasket()
        basket = basket.filter(prod => prod.id !== produit.id)
    saveBasket(basket)
    console.log(basket);
}

function modifyBasket(produit){
    let basket = getBasket()
    const produitExisting = basket.find(prod => prod.id == produit.id)
    if(produitExisting != undefined){
        if(produit.qte <= 0){
            deleteBasket(produit)
        }else{
            produitExisting.qte += produit.qte;
            produitExisting.prix = produit.prix;
            produitExisting.montant = produitExisting.qte * produit.prix;
            saveBasket(basket)
        }
    }
    console.log(basket);
}

function getQteProduit(){
    let basket = getBasket()
    let numb = 0
    let Tmontant = 0
    for (const prod of basket) {
        numb += prod.qte
        Tmontant += prod.montant
    }
    return {totalLigne : basket.length, totalQte : numb, totalPrix : Tmontant};
}

// addBasket({id:1, produit:"Blouse blanche", prix: 1000, qte:1 })
// addBasket({id:2, produit:"Blouse noire", prix: 5000, qte:5 })
addBasket({id:3, produit:"Blouse noire", prix: 5000, qte:5 })
// addBasket({id:4, produit:"Blouse noire", prix: 5000, qte:5 })
// addBasket({id:2, produit:"Blouse noire", prix: 5000, qte:5 })
// addBasket({id:5, produit:"Blouse noire", prix: 5000, qte:5 })
// addBasket({id:6, produit:"Blouse noire", prix: 5000, qte:5 })
addBasket({id:6, produit:"Blouse noire", prix: 5000, qte:5 })
// addBasket({id:1, produit:"Blouse noire", prix: 5000, qte:5 })
// addBasket({id:2, produit:"Blouse noire", prix: 5000, qte:5 })
deleteBasket({id:5, produit:"Blouse noire", prix: 5000, qte:5 })
// modifyBasket({id:2, produit:"Blouse blanche", prix: 1000, qte:7})
console.log(getQteProduit());
