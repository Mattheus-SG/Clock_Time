import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public tokenMain : string = "ngToken";

  setTokenLocal(token : string) : void{
    localStorage.setItem(this.tokenMain, token);
  }

  getTokenLocal(): string {
    var token = localStorage.getItem(this.tokenMain) || ''; 
    console.log("TOKEN", token);
    return token; 
  }

  getDecodedAccessToken(): any {
    try {
      var token = this.getTokenLocal();
      console.log("DECODE: ", token)
      var tokenDecode = jwtDecode(token);
      console.log(tokenDecode)
      return jwtDecode(token);
    } catch(Error) {
      console.log
      return null;
    }
  }

  hasToken(): boolean {
    return localStorage.getItem(this.tokenMain) !== null;
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenMain);
  }

  getUserFromToken(): UserPayload | null {
    const token = this.getTokenLocal();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return {
          id: decoded['nameid'] || '',
          name: decoded['name'].toUpperCase() || '', 
          role: decoded['role'] || ''
        };
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }


}

interface UserPayload {
  id: string;
  name: string;
  role: string;
}

