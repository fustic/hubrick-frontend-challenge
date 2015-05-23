import React from 'react';

if (process.env.BROWSER) {
  require('../style/Loader.scss');
  require('../style/Animate.scss');
}

class LoadingPage extends React.Component {

  render() {
    return (
      <div className="Loader Animate--slow Animate-fadeIn">
        <svg className="circular">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      </div>
    );
  }

}

export default LoadingPage;
