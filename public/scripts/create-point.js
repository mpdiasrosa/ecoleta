function populateUfs() {
    const ufSelect =  document.querySelector("select[name=uf]")
   
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( response => response.json())
    .then( states => {
        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
}
   
populateUfs()
   
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value;  
    const indexOfSelected = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelected].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true;
   
    fetch(url)
    .then( response => response.json())
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled = false
    } )
}
   
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


/*-------------- Itens de Coleta ---------------*/
const itemsCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsCollect) {
    item.addEventListener("click", handleSelectedItem)
}
   
const collectedItems = document.querySelector('input[name="items"]')
   
let selectedItems = [];
   
function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected")   
    const itemId = event.target.dataset.id
     
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;
        return itemFound;
    }) 
   
    if (alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent
    })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }  
    collectedItems = selectedItems
}
