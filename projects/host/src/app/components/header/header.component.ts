import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { take } from 'rxjs';
import { Theme } from '../../utils/constants/theme.constants';
import { MfRoutesService } from '../../services/mf-routes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  microfronts: { name: string; url: string }[] = [];

  get theme$() {
    return this._actualThemeService.actualTheme$;
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _actualThemeService: ThemeService,
    private _mfRoutesService: MfRoutesService
  ) {}

  ngOnInit(): void {
    this.microfronts = this._mfRoutesService.microfronts.map((mf) => ({
      name: mf.displayName,
      url: mf.routePath,
    }));
  }

  ngAfterViewInit(): void {
    this._actualThemeService.actualTheme$
      .pipe(take(1))
      .subscribe((theme) => this.changeTheme(theme));
  }

  changeTheme(theme: string): void {
    const bodyElement = document.querySelector('body') as HTMLBodyElement;
    bodyElement.dataset['bsTheme'] = theme;
    this._actualThemeService.changeTheme(theme as Theme);
    this._changeDetectorRef.detectChanges();
  }
}
