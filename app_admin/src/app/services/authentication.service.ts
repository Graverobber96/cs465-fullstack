import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap(response => {
        sessionStorage.setItem('travlr-token', response.token);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('travlr-token');
  }
}