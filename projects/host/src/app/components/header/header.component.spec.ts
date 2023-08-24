import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Theme } from '../../utils/constants/theme.constants';
import { of } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MfRoutesService } from '../../services/mf-routes.service';

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

jest.mock('@angular-architects/module-federation', () => ({
  getManifest: jest.fn().mockImplementation(() => mfRoutesServiceMock),
}));

const mfRoutesServiceMock = {
  microfronts: [
    {
      remoteEntry: 'http://localhost:8001/remoteEntry.js',
      exposedModule: './HomeModule',
      displayName: 'Home',
      routePath: 'home',
      ngModuleName: 'HomeModule',
    },
    {
      remoteEntry: 'http://localhost:8002/remoteEntry.js',
      exposedModule: './PokemonsModule',
      displayName: 'Pokemons',
      routePath: 'pokemons',
      ngModuleName: 'PokemonsModule',
    },
    {
      remoteEntry: 'http://localhost:8003/remoteEntry.js',
      exposedModule: './GamesModule',
      displayName: 'Games',
      routePath: 'games',
      ngModuleName: 'GamesModule',
    },
  ],
};

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
      providers: [
        { provide: ThemeService, useValue: themeServiceMock },
        {
          provide: MfRoutesService,
          useValue: mfRoutesServiceMock,
        },
      ],
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

  it('should have defined microfronts', () => {
    const expectedMicrofronts = mfRoutesServiceMock.microfronts.map((mf) => ({
      name: mf.displayName,
      url: mf.routePath,
    }));
    fixture.detectChanges();
    expect(component.microfronts).toEqual(expectedMicrofronts);
  });

  describe('when using nav group', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should navigate to home route', () => {
      const homeLinkElement = fixture.debugElement.query(
        By.css('nav ul.navbar-nav li.nav-item a[href="/home"]')
      );
      homeLinkElement.nativeElement.click();
      expect(router.url).toBe('/home');
    });

    it('should navigate to pokemons route', () => {
      const pokemonsLinkElement = fixture.debugElement.query(
        By.css('nav ul.navbar-nav li.nav-item a[href="/pokemons"]')
      );
      pokemonsLinkElement.nativeElement.click();
      expect(router.url).toBe('/pokemons');
    });

    it('should navigate to games route', () => {
      const gamesLinkElement = fixture.debugElement.query(
        By.css('nav ul.navbar-nav li.nav-item a[href="/games"]')
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
