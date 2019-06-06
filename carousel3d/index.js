main();

function main() {

    let cellsRange = document.querySelector('.cells-range');
    let counter = cellsRange.value;
    let elCount = document.getElementById('counter');
    let deg = 0;
    let radius = 0;
    const MAX_CELLS = cellsRange.max;
    let current = 0;
    let isHorizontal = true;
    let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';

    for( let i = 0; i<MAX_CELLS; i++ ) {
        addCells(i+1);
    }
    let carousel = document.getElementById('carousel');
    let cellWidth = carousel.offsetWidth;
    let cellHeight = carousel.offsetHeight;
    updateCounter();
    updateStyles();

    

 
    
    cellsRange.addEventListener( 'change', () => {
        counter = cellsRange.value;
        
        updateCounter();
        updateStyles();
    });
    cellsRange.addEventListener( 'input', () => {
        counter = cellsRange.value;
        
        updateCounter();
        updateStyles();
    });

    document.getElementById('prev').addEventListener('click', () => {
        spin('prev');
    });
    document.getElementById('next').addEventListener('click', () => {
        spin('next');
    });

    document.getElementById('hori').addEventListener('click', () => {
        isHorizontal = true;
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        updateStyles();
    });
    document.getElementById('vert').addEventListener('click', () => {
        isHorizontal = false;
        rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
        updateStyles();
    });


    function updateCounter() {
        elCount.innerText = counter;
        
    }

    function addCells(html) {
        let p = document.getElementById('carousel');
        let newElement = document.createElement('div');
        newElement.setAttribute('class', 'cell');
        newElement.innerHTML = html;
        newElement.style.backgroundColor = `hsla(${(360 / 16)*html}, 100%, 50%, 0.5)`;
        p.appendChild(newElement);
    }

    function updateStyles() {
        let carousel = document.getElementById('carousel');
        let allCells = document.getElementsByClassName('cell');
        let size = isHorizontal ? cellWidth : cellHeight;
        deg = 360 / counter;
        radius = counter <= 2 ? 0 : (size/2) / Math.tan( (deg/2) * Math.PI/180 );
        current = 0;
        carousel.style.transform = `translateZ(${-radius}px)`;

        for( let i = 0; i<allCells.length ; i++ ) {
            allCells[i].style.opacity = 1;
            allCells[i].style.transform = `${rotateFn}(${deg*i}deg) translateZ(${radius}px)`;
            
            if(i>=counter) {
                allCells[i].style.opacity = 0;
            }
        }
        
    }

    

    function spin(type) {

        if(type == 'prev') {
            current -= 1;
        } else if   (type == 'next') {
            current += 1;
        }
        
        carousel.style.transform = `translateZ(${-radius}px) ${rotateFn}(${-1*current*deg}deg) `;
    }
}