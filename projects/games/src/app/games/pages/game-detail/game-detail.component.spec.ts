import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailComponent } from './game-detail.component';
import { of } from 'rxjs';
import { GAME_MOCK } from '../../utils/mocks/game-detail.mock';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../../services/game.service';
import { By } from '@angular/platform-browser';

const activatedRouteMock = {
  params: of({ id: 1 }),
};

const gameMock = GAME_MOCK;

const gameServiceMock = {
  getGameGroup: jest.fn().mockReturnValue(of(gameMock)),
};

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GameDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: GameService, useValue: gameServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.game).toEqual(gameMock);
  });

  it('should have name and generation title', () => {
    const gameGroupNameElement = fixture.debugElement.query(
      By.css('h1')
    ).nativeElement;
    const generationElement = fixture.debugElement.query(
      By.css('span.badge')
    ).nativeElement;
    expect(gameGroupNameElement.textContent.toLowerCase()).toContain(
      gameMock.name.replaceAll('-', ' ')
    );
    expect(generationElement.textContent.toLowerCase()).toContain(
      component.generationName
    );
  });

  it('should have game regions', () => {
    const regionsElement = fixture.debugElement.query(
      By.css('p#regionsText')
    ).nativeElement;
    component.game?.regions.forEach((region) =>
      expect(regionsElement.textContent.toLowerCase()).toContain(region.name)
    );
  });

  it('should have game versions', () => {
    const gamesElement = fixture.debugElement.query(
      By.css('p#gamesText')
    ).nativeElement;
    component.game?.versions.forEach((version) =>
      expect(gamesElement.textContent.toLowerCase()).toContain(version.name)
    );
  });
});
