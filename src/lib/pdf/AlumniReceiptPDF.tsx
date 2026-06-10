"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: "#ffffff", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40, borderBottom: 2, borderBottomColor: "#059669", paddingBottom: 20 },
  logoSection: { flexDirection: "column" },
  schoolName: { fontSize: 24, fontWeight: "bold", color: "#064e3b" },
  tagline: { fontSize: 10, color: "#059669", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 },
  receiptTitle: { fontSize: 32, fontWeight: "bold", color: "#e2e8f0", position: "absolute", right: 0, top: 10 },
  section: { marginBottom: 30 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingBottom: 5, borderBottom: 1, borderBottomColor: "#f1f5f9" },
  label: { fontSize: 10, color: "#64748b", textTransform: "uppercase" },
  value: { fontSize: 12, color: "#1e293b", fontWeight: "bold" },
  amountSection: { backgroundColor: "#f8fafc", padding: 20, borderRadius: 10, marginTop: 20, borderLeft: 4, borderLeftColor: "#059669" },
  amountLabel: { fontSize: 12, color: "#059669", fontWeight: "bold", marginBottom: 5 },
  amountValue: { fontSize: 28, fontWeight: "bold", color: "#064e3b" },
  footer: { marginTop: 60, textAlign: "center", borderTop: 1, borderTopColor: "#f1f5f9", paddingTop: 20 },
  footerText: { fontSize: 9, color: "#94a3b8", lineHeight: 1.5 },
  signature: { marginTop: 40, flexDirection: "row", justifyContent: "flex-end" },
  sigLine: { borderTop: 1, borderTopColor: "#1e293b", width: 150, textAlign: "center", paddingTop: 5 },
  sigText: { fontSize: 10, color: "#1e293b", fontWeight: "bold" }
});

export default function AlumniReceiptPDF({ 
  alumniName, 
  project, 
  amount, 
  date, 
  receiptId 
}: { 
  alumniName: string;
  project: string;
  amount: number;
  date: string;
  receiptId: string;
}) {
  return (
    <Document title={`Receipt - ${receiptId}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.schoolName}>Demo Model School & College</Text>
            <Text style={styles.tagline}>Excellence in Education Since 1995</Text>
          </View>
          <Text style={styles.receiptTitle}>RECEIPT</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Receipt Number</Text>
              <Text style={styles.value}>{receiptId}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.label}>Date of Contribution</Text>
              <Text style={styles.value}>{new Date(date).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contributor Details</Text>
          <Text style={[styles.value, { fontSize: 16, marginTop: 5 }]}>{alumniName}</Text>
          <Text style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Verified Alumni Member</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contribution For</Text>
          <Text style={[styles.value, { fontSize: 16, marginTop: 5 }]}>{project}</Text>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Total Amount Received</Text>
          <Text style={styles.amountValue}>BDT {amount.toLocaleString()}.00</Text>
          <Text style={{ fontSize: 9, color: "#64748b", marginTop: 5 }}>
            This contribution is tax-exempt under section 44(2) of the IT Ordinance.
          </Text>
        </View>

        <View style={styles.signature}>
          <View style={styles.sigLine}>
            <Text style={styles.sigText}>Finance Officer</Text>
            <Text style={{ fontSize: 8, color: "#94a3b8" }}>Electronic Signature</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Demo Model School & College Alumni Association{"\n"}
            Main Campus, Dhaka, Bangladesh | contact@demo-school.edu{"\n"}
            This is a computer-generated document and does not require a physical stamp.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
