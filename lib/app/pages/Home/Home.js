/**
 * External dependencies
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */
import BaseLayout from '../../layouts/Base';

/*
 * Type: Presentational Component
 *
 * @returns homepage
 */
export default class Home extends Component {
  render() {
    return (
      <BaseLayout>
        <div className="page-container">
          <main className="row">
            <Helmet title="Universal/Isomorphic Fusion Vertical Seed::Home" />
            <h5>Home page</h5>
          </main>
        </div>
      </BaseLayout>
    );
  }
}
