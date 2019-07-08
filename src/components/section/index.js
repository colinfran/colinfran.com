import React from 'react';
import './index.css';
import Animation from './animation'

class Section extends React.Component {
  render() {
    var styles = this.props.mode==="light" ? "headerLinks headerLinksLight": "headerLinks headerLinksDark";
    return (
      <div>
        <div className="sectionContainer">
          <div className="sectionText">
            Hello, I'm Colin!
            <br/>
            I am a web developer
            <br/>
            and software engineer
            <br/>
            currently making and
            <br/>
            breaking things at
            <br/>
            <a className={styles} href="https://www.gapinc.com/content/gapinc/html.html">Gap Inc.</a>
          </div>
          <div className="sectionCanvas">
            <Animation mode={this.props.mode}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
