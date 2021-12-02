//PLAYER FACTORY
const player = (name) => {
  return { name }
}
//DOM SELECTOR MODULE
const DOM = (() => {
  const p1 = document.querySelector("#one")
  const p2 = document.querySelector("#two")
  const display = document.querySelector(".gameboard")

  return {
    p1,
    p2,
    display,
  }
})()
//GAMEBOARD MODULE
const gameBoard = (() => {
  let boardArr = ["x", "o", "x", "o", "", "", "", "", ""]

  return { boardArr }
})()

//DISPLAY CONTROLLER MODULE
const displayController = (() => {
  let player1 = player("Player 3")
  let player2 = player("Player 2")
  DOM.p1.textContent = player1.name
  DOM.p2.textContent = player2.name

  let board = gameBoard.boardArr
  let i = 0

  const createCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    DOM.display.appendChild(cell)
    cell.textContent = board[i]
  }
  const render = () => {
    board.forEach((cell) => {
      createCell(cell)
      i++
    })
  }
  const resetBoard = () => {
    let cell = document.querySelectorAll(".game-cell")
    gameBoard.boardArr = ["", "", "", "", "", "", "", "", ""]
    // DOM.display.deleteChild(cell)
  }

  render()
  const cells = document.querySelectorAll(".game-cell")
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.target.textContent = "X"
      resetBoard()
    })
  })
  return {
    player1,
    player2,
    render,
    board,
  }
})()
//GAME MODULE
const gameControl = (() => {
  //initial state/turn of game
  //selection clicked, change turns and symbol
  //first to win or check if board filled(draw)
  let gameTurn = 0
})()
