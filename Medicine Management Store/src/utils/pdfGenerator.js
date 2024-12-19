import PDFDocument from 'pdfkit';

export function generatePDF(data) {
  const doc = new PDFDocument();
  
  // Add report title
  doc.fontSize(20).text('Pharmacy Report', { align: 'center' });
  doc.moveDown();
  
  // Add generation date
  doc.fontSize(12).text(`Generated: ${data.generatedAt}`);
  doc.moveDown();
  
  // Add report data
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'generatedAt') {
      if (Array.isArray(value)) {
        doc.fontSize(14).text(key);
        value.forEach(item => {
          doc.fontSize(10).text(JSON.stringify(item, null, 2));
          doc.moveDown();
        });
      } else if (typeof value === 'object') {
        doc.fontSize(14).text(key);
        doc.fontSize(10).text(JSON.stringify(value, null, 2));
        doc.moveDown();
      } else {
        doc.fontSize(12).text(`${key}: ${value}`);
        doc.moveDown();
      }
    }
  });
  
  return doc;
}