import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { CustomManifest } from './manifest.type';
import { HOST_APP_ROUTES, REDIRECT_ROUTES } from '../app-routing.module';

export function buildRoutesMF(options: CustomManifest): Routes {
  const lazyRoutes: Routes = Object.keys(options).map((key) => {
    const entry = options[key];
    return {
      path: entry.routePath,
      loadChildren: () =>
        loadRemoteModule({
          type: 'manifest',
          remoteName: key,
          exposedModule: entry.exposedModule,
        }).then((m) => m[entry.ngModuleName]),
    };
  });

  return [...HOST_APP_ROUTES, ...lazyRoutes, ...REDIRECT_ROUTES];
}
