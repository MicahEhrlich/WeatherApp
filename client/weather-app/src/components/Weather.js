import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import WeatherDetails from './WeatherDetails';

import { WEATHER_API, ICON_URL, PARIS, NEW_YORK, BERLIN } from '../constants';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  paper: {
    height: 205,
    width: 120,
    color: 'white',

    backgroundColor: '#3f51b5'
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const Weather = () => {
  const classes = useStyles();
  const [report, setReport] = useState([]);
  const [details, setDetails] = useState();
  const [isFirst, setFirst] = useState(true);

  const getWeather = async () => {
    const res = await axios.get(
      `${WEATHER_API}?id=${PARIS},${NEW_YORK},${BERLIN}`
    );
    let tempReport = res.data.list;
    tempReport.forEach(element => {
      element.weather[0].icon = ICON_URL + element.weather[0].icon + '.png';
    });
    setReport(tempReport);
  };

  const getUserWeather = async userPos => {
    let pos = {
      lat: userPos.coords.latitude.toFixed(0),
      lon: userPos.coords.longitude.toFixed(0)
    };

    const res = await axios.get(`${WEATHER_API}?lat=${pos.lat}&lon=${pos.lon}`);
    console.log(res.data);

    return (
      <div>
        <h3>Your Location:</h3>
        <Paper
          className={classes.paper}
          elevation={4}
          onClick={() => getWeatherDetails(res.data.id)}>
          <h3>{res.data.name}</h3>
          <img src={ICON_URL + res.data.weather[0].icon + '.png'} alt='' />
          <h4>{res.data.weather[0].main}</h4>
          <h4>{res.data.main.temp}°c</h4>
        </Paper>
      </div>
    );
  };

  const getCurrentPositionWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        coords => getUserWeather(coords),
        error => console.error(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  };

  const getWeatherDetails = id => {
    report.forEach(element => {
      if (element.id === id) {
        setDetails(element);
      }
    });
  };

  useEffect(() => {
    getWeather();
    setFirst(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={10}>
              {report.map(value => (
                <Grid key={value.id} item>
                  <Button>
                    <Paper
                      className={classes.paper}
                      elevation={4}
                      onClick={() => getWeatherDetails(value.id)}>
                      <h3>{value.name}</h3>
                      <img src={value.weather[0].icon} alt='' />
                      <h4>{value.weather[0].main}</h4>
                      <h4>{value.main.temp}°c</h4>
                    </Paper>
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid container justify='center' spacing={10}>
              <Grid item>{isFirst ? getCurrentPositionWeather() : null}</Grid>
            </Grid>
            <Grid container justify='center' spacing={10}>
              <Grid item>
                <WeatherDetails weather={details} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Weather;
