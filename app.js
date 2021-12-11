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

  return { resetBoard, getBoard }
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

  const createBoard = () => {
    document.querySelector(".orange").classList.add("marker-an")
    const updatedBoard = gameBoard.getBoard()
    updatedBoard.forEach((cell) => {
      createCell(cell)
      addClick()
    })
  }

  const addClick = () => {
    const cells = document.querySelectorAll(".game-cell")
    cells.forEach((cell, index) => {
      cell.addEventListener("click", (e) => {
        gameControl.changeTurn(e)
        changeMarker()
        gameBoard.getBoard().splice(index, 1, e.target.textContent)
        gameControl.checkWinner()
        updateMarkers()
      })
    })
    // return
  }

  const orangeIcon = document.querySelector(".orange")
  const pinkIcon = document.querySelector(".pink")
  const changeMarker = () => {
    if (gameControl.getTurn() === 0) {
      orangeIcon.classList.add("marker-an")
      orangeIcon.style.visibility = "visible"
      pinkIcon.style.visibility = "hidden"
      pinkIcon.classList.remove("marker-an")
    } else if (gameControl.getTurn() === 1) {
      pinkIcon.classList.add("marker-an")
      pinkIcon.style.visibility = "visible"
      orangeIcon.style.visibility = "hidden"
      orangeIcon.classList.remove("marker-an")
    }
  }
  const removeMarkers = () => {
    pinkIcon.style.visibility = "hidden"
    orangeIcon.style.visibility = "hidden"
    pinkIcon.classList.remove("marker-an")
    orangeIcon.classList.remove("marker-an")
  }

  const updateMarkers = () => {
    if (gameControl.isGameOver() === true) {
      gameControl.isGameOver()
      removeMarkers()
    }
  }
  const deleteDOM = () => {
    display.innerHTML = ""
  }

  const resetGame = () => {
    deleteDOM()
    gameBoard.resetBoard()
    gameControl.resetGame()
    gameControl.resetTurn()
    changeMarker()
    createBoard()
  }

  const showWinner = () => {
    // let xWin =
  }
  const resetBtn = document.querySelector(".reset-btn")
  resetBtn.addEventListener("click", resetGame)

  return { createBoard, changeMarker, removeMarkers }
})()

//GAME MODULE
const gameControl = (() => {
  let turn = 0
  let gameOver = false
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
    }
  }

  const isGameOver = () => {
    return gameOver
  }

  const resetGame = () => {
    return (gameOver = false)
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
    for (const combo of winningCombos) {
      if (
        combo.toString() === xMarker.toString() ||
        combo.toString() === oMarker.toString()
      ) {
        gameOver = true
      }
    }
  }

  return {
    swapTurn,
    addMark,
    getTurn,
    changeTurn,
    resetTurn,
    checkWinner,
    isGameOver,
    resetGame,
  }
})()

displayController.createBoard()
