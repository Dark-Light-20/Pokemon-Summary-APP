import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { LOCAL_THEME_KEY, Theme } from '../utils/constants/theme.constants';
import { skip } from 'rxjs';

describe('ThemeService whit no value stored', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', (done) => {
    expect(service).toBeTruthy();
    service.actualTheme$.subscribe((theme) => {
      expect(theme).toBe(Theme.DARK);
      done();
    });
  });
});

describe('ThemeService with value stored', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.setItem(LOCAL_THEME_KEY, Theme.LIGHT);
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', (done) => {
    expect(service).toBeTruthy();
    service.actualTheme$.subscribe((theme) => {
      expect(theme).toBe(localStorage.getItem(LOCAL_THEME_KEY));
      done();
    });
  });

  it('should change theme', (done) => {
    const expectedTheme = Theme.DARK;
    service.actualTheme$.pipe(skip(1)).subscribe((theme) => {
      expect(theme).toBe(expectedTheme);
      done();
    });
    service.changeTheme(expectedTheme);
  });
});
