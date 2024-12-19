import excel from 'excel4node';

export function generateExcel(data) {
  const wb = new excel.Workbook();
  const ws = wb.addWorksheet('Report');
  
  let row = 1;
  
  // Add headers
  Object.keys(data).forEach((key, index) => {
    ws.cell(row, index + 1).string(key);
  });
  
  row++;
  
  // Add data
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => {
        Object.values(item).forEach((val, colIndex) => {
          ws.cell(row, colIndex + 1).string(String(val));
        });
        row++;
      });
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        ws.cell(row, 1).string(subKey);
        ws.cell(row, 2).string(String(subValue));
        row++;
      });
    } else {
      ws.cell(row, 1).string(String(value));
      row++;
    }
  });
  
  return wb;
}