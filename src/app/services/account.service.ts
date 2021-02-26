import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GeneralResponse } from '../models/GeneralResponse';
import { UserData } from '../models/UserData';

@Injectable({ providedIn: 'root' })
export class AccountService {
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

    login(username, password) {
        return this.http.post<GeneralResponse>(`${environment.apiUrl}/sec/login`, { Name: username, Password: password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: UserData) {
        return this.http.post(`${environment.apiUrl}/sec/user/add`, user);
    }

    getAll(user:string) {
        return this.http.get<GeneralResponse>(`${environment.apiUrl}/sec/user/getAll/${user}`);
    }

    getById(id: string) {
        return this.http.get<GeneralResponse>(`${environment.apiUrl}/sec/user/getUserById/${id}`);
    }

    update(id, user:UserData) {
        return this.http.put(`${environment.apiUrl}/sec/user/update`, {Id: parseInt(user.Id)
            ,Password: user.Password
            ,Email: user.Email})
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.Data.Id) {
                    // update local storage
                    const userl = { ...this.userValue, ...user };
                    localStorage.setItem('user', JSON.stringify(userl));

                    // publish updated user to subscribers
                    this.userSubject.next(userl);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/sec/user/delete/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.Data.Id) {
                    this.logout();
                }
                return x;
            }));
    }
}