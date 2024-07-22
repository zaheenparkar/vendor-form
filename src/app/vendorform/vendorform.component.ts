import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendorform',
  templateUrl: './vendorform.component.html',
  styleUrls: ['./vendorform.component.scss']
})
export class VendorformComponent {
 vendor = {
    name: '',
    email: '',
    phone: '',
    firmname: '',
    address: '',
    designation: '',
    GSTNumber: '',
    outlets: null,
    onlinepresence: '',
    platforms: '',
    feedback: ''
  };

  constructor(private vendorService: VendorService, private router: Router) {}

  onSubmit() {
      if (this.vendor.onlinepresence === 'Yes' && !this.vendor.platforms) {
    this.vendor.platforms = ''; // Ensure platforms is initialized if onlinepresence is 'Yes'
  }

    this.vendorService.saveVendorData(this.vendor).subscribe(
      response => {
        console.log('Form submission successful:', response);
        this.router.navigate(['/vendor-list']); // Navigate to the vendor list page
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }
}
