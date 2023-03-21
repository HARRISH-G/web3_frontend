// import jwtDecode from "jwt-decode";
// import jwt from "jwt-decode";
// export const GetDecodedToken = () => {
//   try {
//     let gettoken = localStorage.getItem("token");
//     console.log("main", gettoken);
//     console.log("ASDFASd", typeof gettoken);
//     let tok = jwt(gettoken);
//     console.log("dec token", tok);
//     let token;
//     // let token = window.sessionStorage.getItem("token");
//     if (gettoken) {
//       // let user_object = gettoken;
//       console.log("Tt", gettoken);

//       let DecodedToken = jwtDecode(gettoken);
//       console.log("decode", DecodedToken);

//       return token;
//     } else {
//       console.log("Token Not Found");
//       return false;
//     }
//   } catch (error) {
//     console.log("ERR", error);
//   }
// };

// export const ValidateToken = () => {
//   try {
//     const DecodedToken = GetDecodedToken();
//     if (DecodedToken) {
//       let currentDate = new Date();
//       console.log("exptime", DecodedToken.exp);
//       if (DecodedToken.exp * 1000 * 60 < currentDate.getTime()) {
//         // window.location.reload();
//         console.log("Token Expired");
//         return false; //Token Expired
//       } else {
//         return true; //Token Not Expired
//       }
//     } else {
//       console.log("Token NotFound");
//       return false;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
import axios from "axios";
export const ValidateToken = async () => {
  console.log("check token");
  try {
    let token = sessionStorage.getItem("token");
    let currentDate = new Date();
    await axios({
      method: "get",
      url: "https://booboo-login.kryptofam.com/users/token_validity",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("token val", res);
      if (!(res.data.code === "success" && res?.data?.data?.is_valid)) {
        sessionStorage.setItem("token", "");
        return false;
      } else {
        return true;
      }
    });
  } catch (error) {
    console.log("cathch", error);
    if (error) {
      sessionStorage.setItem("token", "");
      return false;
    }
  }
};
