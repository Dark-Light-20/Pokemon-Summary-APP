import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Theme } from '../../utils/constants/theme.constants';
import { of } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

const themeServiceMock = {
  actualTheme$: of(Theme.DARK),
  changeTheme: jest.fn(),
};

@Component({ selector: 'home' })
class MockHomeComponent {}

@Component({ selector: 'pokemons' })
class MockPokemonsComponent {}

@Component({ selector: 'games' })
class MockGamesComponent {}

const mockRoutes: Routes = [
  { path: 'home', component: MockHomeComponent },
  { path: 'pokemons', component: MockPokemonsComponent },
  { path: 'games', component: MockGamesComponent },
];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes)],
      declarations: [HeaderComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    const changeThemeSpy = jest.spyOn(component, 'changeTheme');
    const expectedTheme = Theme.DARK;
    themeServiceMock.actualTheme$ = of(expectedTheme);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.theme$).toBe(themeServiceMock.actualTheme$);
    expect(changeThemeSpy).toHaveBeenCalledWith(expectedTheme);
  });

  it('should have title', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('a.navbar-brand'))
      .nativeElement as HTMLAnchorElement;
    expect(titleElement.textContent).toContain('PokeSummary');
  });

  describe('when using nav group', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should navigate to home route', () => {
      const homeLinkElement = fixture.debugElement.query(
        By.css('nav ul.navbar-nav li.nav-item a[routerLink="/home"]')
      );
      homeLinkElement.nativeElement.click();
      expect(router.url).toBe('/home');
    });

    it('should navigate to pokemons route', () => {
      const pokemonsLinkElement = fixture.debugElement.query(
        By.css('nav ul.navbar-nav li.nav-item a[routerLink="/pokemons"]')
      );
      pokemonsLinkElement.nativeElement.click();
      expect(router.url).toBe('/pokemons');
    });

    it('should navigate to games route', () => {
      const gamesLinkElement = fixture.debugElement.query(
        By.css('nav ul.navbar-nav li.nav-item a[routerLink="/games"]')
      );
      gamesLinkElement.nativeElement.click();
      expect(router.url).toBe('/games');
    });
  });

  it('should chagne the theme', () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const expectedTheme = Theme.LIGHT;
    component.changeTheme(expectedTheme);
    expect(body.dataset['bsTheme']).toBe(expectedTheme);
    expect(themeServiceMock.changeTheme).toHaveBeenCalledWith(expectedTheme);
  });
});
