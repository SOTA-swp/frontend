"use client";
import React from 'react';
import { Page, Document, StyleSheet, PDFDownloadLink, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  title:{
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  text:{
    fontSize: 12,
    margin: 10,
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page} />
    <View>
      <Text style={styles.title}>PlatnTitle</Text>
      <Text style={styles.text}>aaaaaaaaa</Text>
    </View>
  </Document>
);

interface PDFProps {
  children: React.ReactNode;
}

export default function PDF({ children }: PDFProps){
  return (
    <PDFDownloadLink document={<MyDocument />} fileName="plan.pdf">
      {children}
    </PDFDownloadLink>
  )
}