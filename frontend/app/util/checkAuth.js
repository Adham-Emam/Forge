import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";

const checkAuth = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export default checkAuth;
