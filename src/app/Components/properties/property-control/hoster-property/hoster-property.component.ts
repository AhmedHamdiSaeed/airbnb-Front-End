import { Component, OnInit } from '@angular/core';
import { ProperiesService } from '../../../../Services/PropertyServices/properies.service';
import { PropControlService } from '../prop-control.service';
import { Property } from '../../../../Models/PropertyModels';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hoster-property',
  templateUrl: './hoster-property.component.html',
  styleUrl: './hoster-property.component.css',
})
export class HosterPropertyComponent implements OnInit {
  constructor(
    private propertyService: ProperiesService,
    private activeRouter: ActivatedRoute,
    private propertyControlService: PropControlService
  ) {}

  // ---------------------------------------------------

  selectProperty(item: Property) {
    localStorage.setItem('selectedProperty', JSON.stringify(item));
    localStorage.setItem('selectedPropertyId', JSON.stringify(item.id));
  }
  // ---------------------------------------------------
  /**
   *
   */
  ngOnInit(): void {
    this.GetAllHosterProperties();
  }
  // GetAllHosterProperties
  hosterProperties: Property[];
  GetAllHosterProperties() {
    this.propertyControlService
      .GetAllHosterProperties()
      .subscribe((result: Property[]) => {
        this.hosterProperties = result;
        console.log(this.hosterProperties);
      });
  }
}
