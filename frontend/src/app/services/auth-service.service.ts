import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {gql} from 'apollo-angular';
import {LoginModel} from '../models/login.model';
import {RegisterModel} from '../models/register.model';
import {LoginResponseModel} from '../models/LoginResponse.model';
import {RegisterResponseModel} from '../models/RegisterResponse.model';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {


  private apiUrl = 'https://localhost:7188/api/auth';

  constructor(private http: HttpClient) {

  }

  homePageErrorMessage: string = "";
  currentToken: string | null = "";

  /*
  REGISTER_USER: any = gql`
    mutation RegisterUser($registerData: RegisterInput!) {
      registerUser(registerData: $registerData) {
        status
        message
      }
    }
  `;

  LOGIN_USER: any = gql`
    mutation LoginUser ($loginData: LoginInput!){
      loginUser(loginData: $loginData) {
        token
        status
        message
      }
    }
  `;
   */

  currentUserId: string = "";

  emptyLogin: LoginModel = {
    usernameOrEmail : '',
    password: ''
  }

  loginData: LoginModel = this.emptyLogin;

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/get-users`);
  }

  loginUser(loginData: LoginModel) {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  registerUser(registerData: RegisterModel) {
      return this.http.post<RegisterResponseModel>(`${this.apiUrl}/register` , registerData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');

  }

  removeToken(): void {
    return localStorage.removeItem('token');

  }
  getCurrentUserId() {

    const body = {
      token: this.currentToken
    };

    return this.http.post<string>(`${this.apiUrl}/get-userid`, body);
  }


   // Überprüfen, ob der Token gültig ist
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // Kein Token vorhanden
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Aktuelle Zeit in Sekunden
      return decodedToken.exp > currentTime; // Ist der Token gültig?
    } catch (error) {
      console.error('Ungültiger Token:', error);
      return false;
    }
  }




}

