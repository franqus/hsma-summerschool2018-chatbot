import { TestBed, inject } from '@angular/core/testing';

import { FoodmenuService } from './foodmenu.service';

describe('FoodmenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodmenuService]
    });
  });

  it('should be created', inject([FoodmenuService], (service: FoodmenuService) => {
    expect(service).toBeTruthy();
  }));
});
