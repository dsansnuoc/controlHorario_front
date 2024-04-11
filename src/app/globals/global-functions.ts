export class GlobalFunctions {
  public static isLogin(): boolean {
    let token = sessionStorage.getItem('access_token');
    if (token === null) {
      return false;
    } else {
      return true;
    }
  }
}
