import React from 'react';
import AppRegistry from 'hadron-app-registry';
import { LeafyGreenProvider } from '@mongodb-js/compass-components';

import Home from './components/home';
import AppRegistryContext from './contexts/app-registry-context';

import './index.less';

function Plugin({
  appName,
  appRegistry,
}: {
  appName: string;
  appRegistry: AppRegistry;
}): React.ReactElement {
  return (
    <AppRegistryContext.Provider value={appRegistry}>
      <LeafyGreenProvider>
        <Home appName={appName} />
      </LeafyGreenProvider>
    </AppRegistryContext.Provider>
  );
}

Plugin.displayName = 'HomePlugin';

export default Plugin;
