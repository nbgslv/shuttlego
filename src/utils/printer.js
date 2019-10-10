const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

async function printSlip(guestID, verfCode, sessionEnd) {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://10.0.11.238',
    characterSet: 'SLOVENIA',
    removeSpecialCharacters: false,
    lineCharacter: '=',
    options: {
      timeout: 5000,
    },
  });

  const printerConn = await printer.isPrinterConnected();
  if (printerConn) {
    printer.alignCenter();
    printer.setTextSize(2, 2);
    printer.print('Welcome');
    printer.newLine();
    printer.print('To Sadot');
    printer.newLine();
    printer.print('Hotel!');
    printer.newLine();
    printer.newLine();
    printer.newLine();
    printer.setTextSize(1, 1);
    printer.print('To register to your');
    printer.newLine();
    printer.print(' shuttle, you may');
    printer.newLine();
    printer.print('scan the following QR');
    printer.newLine();
    printer.newLine();
    printer.setTextSize(2, 2);
    printer.printQR(`http://localhost:3000/${guestID}`, {
      cellSize: 6, correction: 'Q', model: 2,
    });
    printer.setTextSize(1, 1);
    printer.newLine();
    printer.setTextNormal();
    printer.print('or enter to following url:');
    printer.newLine();
    printer.print('http://localhost:3000');
    printer.newLine();
    printer.newLine();
    printer.setTextSize(1, 1);
    printer.print('Your verification');
    printer.newLine();
    printer.print('code is:');
    printer.setTextSize(2, 2);
    printer.newLine();
    printer.newLine();
    printer.print(`${verfCode}`);
    printer.newLine();
    printer.newLine();
    printer.setTextNormal();
    printer.print('Your session is valid until:');
    printer.newLine();
    printer.print(`${sessionEnd}`);
    printer.newLine();
    printer.print('For any assistance, please contact the');
    printer.newLine();
    printer.print('reception by dialing 0 from your room.');
    printer.cut();
    printer.execute();
  } else {
    console.log('Couldn\'t connect to the printer');
  }
}

module.exports = printSlip;
