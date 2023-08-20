import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCAL_THEME_KEY, Theme } from '../utils/constants/theme.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme$: BehaviorSubject<Theme>;

  get actualTheme$(): Observable<Theme> {
    return this._theme$.asObservable();
  }

  constructor() {
    const storedTheme = localStorage.getItem(LOCAL_THEME_KEY);
    const theme: Theme =
      storedTheme && Object.values<string>(Theme).includes(storedTheme)
        ? (storedTheme as Theme)
        : Theme.DARK;
    this._theme$ = new BehaviorSubject<Theme>(theme);
  }

  changeTheme(theme: Theme): void {
    this._theme$.next(theme);
    localStorage.setItem(LOCAL_THEME_KEY, theme);
  }
}
