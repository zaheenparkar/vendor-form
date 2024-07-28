import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:3000/api/vendors';

  constructor(private http: HttpClient) {}

  submitForm(formData: any) {
  return this.http.post(`${environment.apiUrl}`, formData);
}

  // Save vendor data
  saveVendorData(vendor: any): Observable<any> {
    return this.http.post(this.apiUrl, vendor).pipe(
      catchError(this.handleError)
    );
  }

  // Get all vendors
  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Delete vendor by ID
  deleteVendor(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
