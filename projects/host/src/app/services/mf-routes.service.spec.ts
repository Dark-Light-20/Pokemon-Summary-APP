import { TestBed } from '@angular/core/testing';

import { MfRoutesService } from './mf-routes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CustomManifest } from '../utils/manifest.type';
import { buildRoutesMF } from '../utils/routes';

const mockManifest: CustomManifest = {
  mock: {
    remoteEntry: 'http://localhost:4200/remoteEntry.js',
    exposedModule: './MockModule',
    displayName: 'Mock',
    routePath: 'mock',
    ngModuleName: 'MockModule',
  },
} as any;

jest.mock('@angular-architects/module-federation', () => ({
  getManifest: jest.fn().mockImplementation(() => mockManifest),
  loadRemoteModule: jest.fn(),
}));

describe('MfRoutesService', () => {
  let service: MfRoutesService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(MfRoutesService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset router with mf routes', async () => {
    const expectedRoutes = buildRoutesMF(mockManifest);
    await service.buildRoutes();
    expect(service.microfronts).toEqual(Object.values(mockManifest));
    const routes = router.config;
    routes.forEach((route, index) => {
      expect(route.path).toBe(expectedRoutes[index].path);
    });
    expect(service.microfronts).toEqual(Object.values(mockManifest));
  });
});
