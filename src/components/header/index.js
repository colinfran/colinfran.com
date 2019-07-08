import React from 'react';
import './index.css';
import whitelogo from '../../logos/whitelogo.svg'; // Tell Webpack this JS file uses this image
import blacklogo from '../../logos/blacklogo.svg'; // Tell Webpack this JS file uses this image
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";

import history from '../../history.js';


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      open: false
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  linkClick = (event) => {
    event.preventDefault();
    this.setState({ open: !this.state.open });
    history.push('/projects');

  }

  renderFunction = () =>{
    const { width } = this.state;
    const isMobile = width <= 767;
    var linksStyles = this.props.mode==="light" ? "headerLinks headerLinksLight": "headerLinks headerLinksDark";
    if (isMobile){
      return (
        <div>
          <div style={{marginBottom: -50, marginTop: -20}}>
          <Link to="/">
            <img style={{height:150}} src={this.props.mode==="light" ? blacklogo: whitelogo} alt="C (logo)"/>
          </Link>

          </div>
          <Menu right={true} isOpen={ this.state.open }>
            <div className="headerContainer">
              <div onClick={this.linkClick} className="headerLinks headerLinksMobile" style={{color:'#000'}}>Projects</div>
              <a className="headerLinks headerLinksMobile" style={{color:'#000'}} href="https://github.com/colinfran">Github</a>
              <a className="headerLinks headerLinksMobile" style={{color:'#000'}} href="https://linkedin.com/in/colinfranceschini">LinkedIn</a>
              <a className="headerLinks headerLinksMobile" style={{color:'#000'}} href="https://twitter.com/colinfran">Twitter</a>

              <Toggle
                defaultChecked={this.props.mode === 'dark'}
                icons={{
                  checked: <FaMoon color='white'/>,
                  unchecked: <FaSun color='white'/>,
                }}
                onChange={this.props.setMode}
              />
            </div>
          </Menu>
        </div>
      );
    }
    else{
      return (
        <div className="headerContainer">
          <div className="imgContainer">
            <Link to="/">
              <img style={{height:150}} src={this.props.mode==="light" ? blacklogo: whitelogo} alt="C (logo)"/>
            </Link>
          </div>
          <div className="linksAndToggle">
            <Link to="/projects" className={linksStyles}>Projects</Link>
            <a className={linksStyles} href="https://github.com/colinfran">Github</a>
            <a className={linksStyles} href="https://linkedin.com/in/colinfranceschini">LinkedIn</a>
            <a className={linksStyles} href="https://twitter.com/colinfran">Twitter</a>
            <Toggle
              defaultChecked={this.props.mode === 'dark'}
              icons={{
                checked: <FaMoon color='white'/>,
                unchecked: <FaSun color='white'/>,
              }}
              onChange={this.props.setMode}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderFunction()}
      </div>
    );
  }
}

export default Header;
