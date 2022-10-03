import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private backendUrl: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  public getBackendUrl(): string {
    return this.backendUrl;
  }

  public get(route: string, queryParameters?: any) {
    return this.http.get(this.backendUrl + route, { params: queryParameters });
  }


  public post(route: string, body?: any) {
    return this.http.post(this.backendUrl + route, body);
  }
}
