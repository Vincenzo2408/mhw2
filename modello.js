function esegui(event){
  /*const selezionato = event.currentTarget.dataset.index;
    const altri = event.currentTarget.parentNode.querySelectorAll("#descrizione span");
    for(let altro of altri){
    if(altro.dataset.index == selezionato){*/
      const details = event.currentTarget.parentNode.querySelector('p');
      const text = event.currentTarget.parentNode.querySelector('span');  
      if (text.textContent === 'Maggiori Dettagli') { /*il textContent restituisce una string da text */
        details.classList.remove('hidden'); /*rimuovo la classe hidden (con display none) così si vede*/
        text.textContent = 'Nascondi Dettagli';/*cambio la scritta in Nascondi Dettagli*/
      } 
      else
      {
        details.classList.add('hidden'); /*Viceversa di prima*/
        text.textContent = 'Maggiori Dettagli';
      }
    /*}
  }*/
 }

function objectLenght(){
  /*funzione che mi restituisce quanti sono gli elementi totali (cioè i div dento section: centro)*/
    let i=0;
    while(titoli[i]){
        i++;
    }
    return i;
}

function okay(event){
  const titolo = event.currentTarget.parentNode.querySelector('h1'); /*salvataggio di h1, img e button di quelli cliccati*/
  const img = event.currentTarget.parentNode.querySelector('img');
  const piacere = event.currentTarget.parentNode.querySelector('button');

  if(piacere.textContent === "Aggiungi ai preferiti"){
    const container=document.querySelector("#sparizione"); 
    container.classList.remove('hidden'); 
    const sottocontenitore=document.querySelector("#mipiace");
    const new_div=document.createElement("div");
    const new_h1=document.createElement("h1"); 
    new_h1.textContent=titolo.textContent; 
    const new_img=document.createElement("img");
    new_img.src=img.src; 
    const new_a=document.createElement("button");
    new_a.textContent="Rimuovi dai preferiti"; 
    sottocontenitore.appendChild(new_div); /*aggiungo un nuovo div dentro #mipiace*/
    new_div.appendChild(new_h1); /*piazzo dentro il div nuovo creato l'h1, l'img, e button */
    new_div.appendChild(new_img);
    new_div.appendChild(new_a);
    piacere.textContent="Aggiunto ai preferiti"; /*modifico Aggiungi ai preferiti in Aggiunto ai preferiti affinché non inserisco due volte lo stesso elemento*/
    /*Implementazione dell'evento "rimuovi dai preferiti" a tutti i #mipiace button*/
    const rimozione=document.querySelectorAll("#mipiace button")
    for(const unlike of rimozione){
      unlike.addEventListener('click', okay);
    }
  }

  if(piacere.textContent === "Rimuovi dai preferiti"){
    const list = document.querySelectorAll("#descrizione h1") /*Piazza nella lista tutti i valori di h1 di descrizione*/
    for(let i=0; i<objectLenght();i++){
      if(list[i].textContent===titolo.textContent){ /*confronta il nome di h1 di quello cliccato dei preferiti con tutti gli h1 delle normali cabine*/
        const cambiopiacere = document.querySelectorAll("#descrizione button") /*appena trovata una corrispondenza mi salvo in cambiopiacere la lista di tutti i button*/
        cambiopiacere[i].textContent="Aggiungi ai preferiti"; /*e modifica quello i-esimo che era Aggiunto ai preferiti in Aggiungi ai pregeriti*/
        break;/*ed esco dal for*/
      }
    }
    /*rimuovo infine il nodo*/
    event.currentTarget.parentNode.remove('div');

    if(!document.querySelector('#mipiace div')){
    const container=document.querySelector("#sparizione"); 
    container.classList.add('hidden'); }
  }

}

function addElement(){
  /*const container=document.querySelectorAll(".contenitore"); /*posiziona in un vettore "container" tutti i contenitori e li numera*/
  const maxi=document.querySelector('#descrizione'); /* T */
  for(let i=0; i<objectLenght(); i++){
    const container=document.createElement("div"); /* T */
    maxi.appendChild(container); /* T */
    container.classList.add('contenitore'); /* T */
    const new_h1=document.createElement("h1"); 
    new_h1.textContent=titoli[i]; 
    const new_img=document.createElement("img");
    new_img.src=immagini[i];
    const new_p=document.createElement("p");
    new_p.textContent=descrizioni[i];
    const contenuto=document.createElement("span"); 
    contenuto.textContent='Maggiori Dettagli';
    const new_a=document.createElement("button");
    new_a.textContent="Aggiungi ai preferiti";
    container.appendChild(new_h1); /*Da mettere container[i]. */
    container.appendChild(new_img);
    container.appendChild(contenuto);
    container.appendChild(new_p);
    container.appendChild(new_a);

    new_p.classList.add('hidden'); 
  }
  /*Implementazione dell'evento "mostra dettagli"*/
    const descrizione=document.querySelectorAll("#descrizione span");
    for(const desc of descrizione){
    desc.addEventListener('click', esegui);}
  /*Implementazione dell'evento "aggiungi ai preferiti"*/ 
    const mipiace=document.querySelectorAll("#descrizione button")
    for(const like of mipiace){
    like.addEventListener('click', okay);
    }
}

function ricerca(event){
  const input = document.getElementById("fnome");
  const filtro = input.value.toUpperCase();
  const lista = document.querySelectorAll("#descrizione h1");
  for (let i = 0; i < objectLenght(); i++) {
      const testo = lista[i].textContent;
      if (testo.toUpperCase().indexOf(filtro) > -1) {
        lista[i].parentNode.classList.remove('hidden');
      } else {
        lista[i].parentNode.classList.add('hidden');
      }
  }
}   

document.body.onload = addElement; 
/*Implementazione dell'evento "barra di ricerca"*/
document.getElementById("fnome").addEventListener("keyup", ricerca);

