import React, { Component } from 'react';
import { NavLink } from 'fluxible-router';

if (process.env.BROWSER) {
  require('../style/footer.scss');
}

class Footer extends Component {

  render() {
    return (
      <div className="Footer">
        <div>
          <strong>Hubrick Frontend Challenge</strong> is app built in <a href="https://facebook.github.io/react/">React</a> with <a href="http://www.fluxible.io">Fluxible</a>. See the <a href="https://github.com/fustic/hubrick-frontend-challenge">project’s page</a> on Github or try something
          exciting: <NavLink className="Footer-link" routeName="bad">a bad route</NavLink> or <NavLink className="Footer-link" routeName="flow" navParams={{id: 100000000000}}>an unexisting flow</NavLink>.
        </div>
      </div>
    );
  }

}

export default Footer;
