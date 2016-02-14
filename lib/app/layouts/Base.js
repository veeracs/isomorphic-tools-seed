/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */
import Header from './elements/Header/Header';
import Nav from './elements/Nav/Nav';
import Footer from './elements/Footer/Footer';

import './Base.scss';

/*
 * Type: Presentational Component
 *
 * @prop {Object} children - child react components
 * @returns base layout wrapper with header footer and navigation elements
 */
export default class Base extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  /**
   * Renders a page with default header, nav and footer
   * @returns {Object} Base react component
   */
  render() {
    return (
      <div id="base-container">
        <Header />
        <Nav />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
