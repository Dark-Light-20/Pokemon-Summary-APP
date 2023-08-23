import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GAME_LIST_RS_MOCK } from '../utils/mocks/game-list.mock';
import { GameList } from '../models/game.model';
import { GAME_MOCK } from '../utils/mocks/game-detail.mock';

describe('GameService', () => {
  let service: GameService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GameService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return game list', (done) => {
    const mockData = GAME_LIST_RS_MOCK;
    const expectedGame: GameList = {
      id: '1',
      name: mockData.results[0].name.replaceAll('-', ' '),
    };

    service.getListData().subscribe((data) => {
      expect(data[0]).toEqual(expectedGame);
      done();
    });

    const req = httpController.expectOne((req) =>
      req.url.startsWith('https://pokeapi.co/api/v2/version-group')
    );
    req.flush(mockData);

    httpController.verify();
  });

  it('should get game detail', (done) => {
    const mockData = GAME_MOCK;
    const id = mockData.id;

    service.getGameGroup(id).subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });

    const req = httpController.expectOne(
      `https://pokeapi.co/api/v2/version-group/${id}`
    );
    req.flush(mockData);

    httpController.verify();
  });
});
