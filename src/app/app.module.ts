import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorformComponent } from './vendorform/vendorform.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from './vendor.service';

@NgModule({
  declarations: [AppComponent, VendorformComponent, VendorlistComponent],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule,AppRoutingModule, HttpClientModule],
  providers: [VendorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
