import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Token() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const cookies = Cookies.get("access_token");

    if (cookies) {
      const decoded = jwtDecode(cookies);
      setToken(decoded.userID);
    }
  }, [token]);

  return token;
}

// Export the decoded token along with the component
export const DecodedToken = Token;
