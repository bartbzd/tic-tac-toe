//PLAYER FACTORY
const player = (name) => {
  return { name }
}
//GAMEBOARD MODULE
const gameBoard = (() => {
  let boardArr = ["", "", "", "", "", "", "", "", ""]

  const resetBoard = () => {
    boardArr = ["", "", "", "", "", "", "", "", ""]
  }
  return { boardArr, resetBoard }
})()

//DISPLAY CONTROLLER MODULE
const displayController = (() => {
  const p1 = document.querySelector("#one")
  const p2 = document.querySelector("#two")
  let setPlayer1 = player("Bart")
  let setPlayer2 = player("Nancy")
  p1.textContent = setPlayer1.name
  p2.textContent = setPlayer2.name

  const display = document.querySelector(".gameboard")
  const createCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    display.appendChild(cell)
  }

  const deleteBoard = () => {
    display.innerHTML = ""
  }
  const createBoard = () => {
    gameBoard.boardArr.forEach((cell) => {
      createCell(cell)

      const cells = document.querySelectorAll(".game-cell")
      cells.forEach((cell, index) => {
        cell.addEventListener("click", (e) => {
          if (cell.textContent === "") {
            gameControl.addMark(e)
            gameControl.changeTurn()
          }
          gameBoard.boardArr.splice(index, 1, e.target.textContent)
        })
      })
    })
  }

  const resetBtn = document.querySelector(".reset")
  resetBtn.addEventListener("click", () => {
    gameBoard.resetBoard()
    deleteBoard()
    createBoard()
  })
  return { createBoard }
})()

//GAME MODULE
const gameControl = (() => {
  let turn = 0

  const changeTurn = () => {
    turn === 0 ? (turn = 1) : (turn = 0)
  }

  const addMark = (e) => {
    turn === 0 ? (e.target.textContent = "X") : (e.target.textContent = "O")
  }

  //first to win or check if board filled(draw)

  return { changeTurn, addMark }
})()

displayController.createBoard()
