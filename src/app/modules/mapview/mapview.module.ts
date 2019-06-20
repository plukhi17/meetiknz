import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmapviewComponent } from './cmapview/cmapview.component';
import { CmaplistComponent } from './cmaplist/cmaplist.component';
import { AgmCoreModule } from '@agm/core';
import { CmapdetailComponent } from './cmapdetail/cmapdetail.component';

@NgModule({
  declarations: [CmapviewComponent, CmaplistComponent, CmapdetailComponent],
  imports: [
    CommonModule,
    AgmCoreModule
  ],
  exports: [CmapviewComponent, CmaplistComponent,CmapdetailComponent],
})
export class MapviewModule { }
