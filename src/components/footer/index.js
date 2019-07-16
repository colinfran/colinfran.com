import React from 'react';
import './index.css';

class Footer extends React.Component {

  render() {
    console.log(this.props.location.pathname);
    if (this.props.location.pathname !== "/projects"){
      return (
        <div className="footerContainer" id="footer" >
          <div>
            Made with <span role="img" aria-label="heart">❤️</span>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="projectsFooter" id="footer" >
          <div>
            Made with <span role="img" aria-label="heart">❤️</span>
          </div>
        </div>
      );
    }
  }
}

export default Footer;
