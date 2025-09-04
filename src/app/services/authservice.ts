import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 import {jwtDecode} from 'jwt-decode';
 localStorage
export interface DecodedToken {
  id: number;
  email: string;
  exp: number;
  iat: number;
  username: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})

export class Authservice {

  private avatarKey = 'auth_avatar_key'  
  private tokenKey = 'auth_token';
  private tokenExpiryKey = 'token_expires_at'

  constructor(private router: Router) { }
   getDecodedToken(): DecodedToken | null {
    const token = localStorage.getItem(this.tokenKey); 
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  

  getUserId(): number | null {
    const decoded = this.getDecodedToken();
    return decoded?.id ?? null;
  }

   getUsername(): string | null {
    const decoded = this.getDecodedToken();
    
    return decoded?.username ?? null;
  }

  setAvatar(avatar: string){
    localStorage.setItem(this.avatarKey, avatar)
  }

  getAvatar(){
    const avatar = localStorage.getItem(this.avatarKey)
    return 
  }



  setToken(token: string): void {
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour in ms
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.tokenExpiryKey, expiresAt.toString());
  }

  // Get the stored token
  getToken(): string | null {
    if (this.isTokenExpired()) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  // Check if token is expired
  isTokenExpired(): boolean {
  const expiry = localStorage.getItem(this.tokenExpiryKey);
  if (!expiry) return true;

  const isExpired = Date.now() > parseInt(expiry, 10);

  if (isExpired) {
    this.logout(); // only logout if expired
  }

  return isExpired;
}


  // Is user logged in (and token valid)?
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Clear token and expiry
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpiryKey);
  }

 
}