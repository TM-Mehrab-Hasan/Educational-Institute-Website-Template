import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { SealComponent } from './SealComponent';

Font.register({
  family: 'NotoSans',
  src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff',
});
Font.register({
  family: 'NotoSansBold',
  src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff',
});

const GREEN  = '#008236';
const WHITE  = '#FFFFFF';
const LIGHT  = '#E8F5EE';
const BORDER = '#C8E6D4';
const DARK   = '#1a1a1a';
const MUTED  = '#555555';
const SLATE  = '#64748b';

const s = StyleSheet.create({
  page:        { backgroundColor: WHITE, padding: 28, fontSize: 9, fontFamily: 'NotoSans', color: DARK },
  watermark:   { position: 'absolute', top: '38%', left: '8%', fontSize: 52, color: 'rgba(0,130,54,0.05)', fontFamily: 'NotoSansBold', transform: 'rotate(-35deg)', letterSpacing: 4 },

  // Letterhead
  letterhead:  { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: GREEN, paddingBottom: 10, marginBottom: 12, gap: 14 },
  logo:        { width: 52, height: 52, objectFit: 'contain' },
  schoolName:  { fontSize: 17, fontFamily: 'NotoSansBold', color: GREEN, letterSpacing: 1.5, textTransform: 'uppercase' },
  docTitle:    { fontSize: 10, color: MUTED, marginTop: 2, letterSpacing: 0.5 },

  // Receipt banner
  banner:      { backgroundColor: GREEN, borderRadius: 8, padding: '12 16', marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTitle: { fontSize: 14, fontFamily: 'NotoSansBold', color: WHITE, textTransform: 'uppercase', letterSpacing: 1 },
  bannerSub:   { fontSize: 8, color: 'rgba(255,255,255,0.7)', marginTop: 3, letterSpacing: 0.5 },
  receiptNo:   { fontSize: 18, fontFamily: 'NotoSansBold', color: WHITE },
  receiptLabel:{ fontSize: 7, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.8 },

  // Student info
  infoGrid:    { flexDirection: 'row', gap: 10, marginBottom: 14 },
  infoBox:     { flex: 1, backgroundColor: LIGHT, borderRadius: 5, padding: '8 12' },
  infoLine:    { flexDirection: 'row', marginBottom: 4 },
  infoLabel:   { width: 90, fontSize: 8, color: MUTED, fontFamily: 'NotoSansBold', textTransform: 'uppercase' },
  infoValue:   { flex: 1, fontSize: 8, color: DARK, fontFamily: 'NotoSansBold' },

  // Table
  table:       { borderWidth: 1, borderColor: BORDER, borderRadius: 4, overflow: 'hidden', marginBottom: 14 },
  headerRow:   { flexDirection: 'row', backgroundColor: GREEN, padding: '7 0' },
  dataRow:     { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, padding: '8 0' },
  altRow:      { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, padding: '8 0', backgroundColor: LIGHT },
  totalRow:    { flexDirection: 'row', borderTopWidth: 2, borderTopColor: GREEN, padding: '9 0', backgroundColor: '#f0fdf4' },

  colDesc:     { flex: 3, paddingLeft: 10, fontSize: 9 },
  colType:     { flex: 1.2, textAlign: 'center', fontSize: 8 },
  colDate:     { flex: 1.5, textAlign: 'center', fontSize: 8 },
  colAmount:   { flex: 1, textAlign: 'right', paddingRight: 10, fontSize: 9 },
  headerText:  { color: WHITE, fontFamily: 'NotoSansBold', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Badge
  badge:       { backgroundColor: '#dcfce7', color: GREEN, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2, fontSize: 7, fontFamily: 'NotoSansBold', textTransform: 'uppercase' },

  // Amount summary
  amtBox:      { backgroundColor: '#0f172a', borderRadius: 8, padding: '12 16', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  amtLabel:    { fontSize: 8, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.8 },
  amtValue:    { fontSize: 20, fontFamily: 'NotoSansBold', color: WHITE, marginTop: 3 },
  amtCurrency: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 6 },

  // Stamp
  stampBox:    { borderWidth: 1, borderColor: BORDER, borderRadius: 6, padding: '8 14', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stampText:   { fontSize: 7, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.6 },
  stampLine:   { borderTopWidth: 1, borderTopColor: BORDER, width: 120, marginTop: 20 },

  // Note box
  noteBox:     { backgroundColor: LIGHT, borderRadius: 5, padding: '6 10', marginBottom: 8 },
  noteText:    { fontSize: 7, color: SLATE, lineHeight: 1.5 },

  // Footer
  footer:      { position: 'absolute', bottom: 22, left: 28, right: 28, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' },
  footerText:  { fontSize: 7, color: MUTED },
});

export interface ReceiptData {
  studentName: string;
  studentID: string;
  className: string;
  roll: string;
  receiptNo: string;
  paidDate: string;
  fees: {
    id: string;
    title: string;
    amount: number;
    type: string;
    dueDate: string;
    paidDate?: string;
    receiptNo?: string;
  }[];
  totalAmount: number;
  schoolName: string;
  logoUrl: string;
}

export default function ReceiptPDF({ data }: { data: ReceiptData }) {
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <Document title={`Receipt - ${data.receiptNo}`} author={data.schoolName}>
      <Page size="A4" style={s.page}>
        <Text style={s.watermark}>PAID</Text>

        {/* Letterhead */}
        <View style={s.letterhead}>
          {data.logoUrl ? <Image src={data.logoUrl} style={s.logo} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={s.schoolName}>{data.schoolName}</Text>
            <Text style={s.docTitle}>PAYMENT RECEIPT  |  OFFICIAL DOCUMENT</Text>
          </View>
        </View>

        {/* Receipt banner */}
        <View style={s.banner}>
          <View>
            <Text style={s.bannerTitle}>Payment Receipt</Text>
            <Text style={s.bannerSub}>This receipt confirms payment successfully received</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.receiptLabel}>Receipt No.</Text>
            <Text style={s.receiptNo}>{data.receiptNo}</Text>
          </View>
        </View>

        {/* Student info */}
        <View style={s.infoGrid}>
          <View style={s.infoBox}>
            {[
              ['Student Name', data.studentName],
              ['Student ID',   data.studentID],
              ['Class',        data.className],
              ['Class Roll',   data.roll],
            ].map(([label, value]) => (
              <View key={label} style={s.infoLine}>
                <Text style={s.infoLabel}>{label}</Text>
                <Text style={s.infoValue}>{value}</Text>
              </View>
            ))}
          </View>
          <View style={s.infoBox}>
            {[
              ['Payment Date', data.paidDate],
              ['Generated',    today],
              ['Mode',         'Online Portal'],
              ['Status',       'PAID IN FULL'],
            ].map(([label, value]) => (
              <View key={label} style={s.infoLine}>
                <Text style={s.infoLabel}>{label}</Text>
                <Text style={[s.infoValue, label === 'Status' ? { color: GREEN } : {}]}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Fee table */}
        <View style={s.table}>
          <View style={s.headerRow}>
            <Text style={[s.colDesc,   s.headerText]}>Description</Text>
            <Text style={[s.colType,   s.headerText]}>Type</Text>
            <Text style={[s.colDate,   s.headerText]}>Due Date</Text>
            <Text style={[s.colAmount, s.headerText]}>Amount (BDT)</Text>
          </View>
          {data.fees.map((fee, i) => (
            <View key={fee.id} style={i % 2 === 0 ? s.dataRow : s.altRow}>
              <View style={s.colDesc}>
                <Text style={{ fontFamily: 'NotoSansBold', fontSize: 9 }}>{fee.title}</Text>
                {fee.receiptNo && (
                  <Text style={{ fontSize: 7, color: SLATE, marginTop: 2 }}>{fee.receiptNo}</Text>
                )}
              </View>
              <View style={[s.colType, { alignItems: 'center' }]}>
                <Text style={s.badge}>{fee.type}</Text>
              </View>
              <Text style={s.colDate}>{fee.dueDate}</Text>
              <Text style={[s.colAmount, { fontFamily: 'NotoSansBold' }]}>
                BDT {fee.amount.toLocaleString()}
              </Text>
            </View>
          ))}
          <View style={s.totalRow}>
            <Text style={[s.colDesc,   { fontFamily: 'NotoSansBold', color: GREEN }]}>TOTAL PAID</Text>
            <Text style={s.colType} />
            <Text style={s.colDate} />
            <Text style={[s.colAmount, { fontFamily: 'NotoSansBold', color: GREEN, fontSize: 10 }]}>
              BDT {data.totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Amount summary */}
        <View style={s.amtBox}>
          <View>
            <Text style={s.amtLabel}>Total Amount Paid</Text>
            <Text style={s.amtValue}>BDT {data.totalAmount.toLocaleString()}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.amtCurrency}>BDT  |  Bangladeshi Taka</Text>
            <Text style={[s.amtLabel, { marginTop: 6, color: GREEN }]}>Status: CLEARED</Text>
          </View>
        </View>

        {/* Stamp area */}
        <View style={s.stampBox}>
          <View>
            <Text style={s.stampText}>Cashier / Accounts</Text>
            <View style={s.stampLine} />
            <Text style={[s.stampText, { marginTop: 4 }]}>Signature</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={s.stampText}>Official Seal</Text>
            <View style={{ marginTop: 4 }}>
              <SealComponent logoUrl={data.logoUrl} size={65} />
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.stampText}>Authorised by</Text>
            {/* Principal's signature */}
            <Image 
              src="/images/principal's%20signature.png" 
              style={{ width: 60, height: 30, marginTop: 6, marginBottom: 2, objectFit: 'contain' }} 
            />
            <Text style={[s.stampText, { marginTop: 4 }]}>Principal</Text>
          </View>
        </View>

        {/* Note */}
        <View style={s.noteBox}>
          <Text style={s.noteText}>
            {'This is a computer-generated receipt and is valid without a signature if bearing an official seal.\n'}
            {'Keep this receipt for your records. For queries, contact the accounts office.\n'}
            {data.schoolName} {'|'} Academic Financial Management System
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>{data.schoolName}  |  Official Payment Receipt  |  {data.receiptNo}</Text>
          <Text style={s.footerText}>Generated: {today}</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
