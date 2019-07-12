const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

// let printer = new ThermalPrinter({
//                                    type: PrinterTypes.STAR,                                  // Printer type: 'star' or 'epson'
//                                    interface: 'tcp://10.0.11.238',                       // Printer interface
//                                    characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
//                                    removeSpecialCharacters: false,                           // Removes special characters - default: false
//                                    lineCharacter: "=",                                       // Set character for lines - default: "-"
//                                    options:{                                                 // Additional options
//                                      timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
//                                    }
//                                  });
//
// let isConnected = await printer.isPrinterConnected()
//   .then(res => console.log(res));

async function testConnection() {
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,                                 // Printer type: 'star' or 'epson'
    interface: 'tcp://10.0.11.238',                            // Printer interface
    characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: '=',                                       // Set character for lines - default: "-"
    options: {                                                 // Additional options
      timeout: 5000,                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    },
  });

  // await printer.printImage('./pig.png');
  // printer.cut();
  // printer.execute();
}


testConnection();
