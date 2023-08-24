import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { of } from 'rxjs';
import { GAME_LIST_MOCK } from '../../utils/mocks/game-list.mock';
import { Router, Routes } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { GameDetailComponent } from '../game-detail/game-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../../services/game.service';
import { By } from '@angular/platform-browser';
import { SharedLibService } from 'shared-lib';

const gameServiceMock = {
  getListData: jest.fn().mockReturnValue(of(GAME_LIST_MOCK)),
};

const mockRoutes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'detail/:id', component: MockComponent(GameDetailComponent) },
];

const sharedLibServiceMock = {
  dummyUUID: 'random',
};

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes)],
      declarations: [GameListComponent, MockComponent(GameDetailComponent)],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: SharedLibService, useValue: sharedLibServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have first game in table', () => {
    const firstRowNameElement = fixture.debugElement.query(
      By.css('tbody tr td')
    ).nativeElement as HTMLTableCellElement;
    const firstGameVisible = component.games[0];
    expect(firstRowNameElement.textContent).toContain(
      firstGameVisible.name[0].toUpperCase() + firstGameVisible.name.slice(1)
    );
  });

  it('should have disabled previous button on first page', () => {
    component.changePage(1);
    fixture.detectChanges();
    const previousBtnElement = fixture.debugElement.query(
      By.css('#previousBtn')
    );
    const isDisabled = 'disabled' in previousBtnElement.classes;
    expect(isDisabled).toBeTruthy();
  });

  it('should have disabled next button on last page', () => {
    const lastPage = Math.ceil(GAME_LIST_MOCK.length / 20);
    component.changePage(lastPage);
    fixture.detectChanges();
    const nextBtnElement = fixture.debugElement.query(By.css('#nextBtn'));
    const isDisabled = 'disabled' in nextBtnElement.classes;
    expect(isDisabled).toBeTruthy();
    expect(component.isLastPage).toBeTruthy();
  });

  it('should go to previous page', () => {
    // Bypass private scope
    component['_actualPage'] = 2;
    const actualPage = component.actualPage;
    const previousBtnElement = fixture.debugElement.query(
      By.css('#previousBtn a')
    );
    previousBtnElement.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.actualPage).toBe(actualPage - 1);
  });

  it('should go to next page', () => {
    // Bypass private scope
    component['_actualPage'] = 2;
    const actualPage = component.actualPage;
    const nextBtnElement = fixture.debugElement.query(By.css('#nextBtn a'));
    nextBtnElement.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.actualPage).toBe(actualPage + 1);
  });

  it('should slice the game list data with a change page', () => {
    const expectedGameItems = GAME_LIST_MOCK.slice(40, 60);
    component.changePage(3);
    fixture.detectChanges();
    expect(component.games).toEqual(expectedGameItems);
  });

  it('should navigate to game detail when button clicked', () => {
    const firstRowBtnElement = fixture.debugElement.query(
      By.css('.go-detail-btn')
    );
    const firstGameVisible = component.games[0];
    firstRowBtnElement.nativeElement.click();
    expect(router.url).toContain(`detail/${firstGameVisible.id}`);
  });
});
