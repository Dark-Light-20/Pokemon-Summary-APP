import { CustomManifest } from './manifest.type';
import { buildRoutesMF } from './routes';

jest.mock('@angular-architects/module-federation', () => ({
  loadRemoteModule: jest.fn(),
}));

describe('Microfrontend routes builder', () => {
  it('should build mf routes from a manifest', () => {
    const mockManifest: CustomManifest = {
      mock: {
        remoteEntry: 'http://localhost:4200/remoteEntry.js',
        exposedModule: './MockModule',
        displayName: 'Mock',
        routePath: 'mock',
        ngModuleName: 'MockModule',
      },
    } as any;

    const buildedRoutes = buildRoutesMF(mockManifest);
    const paths = buildedRoutes.map((route) => route.path);

    expect(paths).toContain(mockManifest['mock'].routePath);
  });
});
