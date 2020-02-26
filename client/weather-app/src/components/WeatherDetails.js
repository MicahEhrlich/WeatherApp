import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    minWidth: 250,
    backgroundColor: '#3f51b5',
    color: 'white'
  },
  info: {
    textAlign: 'left',
    display: 'grid'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  CardContent: {
    alignItems: 'left'
  },
  list: {
    fontWeight: 4
  }
}));

const WeatherDetails = props => {
  const classes = useStyles();
  const { weather } = props;

  if (weather)
    return (
      <div>
        <Box boxShadow={5}>
          <Card className={classes.root}>
            <CardHeader
              title={weather.name + ' ' + weather.sys.country}
              subheader={weather.weather[0].main}
            />
            <CardMedia
              className={classes.media}
              image={weather.weather[0].icon}
              title=''
            />
            <CardContent>
              <List dense={true} className={classes.list}>
                <ListItem>
                  <ListItemText
                    primary={'Temperature: ' + weather.main.temp + '°c'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={'Feels Like: ' + weather.main.feels_like + '°c'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      'Max Temp: ' +
                      weather.main.temp_max +
                      '°c   Min Temp: ' +
                      weather.main.temp_min +
                      '°c'
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={'Humidity: ' + weather.main.humidity + '%'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      'Wind Speed: ' +
                      weather.wind.speed +
                      ' kmh  ' +
                      '  Degree: ' +
                      weather.wind.deg +
                      '°'
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  return <div></div>;
};

export default WeatherDetails;
