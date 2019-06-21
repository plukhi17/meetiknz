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
  private lonLat:number = 51.5073509;
  private lonLog:number = -0.12775829999998223;
  
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
  
  var R = 6371; // km of earth radius
	var dLat = (lat22-lat11) * Math.PI / 180;
	var dLon = (lon22-lon11) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat11 * Math.PI / 180 ) * Math.cos(lat22 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  // console.log('radius-',this.radiusKey);
  // console.log('distance-',d);
	return (d<=this.radiusKey? true: false);
}

    // Converts numeric degrees to radians
    toRad(Value)
    {
        return Value * Math.PI / 180;
    }
}
