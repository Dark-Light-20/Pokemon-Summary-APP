import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Theme } from '../../utils/constants/theme.constants';
import { of } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { By } from '@angular/platform-browser';

const themeServiceMock = {
  actualTheme$: of(Theme.DARK),
  changeTheme: jest.fn(),
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
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

  it('should chagne the theme', () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const expectedTheme = Theme.LIGHT;
    component.changeTheme(expectedTheme);
    expect(body.dataset['bsTheme']).toBe(expectedTheme);
    expect(themeServiceMock.changeTheme).toHaveBeenCalledWith(expectedTheme);
  });
});
