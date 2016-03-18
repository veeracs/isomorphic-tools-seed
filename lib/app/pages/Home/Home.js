/**
 * External dependencies
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */
import BaseLayout from '../../layouts/Base';
import MediaQuery from 'react-responsive';

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
            <Helmet title="Seed::Home" />
            <h5>Home page</h5>
            <div>
              <div>Device Test!</div>
              <MediaQuery minDeviceWidth={1224} values={{deviceWidth: 1600}}>
                <div>You are a desktop or laptop</div>
                <MediaQuery minDeviceWidth={1824}>
                  <div>You also have a huge screen</div>
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                  <div>You are sized like a tablet or mobile phone though</div>
                </MediaQuery>
              </MediaQuery>
            </div>
          </main>
        </div>
      </BaseLayout>
    );
  }
}
