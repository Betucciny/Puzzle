const inteligente = async () => {
    visited = [];
    respuesta = [];
    limite = 25;
    solved = false;
    await solve(tablero, 0);
    console.log(respuesta)
    await moverIA(respuesta)
    tablero = [];
    for(let fila of resuelto){
        tablero.push(fila.slice())
    }
    const images = document.querySelectorAll('#grid div img');
    for (const image of images) {
        if(image ==null){
            continue;
        }
        image.addEventListener('click', mover);
    }
}


const moverIA= async(respuesta) =>{
    for(let movimiento of respuesta){
        await delay(500);
        for(let i=0; i<movimiento.length; i++){
            for(let j=0; j<movimiento[i].length; j++){
                const ficha = document.querySelector('[data-x="'+ CSS.escape(i) +'"][data-y="'+ CSS.escape(j) +'"]')
                ficha.innerHTML = "";
                if(movimiento[i][j] === 0) continue
                let img = document.createElement('img');
                img.src = 'assets/imgs/pngegg (' + movimiento[i][j] + ').png';
                ficha.appendChild(img)
            }
        }
    }
}



function mover(event){
    const imagen = event.currentTarget
    const lugarO = imagen.parentNode;
    const xPos = parseInt(lugarO.dataset.x);
    const yPos = parseInt(lugarO.dataset.y);
    const lugares = [
        [xPos + 1, yPos],
        [xPos - 1, yPos],
        [xPos, yPos + 1],
        [xPos, yPos - 1],
    ]
    const coorEmpty = findEmpty(lugares);
    if(coorEmpty === -1){
        return;
    }
    const x0 = coorEmpty[0];
    const y0 = coorEmpty[1];
    tablero[x0][y0] = tablero[xPos][yPos];
    tablero[xPos][yPos] = 0;
    const lugarN = document.querySelector('[data-x="'+ CSS.escape(x0) +'"][data-y="'+ CSS.escape(y0) +'"]')
    lugarN.appendChild(lugarO.querySelector('img'))
    lugarN.querySelector('img').addEventListener('click', mover)
    lugarO.innerHTML='';
}

function isSafe(pos){
    for(let coor of pos){
        if(coor < 0 || coor > 2){
            return false;
        }
    }
    return true
}

function findEmpty(lugares){
    for(let pos of lugares){
        if(!isSafe(pos)) continue;
        const x = pos[0];
        const y = pos[1];
        if(tablero[x][y] === 0){
            return [x, y]
        }
    }
    return -1;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const solve = async (actual) =>{
    if(solved) return
    if(isIn(visited, actual) || visited.length > limite){
        visited.push(actual);
        return;
    }
    visited.push(actual);
    if(isEqual(actual, resuelto)){
        console.log('aqui');
        limite = visited.length;
        respuesta = []
        solved = true;
        for(let elemento of visited){
            let temp = []
            for(let fila of elemento){
                temp.push(fila.slice())
            }
            respuesta.push(temp)
        }
        return;
    }


    let coorCero = findCero(actual);
    let hijos = generarNodos(coorCero[0], coorCero[1], actual);

    for(let hijo of hijos){
        await solve(hijo);
        visited.pop();
    }
}

function isIn(lista, comp){
    for(let elemento of lista){
        if(isEqual(elemento, comp)) return true
    }
    return false
}



function findCero(actual){
    for(let i=0; i<actual.length; i++){
        for(let j=0; j<actual[i].length; j++){
            if(actual[i][j] === 0) return [i, j]
        }
    }
}

function generarNodos(cerox, ceroy, original){
    const lista = []
    const next = [
        [cerox + 1, ceroy],
        [cerox - 1, ceroy],
        [cerox, ceroy + 1],
        [cerox, ceroy - 1],
    ]
    for(let pos of next){
        if(!isSafe(pos)) continue;
        const x = pos[0];
        const y = pos[1];
        const nueva = [];
        for(let fila of original){
            nueva.push(fila.slice())
        }
        nueva[cerox][ceroy] = nueva[x][y];
        nueva[x][y] = 0;
        lista.push(nueva)
    }
    return lista;
}

function isEqual(x, y){
    for(let i=0; i<x.length; i++){
        for(let j=0; j<x[i].length; j++){
            if(x[i][j] !== y[i][j]) return false
        }
    }
    return true;
}

let limite;
let visited;
let respuesta;
let solved;

const images = document.querySelectorAll('#grid div img');
let tablero = [
    [1,2,3],
    [4,5,6],
    [7,8,0]
];

const resuelto = [
    [1,2,3],
    [4,5,6],
    [7,8,0]
];

const button = document.getElementById('Resolver');
button.addEventListener('click', inteligente);

for (const image of images) {
    if(image ==null){
        continue;
    }
    image.addEventListener('click', mover);
}