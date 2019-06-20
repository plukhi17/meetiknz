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
 
  constructor(private mapService: PMapService,private render: Renderer) { }

  ngOnInit() {
    this.venueListSubScribe=this.mapService.venueList.subscribe(list => {
      this.venueList=list;
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
  ngOnDestroy(){
    this.selectedVenue=null;
    this.venueSubScribe.unsubscribe();
    this.venueListSubScribe.unsubscribe();
  }
}
