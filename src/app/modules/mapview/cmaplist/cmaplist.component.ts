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
  }
  ngOnDestroy(){
    this.selectedVenue=null;
    this.venueSubScribe.unsubscribe();
    this.venueListSubScribe.unsubscribe();
  }
}
