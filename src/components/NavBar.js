import React, { PropTypes, Component } from 'react';
import { NavLink } from 'fluxible-router';
if (process.env.BROWSER) {
  require('../style/NavBar.scss');
}

class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <div className="NavBar-title">
          <NavLink href="/"></NavLink>
        </div>
        <div className="NavBar-links">
          <NavLink
            className="NavBar-link"
            routeName="flows"
            href="/flows/">
            Flows
          </NavLink>
        </div>
      </div>
    );
  }

}

export default NavBar;
