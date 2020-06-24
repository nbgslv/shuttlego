import React from 'react';
import {parse} from 'date-fns';
import {format} from 'date-fns-tz';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, makeStyles,
} from '@material-ui/core';
import {green} from "@material-ui/core/colors";

// const useStyle = makeStyles(theme => ({
//   rightIcon: {
//     marginLeft: theme.spacing(1),
//     fontSize: 20,
//   },
//   icon: {
//     fontSize: 20,
//   },
//   success: {
//     backgroundColor: green[600],
//     margin: theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));

export const GuestDialogContext = React.createContext();

export class GuestDialogProvider extends React.Component {
  state = {
    title: '',
    changeTitle: (title) => this.setState({
      title,
    }),
    content: '',
    changeContent: (content) => this.setState({
      content,
    }),
    open: false,
    toggleState: (state) => this.setState((prevState) => ({
      open: !prevState.open,
    })),
    changeState: (state) => this.setState(() => ({
      open: state,
    })),
    actions: {
      names: {
        primary: '',
        secondary: '',
      },
      instances: {
        primary: '',
        secondary: '',
      },
    },
    changeActions: (actions) => this.setState({
      actions,
    }),
    payload: {},
    changePayload: (payload) => this.setState({
      payload,
    })
  };

  render() {
    return (
      <GuestDialogContext.Provider value={this.state}>
        {this.props.children}
      </GuestDialogContext.Provider>
    )
  }
}

export const GuestDialog = (props) => {
  const context = React.useContext(GuestDialogContext);

  return (
    <GuestDialogContext.Consumer>
      {context => {
        return (
          <Dialog
            disableBackdropClick
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={context.open}
          >
            <DialogTitle>{context.title}</DialogTitle>
            <DialogContent>
              {context.content}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={context.actions.instances.secondary}
                color="primary"
              >
                {context.actions.names .secondary}
              </Button>
              <Button onClick={context.actions.instances.primary} variant="outline" color="primary">
                {context.actions.names.primary}
              </Button>
            </DialogActions>
          </Dialog>
        )
      }}
    </GuestDialogContext.Consumer>
  );
};
