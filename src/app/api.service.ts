import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from './environments/environment.prod'
import { Authservice } from './services/authservice';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl
  private http = inject(HttpClient);
  constructor(private authService: Authservice){}



  registerUser(myData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/users/registerUser`, {myData})
  }

  loginUser(myData:any): Observable<any> {
    const token = this.authService.getToken()
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post(`${this.apiUrl}/users/loginUser`,{myData},{headers})
  }

  fetchUserProfile(): Observable<any>{
     const token = this.authService.getToken()
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get(`${this.apiUrl}/users/fetchUserProfile`,{headers})

  }

  updateUserProfileDp(avatar: string | null, username: string | null): Observable<any> {
    const token = this.authService.getToken()   
    const headers = new HttpHeaders({'authorization': `Bearer ${token}`})      
    return this.http.patch(`${this.apiUrl}/users/updateUserProfileDp`, {avatar, username},{headers})

  }

  deleteAccount(password: string): Observable<any> {
  const token = this.authService.getToken()
  return this.http.delete(`${this.apiUrl}/users/deleteAccount`,{body:{password},
  headers: {
      Authorization: `Bearer ${token}`

  }})}

  sendNotification(notification: any): Observable<any>{

     const token = this.authService.getToken()
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post(`${this.apiUrl}/users/notification`, {notification},{headers})
  }


  getNotification(): Observable<any> {
    const userId = this.authService.getUserId()
    if (!userId) { 
    throw new Error('User ID is undefined'); 

    } 
    return this.http.get(`${this.apiUrl}/users/fetchNotification`, {
    params: {userId}
  });
}


markAsRead(notificationId: number): Observable<any> {
const token = this.authService.getToken()
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`})
  return this.http.patch(`${this.apiUrl}/users/markAsRead`, {notificationId},{headers})
}

isFavorited(hasFavoirted:boolean): Observable<any> {
  const token = this.authService.getToken()   
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/users/isFavorited`,{headers});
}

toggleFavorite(hasFavorited: boolean): Observable<any> {
   const token = this.authService.getToken()   
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post(`${this.apiUrl}/users/toggle`,{ hasFavorited }, {headers});
}



}






