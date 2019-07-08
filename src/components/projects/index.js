import React from 'react';
import './index.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import pigeon from './pigeon.jpg';
import whattowatch from './whattowatch.jpg';


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
              <a href="https://github.com/colinfran/pigeonapp" style={{textDecoration: 'none', backgroundColor: '#fff'}}>
                <Button size="small" color="primary">
                  Github
                </Button>
              </a>
              <a href="https://expo.io/@colinfran/finalproject" style={{textDecoration: 'none', backgroundColor: '#fff'}}>
                <Button size="small" color="primary">
                  Expo
                </Button>
              </a>
            </CardActions>
          </Card>
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
              <a href="https://github.com/colinfran/whattowatch" style={{textDecoration: 'none', backgroundColor: '#fff'}}>
                <Button size="small" color="primary">
                  Github
                </Button>
              </a>
              <a href="https://expo.io/@colinfran/whattowatch" style={{textDecoration: 'none', backgroundColor: '#fff'}}>
                <Button size="small" color="primary">
                  Expo
                </Button>
              </a>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default Projects;
