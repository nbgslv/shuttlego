const dateFns = require('date-fns');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const env = require('../../config');
const {
  getAllSessionsDB,
  getSessionDB,
  getSessionsJoinGuestDB,
  getSessionJoinGuestDB,
  getSessionByGuestDB,
  postPatchSessionByGuestDB,
  postSessionDB,
  patchSessionDB,
  deleteSessionDB,
} = require('../db/sessionsDB');

const getAllSessions = async (callback) => {
  try {
    return await getSessionsJoinGuestDB((sessions) => {
      callback(sessions);
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getSession = async (sessionId) => {
  try {
    return await getSessionDB(sessionId);
  } catch (e) {
    throw new Error(e.messages);
  }
};

const getSessionByGuest = async (guestId, callback) => {
  try {
    getSessionByGuestDB(guestId, (session) => {
      callback(session);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const postSession = async (data, callback) => {
  try {
    postSessionDB(data, (session) => {
      callback(session);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const postSessionByGuest = async (data, guestId, callback) => {
  try {
    const guestData = data;
    console.log(data);
    postPatchSessionByGuestDB(guestData, guestId, (session) => {
      // const accountSid = 'AC9a739bb558667d650ce22662cc04a9ac';
      // const authToken = 'b7bce36286ba6315b0d372e79ffc9d5f';
      // const client = require('twilio')(accountSid, authToken);
      //
      // client.messages
      //   .create({
      //     body: `Your shuttle for the date ${session[0].shuttleDate} is registered`,
      //     from: '+12018176633',
      //     to: '+972546310205',
      //   })
      //   .then(message => console.log(message.sid));
      // async..await is not allowed in global scope, must use a wrapper
      // async function main() {
      //   // Generate test SMTP service account from ethereal.email
      //   // Only needed if you don't have a real mail account for testing
      //   let testAccount = await nodemailer.createTestAccount();
      //
      //   // create reusable transporter object using the default SMTP transport
      //   let transporter = nodemailer.createTransport({
      //     host: 'smtp.ethereal.email',
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: testAccount.user, // generated ethereal user
      //       pass: testAccount.pass // generated ethereal password
      //     }
      //   });

      //   // send mail with defined transport object
      //   let info = await transporter.sendMail({
      //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
      //     to: 'bar@example.com, baz@example.com', // list of receivers
      //     subject: 'Hello ✔', // Subject line
      //     text: 'Hello world?', // plain text body
      //     html: '<b>Hello world?</b>' // html body
      //   });
      //
      //   console.log('Message sent: %s', info.messageId);
      //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      //
      //   // Preview only available when sending through an Ethereal account
      //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      // }
      //
      // main().catch(console.error);
      callback(session);
    });
  } catch (e) {
    console.log(e);
  }
};

const patchSession = async (data, sessionId, callback) => {
  console.log(data, 'services');
  try {
    return await patchSessionDB(data, sessionId, (session) => {
      callback(session);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const deleteSession = async (sessionId, callback) => {
  try {
    return await deleteSessionDB(sessionId, (deleted) => {
      callback(deleted);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const verifySessionService = async (guestId, callback) => {
  try {
    await getSessionByGuest(guestId, (sessions) => {
      const sortedSessions = sessions.sort((dateA, dateB) => (
        dateFns.isAfter(dateFns.parseISO(dateA.shuttleDate), dateFns.parseISO(dateB.shuttleDate))
      ));
      const now = new Date();
      const sessionData = sortedSessions.filter((session) => {
        const iat = session.createdAt;
        const expWithHours = dateFns.addHours(iat, session.sessionHour);
        const expWithMinutes = dateFns.addMinutes(
          expWithHours,
          session.sessionMinute,
        );
        session.expWithMinutes = expWithMinutes;
        return dateFns.isAfter(now, expWithMinutes);
      });
      const session = sessionData[0];
      const expUnixTime = dateFns.getUnixTime(session.expWithMinutes);
      const tokenSession = jwt.sign({
        data: session,
        exp: expUnixTime,
      },
      env.dev.jwtSecret);
      callback({
        session,
        tokenSession,
      });
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.messages);
  }
};

module.exports = {
  getAllSessions,
  getSession,
  getSessionByGuest,
  postSessionByGuest,
  postSession,
  patchSession,
  deleteSession,
  verifySessionService,
};
