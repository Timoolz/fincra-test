import { LoggerFactory } from './LoggerFactory';

const Logger = LoggerFactory.configure({
  id: 'fincra-test',
  level: 'all',
});

export { Logger };
