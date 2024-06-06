import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  constructor(private service: ProfileservicesService) {}

  ngOnInit(): void {
    this.LoadData();
  }
  LoadData() {
    this.service.loaddata().subscribe((result) => {
      console.log(result);
    });
  }
}
