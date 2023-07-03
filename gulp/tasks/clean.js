import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

export const clean = async () => {
  return await plugins.del([paths.clean]);
};
