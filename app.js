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
      document.querySelector(".orange").classList.add("marker-an")
      const cells = document.querySelectorAll(".game-cell")
      cells.forEach((cell, index) => {
        cell.addEventListener("click", (e) => {
          changeTurn(e)
          gameBoard.boardArr.splice(index, 1, e.target.textContent)
        })
      })
    })
  }

  const changeTurn = (e) => {
    if (e.target.textContent === "") {
      gameControl.addMark(e)
      gameControl.swapTurn()
      gameControl.getTurn()
      console.log(gameControl.getTurn())
      displayTurn()
    }
  }

  const displayTurn = () => {
    const orange = document.querySelector(".orange")
    const pink = document.querySelector(".pink")
    console.log(orange, pink)
    if (gameControl.getTurn() === 0) {
      orange.classList.add("marker-an")
      orange.style.visibility = "visible"
      pink.style.visibility = "hidden"
      pink.classList.remove("marker-an")
    } else if (gameControl.getTurn() === 1) {
      pink.classList.add("marker-an")
      pink.style.visibility = "visible"
      orange.style.visibility = "hidden"
      orange.classList.remove("marker-an")
    }
  }
  const resetGame = () => {
    gameBoard.resetBoard()
    gameControl.resetTurn()
    displayTurn()
    deleteBoard()
    createBoard()
  }
  const resetBtn = document.querySelector(".reset-btn")
  resetBtn.addEventListener("click", resetGame)

  return { createBoard, displayTurn }
})()

//GAME MODULE
const gameControl = (() => {
  let turn = 0

  const addMark = (e) => {
    turn === 0 ? (e.target.textContent = "X") : (e.target.textContent = "O")
  }
  const swapTurn = () => {
    turn === 0 ? (turn = 1) : (turn = 0)
  }

  const getTurn = () => {
    return turn
  }

  const resetTurn = () => {
    return (turn = 0)
  }
  //first to win or check if board filled(draw)

  return { swapTurn, addMark, getTurn, resetTurn }
})()

displayController.createBoard()
