import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  /**
   * Method to know if the user has authentication info so we can check its status then
   * @returns Boolean that inicates if there is a token and user information
   */
  public hasAuthInformation() {
    return this._accessToken && this._userInformation;
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

  /**
   * Method to call API to check auth status
   * @returns Observable of the status API call
   */
  public checkAuthenticationStatus() {

  }
}
