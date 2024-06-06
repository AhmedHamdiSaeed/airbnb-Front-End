import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from '../../../Services/UserServices/profileservices.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent implements OnInit {
  /**
   *
   */
  constructor(private service: ProfileservicesService) {}
  ngOnInit(): void {}
}
