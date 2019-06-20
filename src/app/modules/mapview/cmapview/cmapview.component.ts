import { Component, OnInit } from '@angular/core';
import { PMapService } from 'src/app/services/p-map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cmapview',
  templateUrl: './cmapview.component.html',
  styleUrls: ['./cmapview.component.css']
})
export class CmapviewComponent implements OnInit {

  private myMarker: Marker[];
  private zoom: number=12;
  private mapdata:any;
  private lonLat:number = 51.5194126;
  private lonLog:number = -0.10627840000006472;
  private selectedVenue: any;
  private venueSubScribe: Subscription;
  private venueListSubScribe: Subscription;
  openedWindow : number = 0; 
  constructor(private  mpService: PMapService) { }

  ngOnInit() {
    this.venueListSubScribe=this.mpService.getMapData().subscribe((mapJson)=>{
        this.myMarker=mapJson;
        
        });
    this.venueSubScribe=this.mpService.selectedVenue.subscribe((selectedVenue)=>{
      this.selectedVenue=selectedVenue;
      this.selectedVenue.zIndex=2;
      this.selectedVenue.isClicked=false;
      
      if(this.myMarker!=undefined){
        this.myMarker.forEach((el,i)=>{
          if(el.name==selectedVenue.name){
            this.myMarker[i].isClicked=!this.myMarker[i].isClicked;
            this.myMarker[i].zIndex=22;
           
        }
        })
      }
     
    });
    
  }
  clickedMarker(markerObj) {
    markerObj.isClicked=!markerObj.isClicked;
    this.selectedVenue= markerObj; 
   // this.mpService.changeVenue( this.selectedVenue);
   

   }

   

    openWindow(id) {
        this.openedWindow = id; 
    }

    isInfoWindowOpen(id) {
        return this.openedWindow == id; 
    }


   ngOnDestroy(){
    this.selectedVenue=null;
    this.venueSubScribe.unsubscribe();
    this.venueListSubScribe.unsubscribe();
  }

}


class Marker{
  id: number;
  lat: number;
	longi: number;
  draggable: boolean;
  name:string;
  countryFullName:string;
  city:string;
  currency: number;
  url: string;
  visible:boolean=true;
  isClicked:boolean;
  maxParticipants: number;
  zIndex: number=1;
 


}
