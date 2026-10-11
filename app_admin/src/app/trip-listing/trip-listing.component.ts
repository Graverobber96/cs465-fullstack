
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {

  trips: Trip[] = [];

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
        console.log('Trips loaded:', data);
      },
      error: (error) => {
        console.error('Error loading trips:', error);
      }
    });
  }
}
