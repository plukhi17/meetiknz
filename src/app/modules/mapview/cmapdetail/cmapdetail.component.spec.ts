import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmapdetailComponent } from './cmapdetail.component';

describe('CmapdetailComponent', () => {
  let component: CmapdetailComponent;
  let fixture: ComponentFixture<CmapdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmapdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmapdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
