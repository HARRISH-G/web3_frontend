import { GAMEID } from "../actiontypes/Types";

const GameiD = (
  state = {
    gameId: sessionStorage.getItem("gameId")
      ? sessionStorage.getItem("gameId")
      : null,
  },
  action
) => {
  console.log("state gameid", action);
  switch (action.type) {
    case GAMEID:
      return action.payload;

    default:
      return state;
  }
};

export default GameiD;
