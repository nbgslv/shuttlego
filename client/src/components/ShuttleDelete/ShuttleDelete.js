import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  sessionId: state.user.sessionId,
});

function ShuttleDelete(props) {
  const [sent, setSent] = React.useState([]);
  const { sessionId } = props;
  const data = {
    data: {
      request: 'delete',
      status: 'pending',
      sessionId,
    },
  };
  React.useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3001/api/sessions', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((shuttlesPack) => {
          if (shuttlesPack) setSent(true);
          else setSent(false);
        })
        .catch(console.log);
    };
    fetchData();
  });

  return (
    <div>
      Request was sent: {sent}.
    </div>
  );
}

export default connect(mapStateToProps)(ShuttleDelete);
