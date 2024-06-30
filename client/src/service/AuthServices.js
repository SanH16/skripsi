import Cookies from "js-cookie";

export class AuthService {
  isAuthorized() {
    // const sessionId = this.getSessionId();
    // if (sessionId !== null && sessionId !== undefined && sessionId !== "") {
    //   return true;
    // } else {
    //   return false;
    // }
    // return !!sessionId;

    // if (this.getToken()) {
    //   return true;
    // }
    // return false;

    try {
      const token = Cookies.get("token");
      if (!token) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  validateToken() {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // storeSessionIdToCookie(sessionId) {
  //   Cookies.set("token", sessionId, {
  //     secure: false,
  //     sameSite: "strict",
  //   });
  //   console.log("Session ID stored in cookie:", sessionId);
  // }

  // getSessionId() {
  //   const sessionId = Cookies.get("token");
  //   if (sessionId) {
  //     console.log("Session ID retrieved from cookie:", sessionId);
  //     return sessionId;
  //   } else {
  //     return null;
  //   }
  // }

  // getTokenSession() {
  //   Cookies.get("token");
  // }

  clearSessionIdFromCookie() {
    Cookies.remove("token");
  }

  getToken() {
    if (this.validateToken()) {
      return Cookies.get("token");
    }
    return false;
  }
}
