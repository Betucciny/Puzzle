const inteligente = async (img) => {
    await delay(1000);
    mover(img)
}

const normal = function(event){
    mover(event.currentTarget)
}


function mover(imagen){
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
    console.table(tablero)
}

function findEmpty(lugares){
    for(let pos of lugares){
        let flag = false;
        for(let coor of pos){
            if(coor < 0 || coor > 2){
                flag = true;
            }
        }
        if(flag) continue;
        const x = pos[0];
        const y = pos[1];
        if(tablero[x][y] === 0){
            return [x, y]
        }
    }
    return -1;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const fichas = document.querySelectorAll('#grid div');
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

for (const ficha of fichas) {
    const image = ficha.querySelector('img');
    if(image ==null){
        continue;
    }
    image.addEventListener('click', normal);
}