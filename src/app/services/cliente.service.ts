import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GeneralResponse } from '../models/GeneralResponse';
import { UserData } from '../models/UserData';
import { Cliente } from '../models/Cliente';
import { GeneralFilter } from '../models/GeneralFilter';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    private userSubject: BehaviorSubject<GeneralResponse>;
    public user: Observable<GeneralResponse>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<GeneralResponse>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): GeneralResponse {
        return this.userSubject.value;
    }

    addNew(cliente: Cliente) {
        return this.http.post(`${environment.apiUrl}/customer/add`, cliente);
    }

    getFiltered(filter: GeneralFilter) {
        return this.http.post<GeneralResponse>(`${environment.apiUrl}/customer/getFiltered`, filter);
    }

    getClientePorDocumento(documento:string){
        return this.http.get<GeneralResponse>(`${environment.apiUrl}/customer/getByDocument/${documento}`);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/customer/delete/${id}/${this.user}`)
          .pipe(map(x => {
            return x;
        }));
    }

}