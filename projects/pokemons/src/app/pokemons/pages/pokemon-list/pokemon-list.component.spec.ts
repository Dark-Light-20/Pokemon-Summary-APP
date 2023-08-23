import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { POKEMON_LIST_MOCK } from '../../utils/mocks/pokemon-list.mock';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { SharedLibService } from 'shared-lib';

const pokemonServiceMock = {
  getListData: jest.fn().mockReturnValue(of(POKEMON_LIST_MOCK)),
};

const mockRoutes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'detail/:id', component: MockComponent(PokemonDetailComponent) },
];

const sharedLibServiceMock = {
  dummyUUID: 'random',
};

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes)],
      declarations: [
        PokemonListComponent,
        MockComponent(PokemonDetailComponent),
      ],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: SharedLibService, useValue: sharedLibServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have first pokemon in table', () => {
    const firstRowNameElement = fixture.debugElement.query(
      By.css('tbody tr td')
    ).nativeElement as HTMLTableCellElement;
    const firstPokemonVisible = component.pokemons[0];
    expect(firstRowNameElement.textContent).toContain(
      firstPokemonVisible.name[0].toUpperCase() +
        firstPokemonVisible.name.slice(1)
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
    const lastPage = Math.ceil(POKEMON_LIST_MOCK.length / 20);
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

  it('should slice the pokemon list data with a change page', () => {
    const expectedPokemonItems = POKEMON_LIST_MOCK.slice(40, 60);
    component.changePage(3);
    fixture.detectChanges();
    expect(component.pokemons).toEqual(expectedPokemonItems);
  });

  it('should navigate to pokemon detail when button clicked', () => {
    const firstRowBtnElement = fixture.debugElement.query(
      By.css('.go-detail-btn')
    );
    const firstPokemonVisible = component.pokemons[0];
    firstRowBtnElement.nativeElement.click();
    expect(router.url).toContain(`detail/${firstPokemonVisible.id}`);
  });
});
