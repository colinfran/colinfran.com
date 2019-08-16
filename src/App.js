import React from 'react';
import './App.css';
import { Router, Route} from "react-router-dom";
import history from './history.js';
import ReactGA from 'react-ga';

import Header from './components/header';
import Footer from './components/footer';
import Section from './components/section';
import Projects from './components/projects';

import CarouselComp from './components/projects/carouselcomp';

import projectInfo from './components/projects/projectInfo';

import {withRouter} from 'react-router-dom';


history.listen(location => {
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
})


class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        mode: 'light'
      };
  }

  componentDidMount() {
		ReactGA.pageview(window.location.pathname);
    console.log()
	}

  setMode = () => {
    if (this.state.mode === "dark"){
      this.setState({mode: "light"})
    }
    else if (this.state.mode === "light"){
      this.setState({mode: "dark"})
    }
  }

  home = () => {
    return (
      <div>
        <Section mode={this.state.mode} setMode={this.setMode}/>
      </div>
    );
  }

  render() {
		const FooterComp = withRouter(props => <Footer mode={this.state.mode} setMode={this.setMode} {...props}/>);
    return (
      <Router history={history}>
        <div className={`App ${this.state.mode === "dark" ? "dark": "light"}`}>
          <div>
            <Header mode={this.state.mode} setMode={this.setMode}/>
          </div>
          <div>
            <Route path="/" exact component={this.home} />
            <Route path="/projects" exact render={()=> <Projects  mode={this.state.mode} setMode={this.setMode}/>} />
						<Route path="/projects/whattowatch" exact render={()=> <CarouselComp project={projectInfo.whattowatch}  mode={this.state.mode} setMode={this.setMode}/>} />
						<Route path="/projects/calculator" exact render={()=> <CarouselComp project={projectInfo.calculator}  mode={this.state.mode} setMode={this.setMode}/>} />
						<Route path="/projects/pigeon" exact render={()=> <CarouselComp project={projectInfo.pigeon} mode={this.state.mode} setMode={this.setMode}/>} />
						<Route path="/projects/geterdone" exact render={()=> <CarouselComp project={projectInfo.geterdone} mode={this.state.mode} setMode={this.setMode}/>} />
						<Route path="/projects/portfolio" exact render={()=> <CarouselComp project={projectInfo.portfolio} mode={this.state.mode} setMode={this.setMode}/>} />

          </div>
          <div>
            <FooterComp />
          </div>
        </div>

    </Router>
    );
  }
}

export default App;
