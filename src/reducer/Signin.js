import { SIGNIN, SIGNOUT } from "../actiontypes/Types";

const userToken = (
  state = {
    token: sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : "",
    username: sessionStorage.getItem("username")
      ? sessionStorage.getItem("username")
      : "",
    email: sessionStorage.getItem("email")
      ? sessionStorage.getItem("email")
      : "",
  },
  action
) => {
  console.log("acti token", action.payload);

  switch (action.type) {
    case SIGNIN:
      return { ...state, state: action.payload };
    case SIGNOUT:
      return { ...state, state: action.payload };
    default:
      return state;
  }
};

export default userToken;
