const player = (name) => {
  return { name }
}

const gameBoard = (() => {
  let _boardArr = ["", "", "", "", "", "", "", "", ""]

  const resetBoard = () => {
    _boardArr = ["", "", "", "", "", "", "", "", ""]
  }

  const getBoard = () => {
    return _boardArr
  }

  return { resetBoard, getBoard }
})()

const displayController = (() => {
  const form = document.querySelector("form")
  const exit = document.querySelector(".exit")
  const p1text = document.querySelector("#one")
  const p2text = document.querySelector("#two")
  const modal = document.querySelector(".modal")
  const p1display = document.querySelector(".one")
  const p2display = document.querySelector(".two")
  const display = document.querySelector(".gameboard")
  const resetBtn = document.querySelector(".reset-btn")
  const pinkIcon = document.querySelector(".pink-marker")
  const orangeIcon = document.querySelector(".orange-marker")
  const startModal = document.querySelector(".start-modal")
  const selectPlayer = document.querySelector(".select-player")
  const selectComputer = document.querySelector(".select-computer")

  p1text.textContent = player("Player 1").name
  p2text.textContent = player("Player 2").name

  const gameInit = () => {
    showStartModal()
    _createBoard()
  }

  const showStartModal = () => {
    startModal.style.display = "block"
  }
  const hideStartModal = () => {
    startModal.style.display = "none"
  }
  const showPlayerModal = () => {
    modal.style.display = "block"
  }
  const hidePlayerModal = () => {
    modal.style.display = "none"
    form.reset()
  }

  const createCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    cell.classList.add("hover")
    display.appendChild(cell)
  }

  const _createBoard = () => {
    document.querySelector(".orange-marker").classList.add("marker-an")
    gameBoard.getBoard().forEach((cell) => {
      createCell(cell)
      addClick()
    })
  }

  const addPlayer = (e) => {
    e.preventDefault()
    const pText = document.querySelector(`#${modal.dataset.id}`)
    pText.textContent = player(e.target.name.value).name
    hidePlayerModal()
  }

  const addClick = () => {
    const cells = document.querySelectorAll(".game-cell")
    cells.forEach((cell, index) => {
      cell.addEventListener("click", (e) => {
        if (gameControl.isGameOver() === false) {
          cell.classList.remove("hover")
          gameControl.changeTurn(e)
          gameBoard.getBoard().splice(index, 1, e.target.textContent)

          gameControl.checkWinner()
          setTimeout(() => gameControl.aiTurn(), 300)

          // changeMarker()
          // updateMarkers()
          displayTurn()
          if (!gameBoard.getBoard().includes("")) {
            removeMarkers()
          }
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

  const _deleteDOM = () => {
    display.innerHTML = ""
  }

  const resetPlayerWinners = () => {
    p1display.classList.remove("oneWin")
    p2display.classList.remove("twoWin")
  }

  const resetGame = () => {
    _deleteDOM()
    gameBoard.resetBoard()
    gameControl.resetGame()
    gameControl.resetTurn()
    resetPlayerWinners()
    changeMarker()
    _createBoard()
  }

  const showWinner = () => {
    const winningCells = document.querySelectorAll(".game-cell")
    winningCells.forEach((cell, index) => {
      if (
        gameControl.getWinner() === "player1" &&
        gameControl.getXmarker().includes(index)
      ) {
        cell.classList.add("xWin")
        p1display.classList.add("oneWin")
      }
      if (
        gameControl.getWinner() === "player2" &&
        gameControl.getOmarker().includes(index)
      ) {
        cell.classList.add("oWin")
        p2display.classList.add("twoWin")
      }
    })
  }

  form.addEventListener("submit", addPlayer)
  resetBtn.addEventListener("click", resetGame)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hidePlayerModal()
    }
  })
  ;[p1display, p2display].forEach((player) => {
    player.addEventListener("click", (e) => {
      modal.dataset.id = e.target.id
      showPlayerModal()
    })
  })
  selectPlayer.addEventListener("click", () => {
    hideStartModal()
    resetGame()
    p2text.textContent = player("Player 2").name
  })
  selectComputer.addEventListener("click", () => {
    gameControl.isBotPlaying = true
    hideStartModal()
    resetGame()
    p2text.textContent = "Computer"
  })
  exit.addEventListener("click", () => {
    showStartModal()
    gameControl.isBotPlaying = false
  })
  getIsBotPlaying = () => {
    return gameControl.isBotPlaying
  }

  return {
    gameInit,
    changeMarker,
    removeMarkers,
    getIsBotPlaying,
    updateMarkers,
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
    //prettier-ignore
    if (
      !gameBoard.getBoard().includes("") &&
      winner !== "player1" &&
      winner !== "player2"
    ) {
      displayController.updateMarkers()
      winner = "tie"
    
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
    if (
      gameControl.isGameOver() === false &&
      displayController.getIsBotPlaying() === true &&
      turn === 1
    ) {
      let newArr = gameBoard
        .getBoard()
        .map((e, i) => (e === "" ? i : undefined))
        .filter((x) => x !== undefined)
      let randomNum = newArr[Math.floor(Math.random() * newArr.length)]

      // let best = gameControl.miniMax(gameBoard.getBoard(), getTurn())
      const cells = document.querySelectorAll(".game-cell")
      cells.forEach((cell, index) => {
        //prettier-ignore
        if (index === randomNum) { //randomNum
          gameBoard.getBoard().splice(randomNum, 1, "O") //randomNum
          cell.textContent = "O"
          turn = 0
          cell.classList.remove("hover")
          checkWinner()
          displayController.changeMarker()
          displayController.updateMarkers()
        }
      })
    }
  }

  // const miniMax = (arr, turn) => {
  //   let newArr = gameBoard
  //     .getBoard()
  //     .map((e, i) => (e === "" ? i : undefined))
  //     .filter((x) => x !== undefined)

  //   if (winner === "player1") {
  //     return { score: -1 }
  //   } else if (winner === "player2") {
  //     return { score: 1 }
  //   } else if (!gameBoard.getBoard().includes("")) {
  //     return { score: 0 }
  //   }

  //   let moves = []
  //   for (let i = 0; i < newArr.length; i++) {
  //     const move = {}
  //     move.index = arr[newArr[i]]
  //     // console.log(turn)
  //     arr[newArr[i]] = turn
  //     console.log(arr[newArr[i]])

  //     if (getTurn() === 1) {
  //       const result = miniMax(arr, 0)
  //       move.score = result.score
  //       console.log(move.score)
  //     } else {
  //       const result = miniMax(arr, 1)
  //       move.score = result.score
  //       console.log(move.score)
  //     }

  //     arr[newArr[i]] = move.index
  //     moves.push(move)
  //   }

  //   let bestMove = null
  //   if (turn === 1) {
  //     let bestScore = -10000
  //     for (let i = 0; i < moves.length; i++) {
  //       if (moves[i].score > bestScore) {
  //         bestScore = moves[i].score
  //         bestMove = i
  //       }
  //     }
  //   } else {
  //     let bestScore = 10000
  //     for (let i = 0; i < moves.length; i++) {
  //       if (moves[i].score < bestScore) {
  //         bestScore = moves[i].score
  //         bestMove = i
  //       }
  //     }
  //   }

  //   return moves[bestMove]
  // }

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
    gameOver,
  }
})()

displayController.gameInit()
