import { ConnectionOptions } from 'mongodb-data-service';
import { defaultSshPort } from '../constants/default-connection';

export type SSHConnectionOptions = NonNullable<ConnectionOptions['sshTunnel']>;

export type TunnelType = 'none' | 'ssh-password' | 'ssh-identity' | 'socks';

export interface UpdateSshOptions {
  type: 'update-ssh-options';
  key: keyof SSHConnectionOptions;
  value: string | number;
}

export function handleUpdateSshOptions({
  action,
  connectionOptions,
}: {
  action: UpdateSshOptions;
  connectionOptions: ConnectionOptions;
}): { connectionOptions: ConnectionOptions } {
  const { key, value } = action;
  return {
    connectionOptions: {
      ...connectionOptions,
      sshTunnel: {
        host: '',
        port: defaultSshPort,
        username: '',
        ...connectionOptions.sshTunnel,
        [key]: value,
      },
    },
  };
}
