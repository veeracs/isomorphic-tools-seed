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
 * @returns navigation element
 */

export default class Footer extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="nav-container">
        <nav>
          <ul>
            <li><a className="selected" href="#">All Posts</a></li>
            <li><a href="#">Top 20 Articles</a></li>
            <li><a href="#">Morning Digest</a></li>
            <li><a href="#">Videos</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}
