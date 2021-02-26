import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralResponse } from '../models/GeneralResponse';


@Injectable({
  providedIn: 'root'
})
export class GeneralTablesService {

  constructor(private http: HttpClient) {
  }

  getAllTiposDocumento() {
    return this.http.get<GeneralResponse>(`${environment.apiUrl}/gen-tables/getAllTipoDoc`);
  }

  // getAllEstados() {
  //   return this.http.get<GeneralResponse>(`${environment.apiUrl}/gen-tables/getAllEstadosTablas`);
  // }

}
