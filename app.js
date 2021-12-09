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

  const getBoard = () => {
    return boardArr
  }

  return { boardArr, resetBoard, getBoard }
})()

//DISPLAY CONTROLLER MODULE
const displayController = (() => {
  const p1 = document.querySelector("#one")
  const p2 = document.querySelector("#two")
  let setPlayer1 = player("Player 1")
  let setPlayer2 = player("Player 2")
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
    document.querySelector(".orange").classList.add("marker-an")
    gameBoard.boardArr.forEach((cell) => {
      createCell(cell)
      addClick()
    })
  }

  const addClick = () => {
    const cells = document.querySelectorAll(".game-cell")
    cells.forEach((cell, index) => {
      cell.addEventListener("click", (e) => {
        gameControl.changeTurn(e)
        gameBoard.boardArr.splice(index, 1, e.target.textContent)

        gameBoard.getBoard()
        displayTurn()
      })
    })
  }

  const displayTurn = () => {
    const orange = document.querySelector(".orange")
    const pink = document.querySelector(".pink")
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

  return { createBoard, displayTurn, p1 }
})()

//GAME MODULE
const gameControl = (() => {
  let turn = 0
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  // if boardArr index value is X and
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
  const changeTurn = (e) => {
    if (e.target.textContent === "") {
      addMark(e)
      swapTurn()
      checkWinner()
    }
  }

  const checkWinner = () => {
    let xMarker = gameBoard.getBoard().reduce(function (a, e, i) {
      if (e === "X") a.push(i)
      return a
    }, [])
    let oMarker = gameBoard.getBoard().reduce(function (a, e, i) {
      if (e === "O") a.push(i)
      return a
    }, [])
    console.log(xMarker, oMarker)
    // for (const combo of winningCombos) {
    //   if (combo === gameBoard.boardArr.indexOf("X")) {
    //     console.log("hi")
    //   }
    // }
  }

  return { swapTurn, addMark, getTurn, changeTurn, resetTurn, checkWinner }
})()

displayController.createBoard()

//On click, add mark, swap turn, update board, get new board
