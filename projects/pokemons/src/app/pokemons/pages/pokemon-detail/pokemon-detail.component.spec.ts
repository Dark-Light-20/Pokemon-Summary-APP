import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { POKEMON_MOCK } from '../../utils/mocks/pokemon.mock';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { By } from '@angular/platform-browser';

const activatedRouteMock = {
  params: of({ id: 1 }),
};

const pokemonMock = POKEMON_MOCK;

const pokemonServiceMock = {
  getPokemon: jest.fn().mockReturnValue(of(pokemonMock)),
};

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PokemonDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PokemonService, useValue: pokemonServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.pokemon).toEqual(pokemonMock);
  });

  it('should display pokemon name', () => {
    const nameElement = fixture.debugElement.query(By.css('h3'))
      .nativeElement as HTMLHeadingElement;
    expect(nameElement.textContent?.toLowerCase()).toContain(pokemonMock.name);
  });

  it('should display pokemon types', () => {
    const typeElements = fixture.debugElement.queryAll(By.css('span.badge'));
    typeElements
      .map((element) => element.nativeElement)
      .forEach((element: HTMLSpanElement) => {
        pokemonMock.types
          .map((type) => type.type.name)
          .includes(element.textContent!.toLowerCase());
      });
  });
});
