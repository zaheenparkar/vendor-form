// vendorlist.component.ts
import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.scss']
})
export class VendorlistComponent implements OnInit {
  vendors: any[] = [];
right: any;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.getVendors();
  }

 getVendors(): void {
    this.vendorService.getVendors().subscribe(data => {
      this.vendors = data;
        console.log('Vendors data:', this.vendors);
      },
      error => {
        console.error('Error fetching vendors:', error);
      }
    );
  }

}
