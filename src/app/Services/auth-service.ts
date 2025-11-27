import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Studentprofile } from '../models/studentprofile';
import { Register } from '../components/register/register';
import { Authresponse } from '../models/authresponse';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5163/api'; 
  private tokenKey = 'access_token';
  private userKey = 'current_user';


  private currentUserSubject = new BehaviorSubject<Studentprofile | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(private http: HttpClient) { }


  register(data:Register):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.apiUrl}/Account/register`,data)
    .pipe(tap
      (response=>{
        if(response.success && response.token){
           this.saveToken(response.token.accessToken);
            this.saveUser(response.data);
            this.currentUserSubject.next(response.data);
            this.isAuthenticatedSubject.next(true);

        }

      })
    );

  }
  
  login(data:Login): Observable<Authresponse> {
    return this.http.post<Authresponse>(`${this.apiUrl}/Account/login`, data).pipe(
        tap(response => {
          if (response.success && response.token) {
            this.saveToken(response.token.accessToken);
            this.saveUser(response.data);
            this.currentUserSubject.next(response.data);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

logout(): Observable<any> {
  return this.http.post(`${this.apiUrl}/Account/logout`, {}).pipe(
    tap(() => {
      this.removeToken();
      this.removeUser();
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    })
  );
}

removeToken() {
  localStorage.removeItem(this.tokenKey);
}

removeUser() {
  localStorage.removeItem(this.userKey);
}


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private saveUser(user: Studentprofile): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getUserFromStorage(): Studentprofile | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }
  // 👇👇 إضافة جديدة
  get currentUser(): Studentprofile | null {
    return this.currentUserSubject.value;
  }

  // 👇👇 Getter للـ userId (عدّل اسم الخاصية حسب Studentprofile)
  get currentUserId(): string | null {
    // لو Studentprofile فيه id:
  return this.currentUserSubject.value?.userId ?? null;
    // لو فيه studentId أو userId غيّر للسطر اللي يناسبك:
    // return this.currentUserSubject.value?.studentId ?? null;
    // return this.currentUserSubject.value?.userId ?? null;
  }


}
