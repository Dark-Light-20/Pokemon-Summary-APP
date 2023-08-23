import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { POKEMON_LIST_RS_MOCK } from '../utils/mocks/pokemon-list.mock';
import { PokemonList } from '../models/pokemon.model';
import { POKEMON_MOCK } from '../utils/mocks/pokemon.mock';

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

  it('should return pokemon list', (done) => {
    const mockData = POKEMON_LIST_RS_MOCK;
    const expectedPokemon: PokemonList = {
      id: '1',
      name: mockData.results[0].name,
    };

    service.getListData().subscribe((data) => {
      expect(data[0]).toEqual(expectedPokemon);
      done();
    });

    const req = httpController.expectOne((req) =>
      req.url.startsWith('https://pokeapi.co/api/v2/pokemon')
    );
    req.flush(mockData);

    httpController.verify();
  });

  it('should get pokemon detail', (done) => {
    const mockData = POKEMON_MOCK;
    const id = mockData.id;

    service.getPokemon(id).subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });

    const req = httpController.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    req.flush(mockData);

    httpController.verify();
  });
});
