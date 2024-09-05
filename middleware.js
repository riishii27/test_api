// const validateAndFormatData = (req, res, next) => {
//     const { data } = req.body; // Assuming the data comes in the request body
  
//     if (!data || !Array.isArray(data)) {
//       return res.status(400).json({ error: 'Invalid data format. Expected an array of data objects.' });
//     }
  
//     // Loop through each data item and check required fields
//     const formattedData = data.map((item) => {
//       if (!item.dtm || !item.value) {
//         return res.status(400).json({ error: 'Missing required fields: `dtm` and `value`.' });
//       }
  
//       // Ensure `dtm` is in ISO 8601 format (you can add more checks if necessary)
//       const isoDate = new Date(item.dtm).toISOString();
//       if (isoDate === 'Invalid Date') {
//         return res.status(400).json({ error: 'Invalid `dtm` format. Expected ISO 8601.' });
//       }
  
//       // Return the item in the correct format
//       return {
//         dtm: isoDate,
//         value: item.value,
//       };
//     });
  
//     // Pass the formatted data to the next middleware or route handler
//     req.formattedData = formattedData;
//     next();
//   };
  