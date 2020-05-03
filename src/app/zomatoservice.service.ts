import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZomatoserviceService {
  arryy : Array<any> = [];
  zomatoAPIkey: string;
  

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>('./assets/env/env.json').subscribe((data) =>{
      this.zomatoAPIkey= data['zomato_api'];

    },
    error =>{
      console.log("error of zomato api extraction");
    }
      );
   
   }

  searchloacationName(place : string): Observable<any> {

    return this.httpClient.get<any>(`https://developers.zomato.com/api/v2.1/cities?q=${place}`, {
      headers: new HttpHeaders().set('user-key', `${this.zomatoAPIkey}`)
 });
    
}



  searchresturantsById(place_id: number) {

    return this.httpClient.get<any>(`https://developers.zomato.com/api/v2.1/search?entity_id=${place_id}&entity_type=city&count=5`, {
      headers: new HttpHeaders().set('user-key', `${this.zomatoAPIkey}`)
 });
  }

  get_array_all( )  {
    return this.arryy;
  }
  setVisitedIdToken(token: string, data:any ) {
    this.arryy = data;

    localStorage.setItem('set_id', token);

  }
  getVisitedIdToken(){
    return localStorage.getItem('set_id');
  }

}
