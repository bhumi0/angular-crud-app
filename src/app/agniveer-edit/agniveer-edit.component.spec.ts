import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgniveerEditComponent } from './agniveer-edit.component';

describe('AgniveerEditComponent', () => {
  let component: AgniveerEditComponent;
  let fixture: ComponentFixture<AgniveerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgniveerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgniveerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
