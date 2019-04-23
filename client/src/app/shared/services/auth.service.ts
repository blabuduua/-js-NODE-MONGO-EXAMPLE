import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    register() {}

    login(user: User):Observable<{token: string}> {
        return this.http.post<{token: string}>('http://localhost:3000/api/auth/login', user)
    }
}