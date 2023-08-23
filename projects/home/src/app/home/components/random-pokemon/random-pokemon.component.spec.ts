import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPokemonComponent } from './random-pokemon.component';
import { By } from '@angular/platform-browser';
import { MOCK_POKEMON } from '../../utils/mocks/pokemon.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('RandomPokemonComponent', () => {
  let component: RandomPokemonComponent;
  let fixture: ComponentFixture<RandomPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RandomPokemonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the preload section', () => {
    const imgElement = fixture.debugElement.query(By.css('img'))
      .nativeElement as HTMLImageElement;
    const btnElement = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(imgElement.src).toContain(component.preloadImgSrc);
    expect(btnElement.textContent).toContain("It's ...");
  });

  it('should render the pokemon preview', () => {
    const mockPokemon = MOCK_POKEMON;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img'))
      .nativeElement as HTMLImageElement;
    const btnElement = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    const expectedBtnText =
      mockPokemon.name[0].toUpperCase() + mockPokemon.name.slice(1);
    expect(imgElement.src).toContain(mockPokemon.sprites.front_default);
    expect(btnElement.textContent).toContain(expectedBtnText);
  });
});
