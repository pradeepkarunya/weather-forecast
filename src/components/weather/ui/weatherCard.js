import moment from 'moment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

export default function WeatherCard({location, country, time, temperature, condition, icon, weather}) {
  const getTempDate = new Date(time).toDateString();
  const getTempTime = moment(new Date(time)).format("DD-MM-YYYY hh:mm A");

  const celcToFahr = ( n ) => {
    return ((n * 9.0 / 5.0) + 32.0);
  }
  
  const getTempFahrenheit = celcToFahr(temperature) + '°F';

  return (
    weather && <Card sx={{ maxWidth: 290 }}>
      <CardHeader
        avatar={
          <Avatar 
            aria-label="weather icon"
            sx={{bgColor: (theme) => theme.palette.primary.main, width: 56, height: 56 }}
            >
            <img src={icon} alt="Weather icon" />
          </Avatar>
        }
        title={location}
        subheader={country}
      />
      <Divider component="li" />
      <CardContent>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <MoreTimeOutlinedIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={getTempDate} secondary={getTempTime} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <ThermostatOutlinedIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={temperature+'°C'} secondary={getTempFahrenheit} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <AcUnitOutlinedIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={condition} />
            </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
