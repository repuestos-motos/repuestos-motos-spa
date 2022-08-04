import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * JWT to access API resources
   */
  private _accessToken: string = '';

  /**
   * Boolean value that indicates when the user is autenticated
   */
  private _isAuthenticated: boolean = false;

  /**
   * Object that contains the user information 
   */
  private _userInformation: any = null;

  constructor() { }

  /**
   * Method to get the current access token
   * @returns string with the current access token
   */
  public getAccessToken() {
    return this._accessToken;
  }

  /**
   * Method to know if the user has logged in
   * @returns boolean indicating wheter the user is autenticated
   */
  public isAuthenticated() {
    return this._isAuthenticated;
  }

  public getUserInfo() {
    return this._userInformation;
  }

  /**
   * Method to call the login endpoint
   * @param userName User name
   * @param password Password
   * @returns Observable of the user login endpoint call 
   */
  public login(userName: string, password: string) {

  }
}
