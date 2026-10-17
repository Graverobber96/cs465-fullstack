import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../trip';


@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})

export class EditTripComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tripDataService: TripDataService
  ) {
    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
    }
    
ngOnInit(): void {
  const tripCode = localStorage.getItem('tripCode');

  if (tripCode) {
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        this.editForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: trip.start.substring(0, 10),
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description
        });
      },
      error: (error) => {
        console.error('Error loading trip:', error);
      }
    });
  }
}

onSubmit(): void {
  if (this.editForm.valid) {
    const updatedTrip: Trip = this.editForm.value;

    this.tripDataService.updateTrip(updatedTrip).subscribe({
      next: (result) => {
        console.log('Trip updated successfully:', result);
        alert('Trip updated successfully!');
      },
      error: (error) => {
        console.error('Error updating trip:', error);
        alert('Unable to update trip. Please check the console.');
      }
    });
  } else {
    this.editForm.markAllAsTouched();
    console.log('Please complete all required fields.');
  }
}
}




