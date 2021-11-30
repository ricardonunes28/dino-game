const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
// console.log(dino);
let isJumping = false;
let position = 0;

function handKeyUp(event) {
    if (event.keyCode === 32) {
        if(!isJumping){
            jump()
        }
    }
}
/**
 * Função que faz DINO pular enquanto aguarda o cactus chegar até ele
 * 
 */
function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(()=>{
                if (position <= 0){
                    clearInterval(downInterval)
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px'
                }
            },20)
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px'
        }
    }, 20)
}
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;


    cactus.classList.add('cactus') // adicionando uma div por meio do JS
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval(()=>{
        cactusPosition -=10;
        cactus.style.left = cactusPosition + 'px';

        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus)// se eu sair da tela, remove o cactus.
        }else if (cactusPosition >0 && cactusPosition < 60 && position < 60){
            //Game Over
            clearInterval(leftInterval);// parar de ir para esquerdad quando entrar em contato com o dinossauro
            isGameOver = true;
            document.body.innerHTML = '<h2 class="game-over">Fim de Jogo</h2>'
        }
        else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime) // recursividade, uma função chamando ela . invocando.
}

createCactus(); // chamando a função
document.addEventListener('keyup', handKeyUp)