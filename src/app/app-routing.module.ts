import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorformComponent } from './vendorform/vendorform.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';

const routes: Routes = [
  { path: 'vendor-form', component: VendorformComponent },
  { path: 'vendor-list', component: VendorlistComponent },
  { path: '', redirectTo: '/vendor-form', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
