
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
  const token = sessionStorage.getItem('travlr-token');

  return new HttpHeaders({
    Authorization: token ? `Bearer ${token}` : ''
  });
}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }
  
addTrip(trip: Trip): Observable<Trip> {
  return this.http.post<Trip>(
    `${this.apiBaseUrl}/trips`,
    trip,
    { headers: this.getAuthHeaders() }
  );
}

getTrip(tripCode: string): Observable<Trip> {
  return this.http.get<Trip>(
    `${this.apiBaseUrl}/trips/${tripCode}`
  );
}

updateTrip(trip: Trip): Observable<Trip> {
  return this.http.put<Trip>(
    `${this.apiBaseUrl}/trips/${trip.code}`,
    trip,
    { headers: this.getAuthHeaders() }
  );
}
}
