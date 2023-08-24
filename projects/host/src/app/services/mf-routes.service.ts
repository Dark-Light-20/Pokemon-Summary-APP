import { getManifest } from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest, CustomRemoteConfig } from '../utils/manifest.type';
import { buildRoutesMF } from '../utils/routes';

@Injectable({
  providedIn: 'root',
})
export class MfRoutesService {
  private _remotes: CustomRemoteConfig[] = [];

  get microfronts(): CustomRemoteConfig[] {
    return this._remotes;
  }

  constructor(private _router: Router) {}

  async buildRoutes(): Promise<void> {
    const manifest = getManifest<CustomManifest>();
    const mfRoutes = buildRoutesMF(manifest);

    this._router.resetConfig(mfRoutes);
    this._remotes = Object.values(manifest);
  }
}
