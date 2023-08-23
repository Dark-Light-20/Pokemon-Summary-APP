import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { By } from '@angular/platform-browser';
import { SharedLibService } from 'shared-lib';

const sharedLibServiceMock = {
  dummyUUID: 'random',
};

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [
        { provide: SharedLibService, useValue: sharedLibServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const titleElement = fixture.debugElement.query(By.css('p'))
      .nativeElement as HTMLParagraphElement;
    expect(titleElement.textContent).toContain('Welcome to PokeSummary App');
  });
});
