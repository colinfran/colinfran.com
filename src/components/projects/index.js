import React from 'react';
import './index.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";


import pigeon from './pigeon.png';
import colinfran from './colinfran.png';
import geterdone from './geterdone.png';
import whattowatch from './whattowatch.png';


class Projects extends React.Component {

  render() {
    var styles = this.props.mode==="light" ? {backgroundColor: '#fff',marginBottom:20}: {backgroundColor: '#5A6065',marginBottom:20, color: '#fff'};
    var color = this.props.mode==="light" ? "textSecondary": '#fff';
    return (
      <div className="projectsContainer">
        <div className="cardContainer">
          <Card className="cardClass" style={styles}>
            <CardActionArea
              onClick={()=> window.open("https://github.com/colinfran/pigeonapp", "_blank")}
              >
              <CardMedia
                component="img"
                alt="Get'erDone app for Apple Mac"
                height="140"
                image={geterdone}
                title="Get'erDone"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Get'er Done
                </Typography>
                <Typography variant="body2" color={color} component="p">
                  A simple Electron + React.js Reminder App.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/projects/geterdone" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  View
                </Button>
              </Link>
              <a href="https://github.com/colinfran/pigeonapp" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  Github
                </Button>
              </a>
            </CardActions>
          </Card>
        </div>
        <div className="cardContainer">
          <Card className="cardClass" style={styles}>
            <CardActionArea
              onClick={()=> window.open("https://github.com/colinfran/whattowatch", "_blank")}

              >
              <CardMedia
                component="img"
                alt="WhatToWatch App for iOS and Android"
                height="140"
                image={whattowatch}
                title="WhatToWatch"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  WhatToWatch App
                </Typography>
                <Typography variant="body2" color={color} component="p">
                  Find out the top trending movies and tv shows. For iOS and Android.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/projects/whattowatch" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  View
                </Button>
              </Link>
              <a href="https://github.com/colinfran/whattowatch" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  Github
                </Button>
              </a>
              <a href="https://expo.io/@colinfran/whattowatch" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  Expo
                </Button>
              </a>
            </CardActions>
          </Card>
        </div>
        <div className="cardContainer">
          <Card className="cardClass" style={styles}>
            <CardActionArea
              onClick={()=> window.open("https://github.com/colinfran/pigeonapp", "_blank")}
              >
              <CardMedia
                component="img"
                alt="Pigeon App for iOS and Android"
                height="140"
                image={pigeon}
                title="PigeonApp"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Pigeon App
                </Typography>
                <Typography variant="body2" color={color} component="p">
                  Report Disasters and Emergencies Around You. For iOS and Android.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/projects/pigeon" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  View
                </Button>
              </Link>
              <a href="https://github.com/colinfran/pigeonapp" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  Github
                </Button>
              </a>
              <a href="https://expo.io/@colinfran/finalproject" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  Expo
                </Button>
              </a>
            </CardActions>
          </Card>
        </div>
        <div className="cardContainer">
          <Card className="cardClass" style={styles}>
            <CardActionArea
              onClick={()=> window.open("https://github.com/colinfran/colinfran.com", "_blank")}

              >
              <CardMedia
                component="img"
                alt="ColinFran.com personal website"
                height="140"
                image={colinfran}
                title="ColinFran.com"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ColinFran.com | Portfolio website
                </Typography>
                <Typography variant="body2" color={color} component="p">
                  My personal website (exactly what you are looking at right now)
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/projects/portfolio" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  View
                </Button>
              </Link>
              <a href="https://github.com/colinfran/colinfran.com" style={{textDecoration: 'none', backgroundColor: '#fff', borderRadius: 4}}>
                <Button size="small" color="primary">
                  Github
                </Button>
              </a>
            </CardActions>
          </Card>
        </div>
        <hr className="hide-at-lg"/>
      </div>
    );
  }
}

export default Projects;
