import * as dateUtil from './dates';

export const addGuest = (guest, callback) => {
  const data = {};
  const fields = Object.entries(guest);
  fields.forEach((entry) => {
    data[entry[0]] = entry[1];
  });
  const date = new Date();
  if (Object.prototype.hasOwnProperty.call(data, 'submit')) {
    delete data.submit;
  }
  if (!Object.prototype.hasOwnProperty.call(data, 'checkinDate')) {
    data.checkinDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    data.checkinDate = dateUtil.dateToString(data.checkinDate);
    delete data.checkinDateStr;
  }
  if (!Object.prototype.hasOwnProperty.call(data, 'checkoutDate')) {
    data.checkoutDate = `${data.checkoutDate.getFullYear()}-${data.checkoutDate.getMonth() + 1}-${data.checkoutDate.getDate()}`;
    delete data.checkoutDateStr;
  } else {
    data.checkoutDate = dateUtil.dateToString(data.checkoutDate);
  }
  if (!Object.prototype.hasOwnProperty.call(data, 'sessionTime')) {
    data.sessionHour = 2;
    data.sessionMinute = 0;
  } else {
    const { hour, minute } = dateUtil.dateToTimeString(data.sessionTime);
    data.sessionHour = hour;
    data.sessionMinute = minute;
    delete data.sessionTime;
    delete data.sessionTimeStr;
  }

  fetch('http://localhost:3001/api/guests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => callback(res[0]))
    .catch(err => console.log(err, 'err'));
};

export const getGuests = (callback) => {
  fetch('http://localhost:3001/api/guests')
    .then(res => res.json())
    .then(res => callback(res))
    .catch(err => console.log(err));
};

export const login = user => (
  fetch('http://localhost:3001/api/guests/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export const loginSession = user => (
  fetch('http://localhost:3001/api/sessions/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export const checkAuthUser = () => (
  fetch('http://localhost:3001/api/guests/checkAuthUser', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export const checkAuthSession = () => (
  fetch('http://localhost:3001/api/sessions/checkAuthSession', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export const logout = () => (
  fetch('http://localhost:3001/api/guests/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export const resetGuest = (roomNumber, email) => {
  const data = {
    roomNumber,
    email,
  };
  fetch('http://localhost:3001/api/guests/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.log);
};
