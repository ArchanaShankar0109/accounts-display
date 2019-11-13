import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupwithdrawComponent } from './topupwithdraw.component';

describe('TopupwithdrawComponent', () => {
  let component: TopupwithdrawComponent;
  let fixture: ComponentFixture<TopupwithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupwithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
