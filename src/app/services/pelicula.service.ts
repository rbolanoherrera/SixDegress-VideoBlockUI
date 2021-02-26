import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GeneralResponse } from '../models/GeneralResponse';
import { Pelicula } from '../models/Pelicula';
import { GeneralFilter } from '../models/GeneralFilter';

@Injectable({ providedIn: 'root' })
export class PeliculaService {
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

    addNew(pelicula: Pelicula) {
        return this.http.post(`${environment.apiUrl}/peli/add`, pelicula);
    }

    getFiltered(filter: GeneralFilter) {
        return this.http.post<GeneralResponse>(`${environment.apiUrl}/peli/getFiltered`, filter);
    }


}