import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const defaultTheme = createMuiTheme();
const breakPoints = createBreakpoints({});
const theme = {
  palette: {
    primary: { main: '#8BC34A' },
    secondary: { main: '#D32F2F' },
  },
  overrides: {
    MuiTypography: {
      [breakPoints.down('sm')]: {
        fontSize: 10,
      },
    },
    MuiTableCell: {
      sizeSmall: {
        [breakPoints.down('xs')]: {
          fontSize: 10,
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        top: '-10px',
        [breakPoints.down(600)]: {
          fontSize: 10,
        },
      },
    },
    MuiInput: {
      root: {
        '&::placeholder': {
          [breakPoints.down('sm')]: {
            fontSize: 10,
          },
        },
      },
      input: {
        [breakPoints.down('sm')]: {
          fontSize: 12,
        },
      },
    },
    MuiGrid: {},
  },
  themeName: 'Sushi Persian Red Chipmunk',
};

export default createMuiTheme(theme);
