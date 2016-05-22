import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import {lightBlue500, lightBlue700} from 'material-ui/styles/colors'

import './index.css';

const theme = getMuiTheme({
    palette: {
        primary1Color: lightBlue500,
        primary2Color: lightBlue700
    }
});

const App = () => (
<MuiThemeProvider muiTheme={theme}>
    <div>
        <AppBar
            showMenuIconButton={false}
            title={"Дом"} />
        <div className="App__content">
            <Paper className="App__section">
                <h3>Присутствие дома</h3>
            </Paper>
        </div>
    </div>
</MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
