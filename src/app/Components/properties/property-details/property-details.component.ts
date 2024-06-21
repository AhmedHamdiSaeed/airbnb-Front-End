import { Component, Input, OnInit } from '@angular/core';
import { ProperiesService } from '../../../Services/PropertyServices/properies.service';
import { RootDetails } from '../../../Models/PropertyDetials';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent implements OnInit {
  /**
   *
   */
  constructor(
    private service: ProperiesService,
    private route: ActivatedRoute
  ) {}

  dataDetails: RootDetails;
  IdNumber: number;
  // GetPropertyDetailsById ------------------
  GetPropertyDetailsById(id: number) {
    this.service.GetPropertyDetailsById(id).subscribe((result: RootDetails) => {
      this.dataDetails = result;
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.IdNumber = params['id'];
    });
    this.GetPropertyDetailsById(this.IdNumber);
  }
}
