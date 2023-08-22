import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOffrComponent } from './new-offr.component';

describe('NewOffrComponent', () => {
  let component: NewOffrComponent;
  let fixture: ComponentFixture<NewOffrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOffrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOffrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
