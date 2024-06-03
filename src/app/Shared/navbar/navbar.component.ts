import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}

  navBarStatus: boolean = false;

  showNavBar() {
    this.navBarStatus = true;
  }
  closeNavBar() {
    this.navBarStatus = false;
  }
}
