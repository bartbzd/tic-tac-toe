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
  const p1text = document.querySelector("#one")
  const p2text = document.querySelector("#two")
  let setPlayer1 = player("Player 1")
  let setPlayer2 = player("Player 2")
  p1text.textContent = setPlayer1.name
  p2text.textContent = setPlayer2.name

  const display = document.querySelector(".gameboard")
  const createCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    cell.classList.add("hover")
    display.appendChild(cell)
  }

  const createBoard = () => {
    document.querySelector(".orange-marker").classList.add("marker-an")
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
        if (gameControl.isGameOver() === false) {
          gameControl.changeTurn(e)
          changeMarker()
          gameBoard.getBoard().splice(index, 1, e.target.textContent)
          gameControl.checkWinner()
          updateMarkers()
        }
      })
    })
    // return
  }

  const orangeIcon = document.querySelector(".orange-marker")
  const pinkIcon = document.querySelector(".pink-marker")
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
      removeMarkers()
      showWinner()
    }
  }
  const deleteDOM = () => {
    display.innerHTML = ""
  }
  const resetPlayerWinners = () => {
    p1display.classList.remove("oneWin")
    p2display.classList.remove("twoWin")
  }
  const resetGame = () => {
    deleteDOM()
    gameBoard.resetBoard()
    gameControl.resetGame()
    gameControl.resetTurn()
    resetPlayerWinners()
    changeMarker()
    createBoard()
  }
  const p1display = document.querySelector(".one")
  const p2display = document.querySelector(".two")
  const showWinner = () => {
    let xWin = gameControl.getXmarker()
    let oWin = gameControl.getOmarker()
    let gameWinner = gameControl.getWinner()
    const winningCells = document.querySelectorAll(".game-cell")
    winningCells.forEach((cell, index) => {
      if (gameWinner === "player1" && xWin.includes(index)) {
        cell.classList.add("xWin")
        cell.classList.remove("hover")
        p1display.classList.add("oneWin")
      }
      if (gameWinner === "player2" && oWin.includes(index)) {
        cell.classList.add("oWin")
        cell.classList.remove("hover")
        p2display.classList.add("twoWin")
      }
    })
  }
  const resetBtn = document.querySelector(".reset-btn")
  resetBtn.addEventListener("click", resetGame)

  return { createBoard, changeMarker, removeMarkers }
})()

//GAME MODULE
const gameControl = (() => {
  let turn = 0
  let gameOver = false
  let xMarker
  let oMarker
  let winner
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
    xMarker = gameBoard.getBoard().reduce(function (a, e, i) {
      if (e === "X") a.push(i)
      return a
    }, [])
    oMarker = gameBoard.getBoard().reduce(function (a, e, i) {
      if (e === "O") a.push(i)
      return a
    }, [])
    for (const combo of winningCombos) {
      if (combo.every((arr) => xMarker.includes(arr))) {
        console.log("hi")
        gameOver = true
        winner = "player1"
        xMarker = combo
      }
      if (combo.every((arr) => oMarker.includes(arr))) {
        gameOver = true
        winner = "player2"
        oMarker = combo
      }

      //   combo.contains(xMarker.toString()) ||
      //   combo.toString() === oMarker.toString()
      //   //not checking more than simple/exact match
      // ) {
      //   console.log("Win")
      //   gameOver = true
      // }
    }
  }
  const getXmarker = () => {
    return xMarker
  }
  const getOmarker = () => {
    return oMarker
  }
  const getWinner = () => {
    return winner
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
    getXmarker,
    getOmarker,
    getWinner,
  }
})()

displayController.createBoard()
