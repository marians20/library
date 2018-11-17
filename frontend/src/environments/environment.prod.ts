import { LogLevels } from '../app/shared/services';

export const environment = {
  production: true,
  apiUrl: 'http://localhost:4040',
  logLevel: LogLevels.Info,
  primaryKeyField: '_id'
};
