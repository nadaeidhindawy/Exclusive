import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private _HttpClient: HttpClient) { }

  getAllBrand(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }

  getSpecificBrand(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`)
  }

}
