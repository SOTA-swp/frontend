"use client";
import React, { useState } from 'react';
import { Page, Document, StyleSheet, PDFDownloadLink, Text, pdf } from '@react-pdf/renderer';
import { Document as ShowPDF, Page as ShowPage, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const styles = StyleSheet. create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40
  },
  title:  {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text:  {
    fontSize: 12,
    marginBottom: 10,
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>PlanTitle</Text>
      <Text style={styles.text}>aaaaaaaaa</Text>
    </Page>
  </Document>
);

interface PDFProps {
  children:  React.ReactNode;
  previewClassName?: string;
}

export default function PDF({ children, previewClassName }: PDFProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  React.useEffect(() => {
    pdf(<MyDocument />).toBlob().then(blob => {
      setPdfUrl(URL.createObjectURL(blob));
    });
  }, []);

  return (
    <div>
      {pdfUrl && (
        <div className={previewClassName}>
          <ShowPDF file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from(new Array(numPages), (_, index) => (
              <ShowPage key={index} pageNumber={index + 1} width={500} renderTextLayer={false} renderAnnotationLayer={false} />
            ))}
          </ShowPDF>
        </div>
      )}
      <PDFDownloadLink document={<MyDocument />} fileName="plan.pdf">
        {children}
      </PDFDownloadLink>
    </div>
  );
}