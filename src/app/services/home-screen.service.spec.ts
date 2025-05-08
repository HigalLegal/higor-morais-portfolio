import { TestBed } from '@angular/core/testing';

import { HomeScreenService } from './home-screen.service';

describe('HomeScreenService', () => {
  let service: HomeScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
