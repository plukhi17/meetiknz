import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PMapService } from 'src/app/services/p-map.service';

@Component({
  selector: 'app-cmapdetail',
  templateUrl: './cmapdetail.component.html',
  styleUrls: ['./cmapdetail.component.css']
})
export class CmapdetailComponent implements OnInit {
  private venueSubScribe: Subscription;
  private venueListSubScribe: Subscription;
  private selectedVenue:any;
  constructor(private mapService: PMapService) { }

  ngOnInit() {
    this.venueSubScribe=this.mapService.selectedVenue.subscribe((selectedVenue)=>{
      this.selectedVenue=selectedVenue;
    });
  }
  ngOnDestroy(){
    this.selectedVenue=null;
    this.venueSubScribe.unsubscribe();

  }
  

}
