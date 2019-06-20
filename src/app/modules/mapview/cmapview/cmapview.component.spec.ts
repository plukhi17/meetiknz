import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmapviewComponent } from './cmapview.component';

describe('CmapviewComponent', () => {
  let component: CmapviewComponent;
  let fixture: ComponentFixture<CmapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
