import Cookies from "js-cookie";

export class AuthService {
  isAuthorized() {
    const sessionId = this.getSessionId();
    if (sessionId !== null && sessionId !== undefined && sessionId !== "") {
      return true;
    } else {
      return false;
    }
  }

  storeSessionIdToCookie(sessionId) {
    Cookies.set("connect.sid", sessionId, {
      secure: false,
      sameSite: "strict",
    });
    console.log("Session ID stored in cookie:", sessionId);
  }

  getSessionId() {
    const sessionId = Cookies.get("connect.sid");
    if (sessionId) {
      console.log("Session ID retrieved from cookie:", sessionId);
      return sessionId;
    } else {
      return null;
    }
  }

  clearSessionIdFromCookie() {
    Cookies.remove("connect.sid");
  }

  getToken() {
    return this.getSessionId();
  }
}
