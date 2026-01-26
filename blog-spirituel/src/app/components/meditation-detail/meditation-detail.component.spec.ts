import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationDetailComponent } from './meditation-detail.component';

describe('MeditationDetail', () => {
  let component: MeditationDetailComponent;
  let fixture: ComponentFixture<MeditationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeditationDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeditationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
