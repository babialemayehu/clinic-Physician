import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug } from '../model/Drug';
import { Prescription } from '../model/Prescription';
import { Drug_frequency } from '../model/Drug_frequency';
import { Drug_root } from '../model/Drug_root';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private _http: HttpClient) { }
  private $root: string = "http://clinic/"; 

  drugAutoComplet(key: string): Observable<Drug[]>{
    const URL = this.$root+"ajax/get/pharmacy/drug/search/auto/"+key; 
    return this._http.get<Drug[]>(URL); 
  }

  prescribe(hisstroy_id, prescriptions): Observable<Prescription[]>{
    const URL = this.$root+"ajax/post/pharmacy/prescription/prescribe/"+hisstroy_id; 
    return this._http.post<Prescription[]>(URL, {prescriptions: prescriptions}); 
  }

  getFrequencies():Observable<Drug_frequency[]>{
    const URL = this.$root+"ajax/get/pharmacy/drug/frequencies"; 
    return this._http.get<Drug_frequency[]>(URL); 
  }

  getRoots():Observable<Drug_root[]>{
    const URL = this.$root+"ajax/get/pharmacy/drug/roots"; 
    return this._http.get<Drug_root[]>(URL); 
  }
}
