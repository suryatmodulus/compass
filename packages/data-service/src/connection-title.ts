import ConnectionString from 'mongodb-connection-string-url';
import { ConnectionInfo } from './connection-info';

export function getConnectionTitle(info: ConnectionInfo): string {
  if (info.favorite?.name) {
    return info.favorite.name;
  }

  try {
    const url = new ConnectionString(info.connectionOptions.connectionString);
    if (url.isSRV) {
      return url.hosts[0];
    }

    return url.hosts.join(',');
  } catch (e) {
    // When parsing a connection for its title fails we default the title.
    return info.connectionOptions.connectionString || 'Connection';
  }
}
