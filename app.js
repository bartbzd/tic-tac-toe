//PLAYER FACTORY
const player = (name) => {
  let player = "Player 1"

  return { player }
}

//GAMEBOARD MODULE
const gameBoard = (() => {
  let cell = 0
  let _xCell = 1
  let _oCell = 2

  let board = ["x", "o", "", "", "", "", "", "", ""]

  const gameDisplay = document.querySelector(".gameboard")

  for (let i = 0; i < board.length; i++) {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    gameDisplay.appendChild(cell)
    cell.textContent = board[i]
  }

  const firstPlayerMove = () => {
    cell = _xCell
  }
  const secondPlayerMove = () => {
    cell = _oCell
  }

  return { board, firstPlayerMove, secondPlayerMove }
})()

//GAME MODULE
// const gameControl = (() => {
//   const playerOne = player(Player)
//   const playerTwo = player(Player)

//   // Loop? board.length
// })()

// const selection = (board) => {
//    playerChoice = e.target;
//    board (Array method /indexOf)

// }

//DOM DISPLAY MODULE
// const displayGame = (() => {
// _Query Selectors
// Render
// })();

// playerPick.addEventListener("click", selection)
