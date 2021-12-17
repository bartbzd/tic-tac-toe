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
  const display = document.querySelector(".gameboard")
  const orangeIcon = document.querySelector(".orange-marker")
  const pinkIcon = document.querySelector(".pink-marker")
  const resetBtn = document.querySelector(".reset-btn")
  const modal = document.querySelector(".modal")
  const startModal = document.querySelector(".start-modal")
  const selectPlayer = document.querySelector(".select-player")
  const selectComputer = document.querySelector(".select-computer")
  const p1display = document.querySelector(".one")
  const p2display = document.querySelector(".two")
  const p1text = document.querySelector("#one")
  const p2text = document.querySelector("#two")

  p1text.textContent = player("Player 1").name
  p2text.textContent = player("Player 2").name

  const gameInit = () => {
    showStartModal()
    createBoard()
  }

  const showStartModal = () => {
    startModal.style.display = "block"
  }

  const showModal = () => {
    modal.style.display = "block"
  }
  const hideModal = () => {
    modal.style.display = "none"
    form.reset()
  }

  ;[p1display, p2display].forEach((player) => {
    player.addEventListener("click", (e) => {
      modal.dataset.id = e.target.id
      showModal()
    })
  })
  const addPlayer = (e) => {
    e.preventDefault()
    const pText = document.querySelector(`#${modal.dataset.id}`)
    pText.textContent = player(e.target.name.value).name
    hideModal()
  }

  const createCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    cell.classList.add("hover")
    display.appendChild(cell)
  }

  const createBoard = () => {
    document.querySelector(".orange-marker").classList.add("marker-an")
    gameBoard.getBoard().forEach((cell) => {
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
          cell.classList.remove("hover")
          gameBoard.getBoard().splice(index, 1, e.target.textContent)
          gameControl.checkWinner()
          gameControl.aiTurn()

          displayTurn()
        }
      })
    })
  }

  const displayTurn = () => {
    changeMarker()
    updateMarkers()
  }
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
  //form validation
  const form = document.querySelector("form")
  form.addEventListener("submit", addPlayer)
  resetBtn.addEventListener("click", resetGame)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal()
    }
  })

  selectPlayer.addEventListener("click", () => {
    startModal.style.display = "none"
  })

  selectComputer.addEventListener("click", () => {
    gameControl.isBotPlaying = true
    startModal.style.display = "none"
    p2text.textContent = "Computer"
  })

  setIsBotPlaying = () => {
    return gameControl.isBotPlaying
  }
  return {
    gameInit,
    createBoard,
    changeMarker,
    removeMarkers,
    setIsBotPlaying,
    deleteDOM,
  }
})()

//GAME MODULE
const gameControl = (() => {
  let turn = 0
  let gameOver = false
  let xMarker
  let oMarker
  let winner
  let isBotPlaying = false
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

  const aiTurn = () => {
    const cells = document.querySelectorAll(".game-cell")
    if (displayController.setIsBotPlaying() === true && turn === 1) {
      let newArr = gameBoard
        .getBoard()
        .map((e, i) => (e === "" ? i : undefined))
        .filter((x) => x !== undefined)
      randomNum = newArr[Math.floor(Math.random() * newArr.length)]

      cells.forEach((cell, index) => {
        //prettier-ignore
        if (index === randomNum) {
        gameBoard.getBoard().splice(randomNum, 1, "O")
        cell.textContent = "O"
        turn = 0
        }
      })
    }

    //search array for ""
    //generate random number from ""
    //
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
    isBotPlaying,
    aiTurn,
  }
})()

displayController.gameInit()
