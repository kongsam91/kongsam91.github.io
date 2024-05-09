function ReadCSV(index) {

  return fetch(String(index) + '.csv')
    .then(response => response.text())
    .then(csvData => {
      
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');
      const data = [];

      for (let i = 1; i < rows.length; i++) {

        const rowData = rows[i].split(',');

        if (rowData.length === headers.length) {

          const entry = {};

          for (let j = 0; j < headers.length; j++) {

            entry[headers[j].trim()] = parseFloat(rowData[j].trim());

          }
          data.push(entry);

        }

      }
      
      return data;

    })
    .catch(error => {

      console.error('Error fetching CSV file:', error);

    });
}

function Cal() {
  var select = document.getElementById("modes");
  var value = select.value;
  var inputval = parseFloat(document.getElementById("inputvalue").value);
  var Interpolation_y = -1;

  
  ReadCSV(value)

    .then(data => {

      for (let i = 0; i < data.length - 1; i++) {

        if (inputval >= data[i].x && inputval <= data[i+1].x) {

          if (data[i+1].x === data[i].x) {// 避免除以零
             
            console.error("Divide by zero error: x values are equal.");
            return;

          }
          Interpolation_y = data[i].y + (inputval - data[i].x) / (data[i+1].x - data[i].x) * (data[i+1].y - data[i].y); // 使用內插法         
          document.getElementById("output").innerHTML = "output is <span style='color: red;'>" + Interpolation_y + "</span>";
          break; 

        }

      }

    })
    .catch(error => {

      console.error('Error reading CSV file:', error);

    });
}