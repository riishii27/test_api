const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Load JSON data from file
const dataFilePath = path.join(__dirname, 'data.json');
let jsonData;

try {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  jsonData = JSON.parse(data);
} catch (err) {
  console.error('Error reading or parsing the data file:', err);
  jsonData = [];  // Use an empty array if there is an error
}

app.get('/standardized/api/data.json', (req, res) => {
  if (!jsonData) {
    return res.status(500).send('Data not available');
  }

  const standardizedData = jsonData.map(record => {
    const message = JSON.parse(record.message);
    const data = message.data;

    // Flatten the modbus data
    const modbusData = data.modbus[0] || {}; // Assume the first modbus entry should be used

    return {
      time: `${data.dtm.slice(0, 4)}-${data.dtm.slice(4, 6)}-${data.dtm.slice(6, 8)}T${data.dtm.slice(8, 10)}:${data.dtm.slice(10, 12)}:${data.dtm.slice(12, 14)}Z`,
      imei: data.imei,
      uid: data.uid,
      sequence: data.seq,
      signal: data.sig,
      message_type: data.msg,
      modbus_sid: modbusData.sid,
      modbus_status: modbusData.stat,
      modbus_received_count: modbusData.rcnt,
      modbus_internal_temp: modbusData.inttemp,
      modbus_register_1: modbusData.reg1,
      modbus_mppt1_current: modbusData['mppt1 current1'],
      modbus_mppt2_voltage: modbusData['mppt2 voltage'],
      modbus_mppt2_current: modbusData['mppt2 current'],
      modbus_mppt3_voltage: modbusData['mppt3 voltage']
    };
  });

  res.json(standardizedData);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
