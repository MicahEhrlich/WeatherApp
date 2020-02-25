import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { WEATHER_API, PARIS, NEW_YORK, BERLIN } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(1),
    height: 140,
    width: 100,
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
  const [userWeather, setUserWeather] = useState();
  const [pos, setPos] = useState();

  const getWeather = async () => {
    const res = await axios.get(
      `${WEATHER_API}?id=${PARIS},${NEW_YORK},${BERLIN}`
    );
    setReport(res.data.list);
  };

  const getUserWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        lat = lat.toFixed(0);
        lon = lon.toFixed(0);

        setPos({ lat: lat, lon: lon });

        const res = axios.get(`${WEATHER_API}?lat=${lat}&lon=${lon}`);
        setUserWeather(res.data);
      });
    }
  };

  useEffect(() => {
    getWeather();
    getUserWeather();
    // eslint-disable-next-line
  }, []);

  const getWeatherDetails = id => {};

  return (
    <div>
      <Container>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={10}>
              {report.map(value => (
                <Grid key={value.id} item>
                  <Paper className={classes.paper} elevation={4}>
                    <h3>{value.name}</h3>
                    <h2>{value.main.temp} °c</h2>
                    <h4>{value.weather[0].main}</h4>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid container justify='center' spacing={10}>
              <Grid item>
                <h3>Your Location:</h3>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Weather;
