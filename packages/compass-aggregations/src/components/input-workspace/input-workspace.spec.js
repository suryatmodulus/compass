import React from 'react';
import { shallow } from 'enzyme';

import InputWorkspace from '../input-workspace';
import styles from './input-workspace.module.less';

describe('InputWorkspace [Component]', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <InputWorkspace
        documents={[]}
        isLoading
        isExpanded
        openLink={sinon.spy()}
        count={10} />
    );
  });

  afterEach(() => {
    component = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles['input-workspace']}`)).to.be.present();
  });
});
