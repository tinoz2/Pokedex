
const listaPokemon = document.getElementById("listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")
let url = "https://pokeapi.co/api/v2/pokemon/"

for (let i = 1; i <= 151; i++){
    fetch(url + i)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud a ${url + i}`);
            }
            return response.json();
        })
        .then(data => mostrarPokemon(data))
        .catch(error => {
            console.error(error);
        })
        .finally(() =>{
            
        })
}


function mostrarPokemon(data){

    let tipos = data.types.map((type) => `
    <p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join("")

    let pokeID = data.id.toString();
    if(pokeID.length === 1){
        pokeID = "00" + pokeID
    }else if(pokeID.length === 2){
        pokeID = "0" + pokeID
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
            <p class="pokemon-id-back">${pokeID}</p>
        <div class="pokemon-imagen">
            <img src="${data.sprites.other["official-artwork"].front_default}"
            alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">${pokeID}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height}m</p>
                <p class="stat">${data.weight}kg</p>
            </div>
        </div>
    `
    listaPokemon.append(div);
};

botonesHeader.forEach(boton => boton.addEventListener("click", (e)=> {
    const botonID = e.currentTarget.id;

    listaPokemon.innerHTML = ""

    for (let i = 1; i <= 151; i++){
        fetch(url + i)
            .then((response) => response.json())
            .then(data => {

                if(botonID === "ver-todos"){
                    mostrarPokemon(data)
                }else{
                    const tipos = data.types.map(type => type.type.name)
                    if (tipos.some(tipo => tipo.includes (botonID))){
                        mostrarPokemon(data)
                    }
                }
            })
    }
}));