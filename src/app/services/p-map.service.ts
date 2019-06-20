import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PMapService {

  private baseUrl="http://localhost:8080/venue/venues";
  private venueSource= new BehaviorSubject(Object);
  private searchSource= new BehaviorSubject(Object);
   venueList=new Observable<any>();
   selectedVenue= this.venueSource.asObservable();
   searchList= this.searchSource.asObservable();
  constructor(private http: HttpClient) { 

  }

  public changeVenue(selectedV:any){
    this.venueSource.next(selectedV);
  }
  public getMapData(): Observable<any> {
    this.venueList=this.http.get(this.baseUrl);
    return this.venueList;
  } 
  public changeSearch(searchedVenue:any){
    this.searchSource.next(searchedVenue);
  }


}
