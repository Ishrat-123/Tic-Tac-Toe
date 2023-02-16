const playerText = document.querySelector('.title');
const restartbutton = document.getElementById('restrt');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const o_TEXT= "O";
const x_TEXT = "X";
let CurrenPlayer = x_TEXT;


let spaces = Array(9).fill(null); //stop overwrite

//array function
const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxclicked))
}

function boxclicked(e) {
    const boxId = e.target.id;

    if (!spaces[boxId]) {
        spaces[boxId] = CurrenPlayer;
        e.target.innerText = CurrenPlayer;

        if(playerHasWon() !== false){
            playerText.innerHTML = `${CurrenPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        if (CurrenPlayer == x_TEXT) {
            CurrenPlayer = o_TEXT;
        }
        else CurrenPlayer= x_TEXT;
    }
}

const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function playerHasWon(){
for (const condition of winningCombo){
    let [a,b,c] = condition;
    if(spaces[a]&& (spaces[a] ==(spaces[b])) && spaces[a]==spaces[c]){
        return  [a,b,c]
    }
}
return false; 
}


restartbutton.addEventListener('click', function () {
    clearBox();
})

function clearBox() {
    spaces.fill(null);
    playerText.innerHTML = 'Tic Tac Toe'
    CurrenPlayer = x_TEXT;
    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor=''
    });
   
}


startGame();