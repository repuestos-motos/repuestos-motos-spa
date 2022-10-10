import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../interface/user';
import { Client } from '../interface/client';

@Injectable({
  providedIn: 'root',
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
   * Key to store the user information in local storage
   */
  private _localStorageKey: string = 'userInfo';

  /**
   * Object that contains the user information
   */
  private _userInformation: User;

  /**
   * Object that contains the selected client information
   */
  private _selectedClient: Client | undefined;

  constructor(private apiService: ApiService) {
    this.loadStoredUserInformation();
  }

  loadStoredUserInformation() {
    const lsValue = localStorage.getItem(this._localStorageKey);
    if (lsValue) {
      const value = JSON.parse(decodeURIComponent(window.atob(lsValue)));
      this._accessToken = value.accessToken;
      this._userInformation = value.userInformation as User;
      this._selectedClient = value.selectedClient ? value.selectedClient as Client : undefined;
      this._isAuthenticated = this._accessToken ? true : false;
    }
  }

  storeUserInformation() {
    if (this.isAuthenticated()) {
      const value = window.btoa(
        encodeURIComponent(
          JSON.stringify(
            {
              userInformation: this._userInformation,
              accessToken: this._accessToken,
              selectedClient: this._selectedClient
            }
          )
        )
      );
      localStorage.setItem(this._localStorageKey, value);
    }
  }

  removeStoredUserInfromation() {
    localStorage.clear();
  }

  public setSelectedClient(client: Client | undefined) {
    this._selectedClient = client;
    this.storeUserInformation();
  }

  public getSelectedClient() {
    return this._selectedClient;
  }

  /**
   * Method to get the current access token
   * @returns string with the current access token
   */
  public getAccessToken(): string {
    return this._accessToken;
  }

  /**
   * Method to get the current access token
   * @returns string with the current access token
   */
  public setAccessToken(token: string | null) {
    this._accessToken = token || '';
    this.storeUserInformation();
  }

  /**
   * @returns boolean indicating wheter the user is autenticated
   */
  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  /**
   * @returns Boolean indicanting if the user is seller or not
   */
  public isSeller(): boolean {
    return this._userInformation.isSeller;
  }

  /**
   * Method to know if the user has authentication info so we can check its status then
   * @returns Boolean that inicates if there is a token and user information
   */
  public hasAuthInformation() {
    return this._accessToken && this._userInformation;
  }

  public getUserInfo(): User {
    return this._userInformation;
  }

  /**
   * Method to call the login endpoint
   * @param userName User name
   * @param password Password
   * @returns Observable of the user login endpoint call
   */
  public login(userName: string, password: string) {
    return this.apiService
      .post('authentication/login', { userName, password })
      .pipe(
        map((response: any) => {
          this._isAuthenticated = true;
          this._userInformation = response as User;
          this.storeUserInformation();
          return response;
        })
      );
  }

  /**
   * @param userName 
   * @param password 
   */
  public sellerLogin(userName: string, password: string) {
    return this.apiService
      .post('authentication/seller-login', {userName, password})
      .pipe(
        map((response: any) => {
          this._isAuthenticated = true;
          this._userInformation = response as User;
          this.storeUserInformation();
          return response;
        })
      );
  }

  public logout() {
    this._isAuthenticated = false;
    this.setAccessToken(null);
    this.removeStoredUserInfromation();
  }

  /**
   * Method to call API to check auth status
   * @returns Observable of the status API call
   */
  public checkAuthenticationStatus() {}
}
