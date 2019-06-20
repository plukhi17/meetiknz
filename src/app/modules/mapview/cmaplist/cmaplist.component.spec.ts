import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmaplistComponent } from './cmaplist.component';

describe('CmaplistComponent', () => {
  let component: CmaplistComponent;
  let fixture: ComponentFixture<CmaplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmaplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmaplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
