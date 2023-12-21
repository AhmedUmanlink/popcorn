import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from '../env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private env = ENV;

  constructor(private http: HttpClient) {}

  // Step 1: Get a request token
  getRequestToken(): Observable<any> {
    const url = `${this.env.baseUrl}/authentication/token/new?api_key=${this.env.api_key}`;
    return this.http.get(url);
  }

  // Step 2: Login with shared credentials using the request token
  loginSharedCredentials(requestToken: string,username:string,password:string): Observable<any> {
    const url = `${this.env.baseUrl}/authentication/token/validate_with_login?api_key=${this.env.api_key}`;
    const body = {
      username : username,
      password:password,
      request_token: requestToken,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, body, { headers });
  }

  // Step 3: Create a new session with the validated request token
  createSession(requestToken: string): Observable<any> {
    const url = `${this.env.baseUrl}/authentication/session/new?api_key=${this.env.api_key}`;
    const body = { request_token: requestToken };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, body, { headers });
  }

  getAccountDetails(sessionId: string): Observable<any> {
    const url = `${this.env.baseUrl}/account`;
    const params = {
      api_key: this.env.api_key,
      session_id: sessionId,
    };
  
    return this.http.get(url, { params });
  }
}
