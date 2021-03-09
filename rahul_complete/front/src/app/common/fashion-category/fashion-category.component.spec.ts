import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionCategoryComponent } from './fashion-category.component';

describe('FashionCategoryComponent', () => {
  let component: FashionCategoryComponent;
  let fixture: ComponentFixture<FashionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
