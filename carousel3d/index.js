main();

function main() {

    
    let counter = 4;
    let elCount = document.getElementById('counter');
    let currentSlide = document.querySelector('#current span');
    let deg = 0;
    let radius = 0;
    const MAX_CELLS = 16;
    let current = 0;

    for( let i = 0; i<MAX_CELLS; i++ ) {
        addCells(i+1);
    }

    updateCounter();
    updateStyles();

    let carousel = document.getElementById('carousel');


    document.getElementById('add').addEventListener('click', () => {
        if(counter < MAX_CELLS) {
            counter += 1;
            updateCounter();
            updateStyles();
        }
        
    })
    document.getElementById('sub').addEventListener('click', () => {
        if(counter > 0) {
            counter -= 1;
            updateCounter();
            updateStyles();
        }
        
    })

    document.getElementById('prev').addEventListener('click', () => {
        spin('prev');
    });
    document.getElementById('next').addEventListener('click', () => {
        spin('next');
    });


    function updateCounter() {
        elCount.innerText = counter;
        
    }

    function addCells(html) {
        let p = document.getElementById('carousel');
        let newElement = document.createElement('div');
        newElement.setAttribute('class', 'cell');
        newElement.innerHTML = html;
        p.appendChild(newElement);
    }

    function updateStyles() {
        let carousel = document.getElementById('carousel');
        let allCells = document.getElementsByClassName('cell');
        deg = 360 / counter;
        radius = counter <= 2 ? 0 : (220/2) / Math.tan( (deg/2) * Math.PI/180 );

        carousel.style.transform = `translateZ(${-radius}px) rotateY(${-1*current*deg}deg)`;

        for( let i = 0; i<allCells.length ; i++ ) {
            allCells[i].style.opacity = 1;
            allCells[i].style.transform = `rotateY(${deg*i}deg) translateZ(${radius}px)`;
            
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
        
        carousel.style.transform = `translateZ(${-radius}px) rotateY(${-1*current*deg}deg) `;
        currentSlide.innerText = current;
    }
}