function KnightMoves(start, end) {
  // use a bfs, cause dfs is potentially infinite

  function allowedMove(currentState, move) {
    // checks if given move is allowed
    let i = currentState[0] + move[0];
    if (i < 0 || i > 7) return false;
    let j = currentState[1] + move[1];
    if (j < 0 || j > 7) return false;
    return true;
  }
  function changeState(currentState, move) {
    return [currentState[0] + move[0], currentState[1] + move[1]];
  }
  function search(start, end) {
    // returns the optimal path with the shortest route by doing a breadth first search
    // a knight can move two steps forward and one step to the side
    // this means it can make a total of 8 moves
    let moves = [
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [2, 1],
      [-2, 1],
      [2, -1],
      [-2, -1],
    ];
    // gameboard is 8x8, index 0-7 for row and 0-7 for column
    // make a memo of no. of steps to goal for each coordinate, initialise all to -1 to show they are unexplored
    let memo = Array.from(Array(8), () => {
      return Array(8).fill(-1);
    });
    // path will store the preceding state of any state, i.e if 0,0 led to 1,2 we will store "1,2": [0,0]
    let path = {};
    // takes zero steps to reach the goal from itself
    let steps = 0;
    // start the bfs from the goal
    let q = [end];
    while (q.length !== 0) {
      let size = q.length;

      while (size--) {
        // get our current state
        let currentState = q.shift();
        // mark the no of steps taken to reach the currentState (it is always the least steps)
        memo[currentState[0]][currentState[1]] = steps;
        if (currentState[0] === start[0] && currentState[1] === start[1]) {
          // means we reached our goal

          let total_moves = steps;
          return { path, total_moves };
        }
        // explore potential positions and mark them
        for (let move of moves) {
          // first we check whether it is an allowed move (or will it make us go out of bounds)
          if (allowedMove(currentState, move)) {
            // if it is an allowed move, we get the state after we have moved
            let newState = changeState(currentState, move);

            // if this state is explored, we skip it
            if (memo[newState[0]][newState[1]] !== -1) continue;
            // otherwise, we add it to the queue
            q.push(newState);
            // also, we store the state that led to the newState in path
            path[newState.toString()] = currentState;
          }
        }
      }
      // with each layer, steps taken increase by 1
      steps++;
    }
  }

  function output(path, total_moves, start, end) {
    // outputs optimal move when optimal path is found
    let statement = `You made it in ${total_moves} moves! Here's your path:`;

    while (start[0] !== end[0] || start[1] !== end[1]) {
      statement += `\n[${start.toString()}]`;
      start = path[start.toString()];
    }
    statement += `\n[${start.toString()}]`;
    console.log(statement);
    return statement;
  }

  const { path, total_moves } = search(start, end);
  output(path, total_moves, start, end);
}

KnightMoves([3, 3], [4, 3]);
