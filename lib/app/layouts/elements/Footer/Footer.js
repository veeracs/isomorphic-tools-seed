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
 * @returns footer element
 */

export default class Footer extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="footer-container">
        <footer>
          <h1>Footer Component</h1>
        </footer>
      </div>
    );
  }
}
