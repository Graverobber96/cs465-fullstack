
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  addForm: FormGroup;

 constructor(
  private formBuilder: FormBuilder,
  private tripDataService: TripDataService
) {
    this.addForm = this.formBuilder.group({
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
  
  
onSubmit(): void {
  if (this.addForm.valid) {
    const newTrip: Trip = this.addForm.value;

    this.tripDataService.addTrip(newTrip).subscribe({
      next: (result) => {
        console.log('Trip saved successfully:', result);
        alert('Trip saved successfully!');
        this.addForm.reset();
      },
      error: (error) => {
        console.error('Error saving trip:', error);
        alert('Unable to save trip. Please check the console.');
      }
    });
  } else {
    this.addForm.markAllAsTouched();
    console.log('Please complete all required fields.');
  }
}
}
