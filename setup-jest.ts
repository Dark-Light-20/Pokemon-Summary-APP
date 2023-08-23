import { randomUUID } from 'crypto';

import 'jest-preset-angular/setup-jest';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID,
  },
});
