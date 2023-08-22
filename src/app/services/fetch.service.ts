import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private _http: HttpClient) {}

  addAgniveer(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/agniveers', data);
  }

  updateAgniveer(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/agniveers/${id}`, data);
  }

  getAgniveerList(): Observable<any> {
    return this._http.get('http://localhost:3000/agniveers');
  }

  deleteAgniveer(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/agniveers/${id}`);
  }

  getAgniveerById(id:number): Observable<any> {
    return this._http.get(`http://localhost:3000/agniveers/${id}`);
  }

  getOffrById(id:number): Observable<any> {
    return this._http.get(`http://localhost:3000/offr/${id}`);
  }

  getAdmById(id:string): Observable<any> {
    return this._http.get(`http://localhost:3000/adm/${id}`);
  }

  addOffr(data:any): Observable<any> {
    return this._http.post('http://localhost:3000/offr', data);
  }

  getOffrList():Observable<any> {
    return this._http.get('http://localhost:3000/offr');
  }

  updateOffr(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/offr/${id}`, data);
  }

  deleteOffrById(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/offr/${id}`);
  }
}
