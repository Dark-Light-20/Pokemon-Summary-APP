import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameGroup } from '../../models/game.model';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { ROMAN_NUMERALS } from '../../utils/text.constants';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit, OnDestroy {
  game: GameGroup | undefined;

  private _destroySubject$ = new Subject<void>();

  get generationName(): string {
    const nameParts = this.game?.generation.name.split('-');
    return nameParts ? `${nameParts[0]} ${ROMAN_NUMERALS[nameParts[1]]}` : '';
  }

  get regionsText(): string {
    return this.game?.regions.map((region) => region.name).join(', ') || '';
  }

  get gamesText(): string {
    return this.game?.versions.map((game) => game.name).join(', ') || '';
  }

  constructor(
    private _activeRoute: ActivatedRoute,
    private _gameService: GameService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params
      .pipe(
        takeUntil(this._destroySubject$),
        switchMap((params) =>
          this._gameService.getGameGroup(parseInt(params['id']))
        )
      )
      .subscribe((pokemon) => (this.game = pokemon));
  }

  ngOnDestroy(): void {
    this._destroySubject$.next();
    this._destroySubject$.complete();
  }
}
