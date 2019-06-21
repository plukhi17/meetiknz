import { Component, OnInit } from '@angular/core';
import { PMapService } from 'src/app/services/p-map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cmapview',
  templateUrl: './cmapview.component.html',
  styleUrls: ['./cmapview.component.css']
})
export class CmapviewComponent implements OnInit {

  private myMarker: Marker[]=[];
  private zoom: number=12;
  private mapdata:any;
  private lonLat:number = 51.5073509;
  private lonLog:number = -0.12775829999998223;
  private selectedVenue: Marker;
  private radiusFilter: number;
  private venueSubScribe: Subscription;
  private venueListSubScribe: Subscription;
  private searchSubScribe: Subscription;
  openedWindow : number = 0; 
  constructor(private  mpService: PMapService) { }

  ngOnInit() {
    this.venueListSubScribe=this.mpService.getMapData().subscribe((mapJson)=>{
        this.myMarker=mapJson;
        
        });

        this.searchSubScribe=this.mpService.searchList.subscribe((mapJson)=>{
           
            this.myMarker=<Marker[]>mapJson;

       });

       this.searchSubScribe=this.mpService.radiusValue.subscribe((radVal)=>{
           this.radiusFilter=<number>radVal;

   });
       
        
    this.venueSubScribe=this.mpService.selectedVenue.subscribe((selectedVenue)=>{
      if(selectedVenue){
        this.selectedVenue=<Marker>selectedVenue;
       // this.selectedVenue.zIndex=2;
        //this.selectedVenue.isClicked=false;
        
        if(this.myMarker!==undefined){
          this.myMarker.forEach((el,i)=>{
            if(el.name==this.selectedVenue.name){
              this.myMarker[i].isClicked=!this.myMarker[i].isClicked;
              this.myMarker[i].zIndex=22;
             
          }else{
            this.myMarker[i].isClicked=false;
          }
          })
        }
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
