import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCompoennt } from './shop.component';

describe('Shop', () => {
  let component: ShopCompoennt;
  let fixture: ComponentFixture<ShopCompoennt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCompoennt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCompoennt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
