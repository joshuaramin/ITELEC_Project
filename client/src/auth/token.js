import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export default function Token() {
   const token = Cookies.get("access_token");

   const decodedToken = jwtDecode(token);

   return decodedToken.userID;
}
