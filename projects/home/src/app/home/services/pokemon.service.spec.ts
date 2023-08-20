import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MOCK_POKEMON } from '../utils/mocks/pokemon.mock';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a random pokemon data', (done) => {
    const mockData = MOCK_POKEMON;

    service.getRandomPokemon().subscribe((res) => {
      expect(res).toBe(mockData);
      done();
    });

    const req = httpController.expectOne((req) =>
      req.url.startsWith('https://pokeapi.co/api/v2/pokemon/')
    );
    req.flush(mockData);
    httpController.verify();
  });
});
