import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { HomeComponent } from './home.component';
import { RandomPokemonComponent } from './components/random-pokemon/random-pokemon.component';
import { By } from '@angular/platform-browser';
import { MOCK_POKEMON } from './utils/mocks/pokemon.mock';
import { of } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
import { SharedLibService } from 'shared-lib';

const pokemonServiceMock = {
  getRandomPokemon: jest.fn().mockReturnValue(of(MOCK_POKEMON)),
};

const sharedLibServiceMock = {
  dummyUUID: 'random',
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(RandomPokemonComponent)],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: SharedLibService, useValue: sharedLibServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const titleElement = fixture.debugElement.query(By.css('h1'))
      .nativeElement as HTMLHeadingElement;
    expect(titleElement.textContent).toContain(component.projectTitle);
  });

  it('should retrieve a random pokemon', (done) => {
    component.pokemon$.subscribe((res) => {
      expect(res).toBeDefined();
      expect(res.name).toBeDefined();
      done();
    });
  });
});
