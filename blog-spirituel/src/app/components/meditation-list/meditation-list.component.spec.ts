import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationListComponent } from './meditation-list.component';

describe('MeditationList', () => {
  let component: MeditationListComponent;
  let fixture: ComponentFixture<MeditationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeditationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeditationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
