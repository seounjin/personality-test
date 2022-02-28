import fs from 'fs';
import { resolve } from 'path';
import { DBField } from '../types';

const basePath = resolve();

const filenames = {
  [DBField.CARDS]: resolve(basePath, 'src/db/cards.json'),
};

export const readDB = (target: DBField) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'));
  } catch (err) {
    console.error(err);
  }
}
