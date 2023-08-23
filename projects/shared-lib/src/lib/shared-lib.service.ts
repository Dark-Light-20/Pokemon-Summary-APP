import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedLibService {
  private _dummyUUID: string;

  get dummyUUID(): string {
    return this._dummyUUID;
  }

  constructor() {
    this._dummyUUID = crypto.randomUUID();
  }
}
