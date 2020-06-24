import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

class ShuttleDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shuttle } = this.props;
    return (
      <List style={{ width: '100%' }}>
        <ListItem>
          <ListItemText primary="Shuttle Details" secondary={`${shuttle.shuttleDate} ${shuttle.shuttleTimeHour}:${shuttle.shuttleTimeMinute}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Terminal" secondary={shuttle.terminal} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Luggage" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Large Bags" secondary={shuttle.largeBags} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Medium Bags" secondary={shuttle.mediumBags} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Small Bags" secondary={shuttle.smallBags} />
        </ListItem>
        { shuttle.specialBag ? (
          <ListItem>
            <ListItemText primary="Special Luggage" secondary={shuttle.specialBagDesc} />
          </ListItem>
        ) : null}
        { shuttle.wakeupCall || shuttle.bbox ? (
          <>
            <Divider />
            <ListItem>
              <ListItemText primary="Special Requests" />
            </ListItem>
            { shuttle.wakeupCall ? (
              <ListItem>
                <ListItemText primary="Wakeup Time" secondary={`${shuttle.wakeupTimeDate} ${shuttle.wakeupTimeHour}:${shuttle.wakeupTimeMinute}`} />
              </ListItem>
            ) : null}
            { shuttle.bbox ? (
              <ListItem>
                <ListItemText primary="Breakfast Boxes" secondary={shuttle.bboxNumber} />
              </ListItem>
            ) : null}
          </>
        ) : null}
      </List>
    );
  }
}

export default ShuttleDisplay;
