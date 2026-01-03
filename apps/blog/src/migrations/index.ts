import * as migration_20260103_044109 from './20260103_044109';

export const migrations = [
  {
    up: migration_20260103_044109.up,
    down: migration_20260103_044109.down,
    name: '20260103_044109'
  },
];
