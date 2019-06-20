import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { PMapService } from 'src/app/services/p-map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cmaplist',
  templateUrl: './cmaplist.component.html',
  styleUrls: ['./cmaplist.component.css']
})
export class CmaplistComponent implements OnInit {
  private venueSubScribe: Subscription;
  private venueListSubScribe: Subscription;
  private selectedVenue:any;
  private venueList:any;
  private searchedList:any;
  public filterKey: string;
  public searchRadBox:number;
  public radiusKey: number;
  private lonLat:number = 51.5194126;
  private lonLog:number = -0.10627840000006472;
  
  constructor(private mapService: PMapService,private render: Renderer) { }

  ngOnInit() {
    this.venueListSubScribe=this.mapService.venueList.subscribe(list => {
      this.venueList=list;
      this.searchedList=list;
    })
    this.mapService.selectedVenue.subscribe(venue => {
      this.selectedVenue=venue;
    
    })
  }


  markMe(selectedVenue){
    
     // this.render.setElementClass(event.target, "highlight", true);
     this.selectedVenue = selectedVenue;
     this.mapService.changeVenue(selectedVenue);
  }


    onkeypress(value) {
      value=value.toLowerCase();
      this.searchedList= this.venueList.filter((venue)=> venue.name.toLowerCase().indexOf(value)!==-1);
      console.log(this.searchedList);
      this.mapService.changeSearch(this.searchedList);
    }

  onRadiusChange(value){
    value=value*1000;
    this.mapService.changeRad(value);
    this.searchedList= this.venueList.filter((venue)=> this.calcCrow(this.lonLat,this.lonLog,venue.lat,venue.longi));
    this.mapService.changeSearch(this.searchedList);
    
  }
  ngOnDestroy(){
    this.selectedVenue=null;
    this.venueSubScribe.unsubscribe();
    this.venueListSubScribe.unsubscribe();
  }

  //This function takes in latitude and longitude of two location and returns the
  // distance between them as the crow flies (in km)
 calcCrow(lat11,lon11, lat22,lon22)
{
  
  var R = this.radiusKey;
  var dLat = this.toRad(lat22-lat11);
  var dLon = this.toRad(lon22-lon11);
  var lat1 = this.toRad(lat11);
  var lat2 = this.toRad(lat22);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1000;
  return (d<=R? true: false);
}

    // Converts numeric degrees to radians
    toRad(Value)
    {
        return Value * Math.PI / 180;
    }
}
