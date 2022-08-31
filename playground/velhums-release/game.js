export default function createGame(){

  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  }

  function addPlayer(command){
    const playerId =  command.playerId;
    const playerX =  command.playerX;
    const playerY =  command.playerY;

    state.players[playerId] = {
      x: playerX,
      y: playerY
    }
  }

  function removePlayer(command){
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function addFruit(command){
    const fruitId =  command.fruitId;
    const fruitX =  command.fruitX;
    const fruitY =  command.fruitY;

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY
    }
  }

  function removeFruit(command){
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function movePlayer(command){
    const keyPressed = command.keyPressed;
    const player = state.players[command.playerId];
    const playerId = command.playerId; 
    const acceptedMoves = {
      ArrowUp(player){
        console.log('acceptedMoves -> Mone up, player.y = ', player);
        player.y - 1 >= 0
          ? player.y = player.y - 1
          : console.log('Bateu na borda superior')
        },
      ArrowRight(player){
        console.log('acceptedMoves -> Mone right')
        player.x + 1 < state.screen.width
          ? player.x = player.x + 1
          : console.log('Bateu na borda direita')
      },
      ArrowDown(player){
        console.log('acceptedMoves -> Mone down')
        player.y + 1 < state.screen.height
          ? player.y = player.y + 1
          : console.log('Bateu na borda direita')
      },
      ArrowLeft(player){
        console.log('acceptedMoves -> Mone left')
        player.x - 1 >= 0
          ? player.x = player.x - 1
          : console.log('Bateu na borda esquerda')
      },
    }
    const moveFunction = acceptedMoves[keyPressed];


    console.log(`game.movePlayer() -> Moving ${command.playerId} with ${keyPressed}`);

    if(player && moveFunction){
      moveFunction(player);
      checkForFruitCollision(playerId);
    }
  }

  function checkForFruitCollision(playerId){
    const player = state.players[playerId];

    for (const fruitId in state.fruits){
      const fruit = state.fruits[fruitId];
      if(player.x == fruit.x && player.y == fruit.y){
        console.log(`COLLISION between ${fruitId} and ${playerId}`);
        removeFruit({fruitId});
      }
    }
  }

  return {
    state,
    addFruit,
    removeFruit,
    addPlayer,
    removePlayer,
    movePlayer
  }

}

