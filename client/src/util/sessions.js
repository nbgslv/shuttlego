export const updateSession = (session, callback) => {
  fetch('http://localhost:3001/api/sessions/guest', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session),
  })
    .then(res => res.json())
    .then(res => callback(res[0]))
    .catch(err => console.log(err, 'err'));
};
