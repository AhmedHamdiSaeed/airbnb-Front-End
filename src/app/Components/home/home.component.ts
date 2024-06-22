import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { AuthService } from '../../Services/UserServices/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
}
