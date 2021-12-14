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
  const playerModal = document.querySelector(".modal")
  const p1display = document.querySelector(".one")
  const p2display = document.querySelector(".two")
  const p1text = document.querySelector("#one")
  const p2text = document.querySelector("#two")
  p1text.textContent = player("Player 1").name
  p2text.textContent = player("Player 2").name

  const showModal = () => {
    playerModal.style.display = "block"
  }
  p1display.addEventListener("click", showModal)
  const addPlayer = (event) => {
    event.preventDefault()
    const input = document.getElementById("name")
    p1text.textContent = player(input.value).name
    playerModal.style.display = "none"
  }

  const submitBtn = document.querySelector(".submit")
  submitBtn.addEventListener("click", addPlayer)

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
          cell.classList.remove("hover")
          gameBoard.getBoard().splice(index, 1, e.target.textContent)
          gameControl.checkWinner()
          updateMarkers()
        }
      })
    })
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

  const showWinner = () => {
    const winningCells = document.querySelectorAll(".game-cell")
    winningCells.forEach((cell, index) => {
      if (
        gameControl.getWinner() === "player1" &&
        gameControl.getXmarker().includes(index)
      ) {
        cell.classList.add("xWin")
        cell.classList.remove("hover")
        p1display.classList.add("oneWin")
      }
      if (
        gameControl.getWinner() === "player2" &&
        gameControl.getOmarker().includes(index)
      ) {
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
        gameOver = true
        winner = "player1"
        xMarker = combo
      }
      if (combo.every((arr) => oMarker.includes(arr))) {
        gameOver = true
        winner = "player2"
        oMarker = combo
      }
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
