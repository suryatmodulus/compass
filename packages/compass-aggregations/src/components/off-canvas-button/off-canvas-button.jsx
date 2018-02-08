import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './off-canvas-button.less';

/**
 * Off canvas button component.
 */
class OffCanvas extends PureComponent {
  static displayName = 'OffCanvasButtonComponent';

  static propTypes = {
    iconClassName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  /**
   * Render the off canvas button component.
   *
   * @returns {Component} The component.
   */
  render() {
    const className = classnames({
      [ styles['off-canvas-button'] ]: true,
      [ styles['off-canvas-button-is-selected'] ]: this.props.isSelected
    });
    return (
      <div
        className={className}
        onClick={this.props.onClick}>
        <i className={this.props.iconClassName} aria-hidden />
      </div>
    );
  }
}

export default OffCanvas;
