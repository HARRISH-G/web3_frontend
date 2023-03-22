import { SIGNOUT } from "../actiontypes/Types";

const UserSignOut = () => async (dispatch) => {
  try {
    const token = sessionStorage.setItem("token", "n");
    const email = sessionStorage.setItem("email", "n");
    const username = sessionStorage.setItem("username", "n");
    const userdata = {
      email: email,
      token: token,
      username: username,
    };
    dispatch({ type: SIGNOUT, payload: userdata });
    return userdata;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export default UserSignOut;
