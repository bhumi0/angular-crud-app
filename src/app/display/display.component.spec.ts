import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjLoginComponent } from './display.component';

describe('AdjLoginComponent', () => {
  let component: AdjLoginComponent;
  let fixture: ComponentFixture<AdjLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
