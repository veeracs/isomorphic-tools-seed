/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

/*
 * Type: Presentational Component
 *
 * @prop {Object} children - child react components
 * @returns header element
 */

export default class Header extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="header-container">
        <header>
          <h1>Header Component</h1>
        </header>
      </div>
    );
  }
}
