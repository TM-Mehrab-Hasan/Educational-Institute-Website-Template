import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { SealComponent } from './SealComponent';

// Register a font that covers latin + currency glyphs properly
Font.register({
  family: 'NotoSans',
  src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff',
});
Font.register({
  family: 'NotoSansBold',
  src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff',
});

const GREEN   = '#008236';
const WHITE   = '#FFFFFF';
const LIGHT   = '#E8F5EE';
const BORDER  = '#C8E6D4';
const DARK    = '#1a1a1a';
const MUTED   = '#555555';

const s = StyleSheet.create({
  page:        { backgroundColor: WHITE, padding: 20, fontSize: 8, fontFamily: 'NotoSans', color: DARK },
  watermark:   { position: 'absolute', top: '35%', left: '15%', fontSize: 40, color: 'rgba(0,130,54,0.03)', fontFamily: 'NotoSansBold', transform: 'rotate(-35deg)', letterSpacing: 4 },

  // Letterhead
  letterhead:  { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: GREEN, paddingBottom: 6, marginBottom: 8, gap: 10 },
  logo:        { width: 40, height: 40, objectFit: 'contain' },
  schoolName:  { fontSize: 14, fontFamily: 'NotoSansBold', color: GREEN, letterSpacing: 1.2, textTransform: 'uppercase' },
  docTitle:    { fontSize: 8, color: MUTED, marginTop: 1, letterSpacing: 0.5 },

  // Meta bar
  metaBar:     { flexDirection: 'row', backgroundColor: LIGHT, borderRadius: 4, padding: '4 8', marginBottom: 8, gap: 15, flexWrap: 'wrap' },
  metaItem:    { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaDot:     { width: 4, height: 4, borderRadius: 2, backgroundColor: GREEN },
  metaText:    { fontSize: 7, fontFamily: 'NotoSansBold', textTransform: 'uppercase', letterSpacing: 0.5, color: DARK },

  // Info row
  infoRow:     { flexDirection: 'row', gap: 10, marginBottom: 10 },
  photo:       { width: 60, height: 72, objectFit: 'cover', borderRadius: 3, borderWidth: 1, borderColor: BORDER },
  infoBox:     { flex: 1, backgroundColor: LIGHT, borderRadius: 4, padding: '6 10' },
  infoLine:    { flexDirection: 'row', marginBottom: 3 },
  infoLabel:   { width: 85, fontSize: 7, color: MUTED, fontFamily: 'NotoSansBold', textTransform: 'uppercase' },
  infoValue:   { flex: 1, fontSize: 7, color: DARK, fontFamily: 'NotoSansBold' },

  // Summary bar
  summaryBar:  { flexDirection: 'row', backgroundColor: GREEN, borderRadius: 5, padding: '6 12', marginBottom: 10 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel:{ fontSize: 6, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 1 },
  summaryValue:{ fontSize: 12, fontFamily: 'NotoSansBold', color: WHITE },

  // Table
  table:       { borderWidth: 1, borderColor: BORDER, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  headerRow:   { flexDirection: 'row', backgroundColor: GREEN, padding: '6 0' },
  dataRow:     { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, padding: '5 0' },
  altRow:      { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, padding: '5 0', backgroundColor: LIGHT },
  totalRow:    { flexDirection: 'row', borderTopWidth: 2, borderTopColor: GREEN, padding: '6 0', backgroundColor: '#f0fdf4' },

  colSubject:  { flex: 3, paddingLeft: 10, fontSize: 7 },
  colMarks:    { flex: 1, textAlign: 'center', fontSize: 7 },
  colGrade:    { flex: 1, textAlign: 'center', fontSize: 7 },
  colGP:       { flex: 1, textAlign: 'right', paddingRight: 10, fontSize: 7 },
  headerText:  { color: WHITE, fontFamily: 'NotoSansBold', fontSize: 7, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Attendance bar
  attBar:      { backgroundColor: '#0f172a', borderRadius: 6, padding: '8 12', marginBottom: 10 },
  attLabel:    { fontSize: 6, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 },
  attTrack:    { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 3, height: 4, marginTop: 4 },
  attFill:     { backgroundColor: GREEN, borderRadius: 3, height: 4 },

  // Stamp area
  stampBox:    { borderWidth: 1, borderColor: BORDER, borderRadius: 5, padding: '6 10', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' },
  stampText:   { fontSize: 6, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Footer
  footer:      { position: 'absolute', bottom: 15, left: 20, right: 20, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 4, flexDirection: 'row', justifyContent: 'space-between' },
  footerText:  { fontSize: 6, color: MUTED },
});

export interface MarksheetData {
  studentName: string;
  studentID: string;
  roll: string;
  className: string;
  examName: string;
  examYear: string;
  group?: string;
  position?: number;
  totalStudents?: number;
  gpa: number;
  obtainedMarks: number;
  totalMarks: number;
  attendancePercent?: number;
  photoUrl?: string;
  results: { name: string; marks: number; grade: string; gp: number }[];
  schoolName: string;
  logoUrl: string;
}

export default function MarksheetPDF({ data }: { data: MarksheetData }) {
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const pct   = data.totalMarks > 0 ? Math.round((data.obtainedMarks / data.totalMarks) * 100) : 0;

  return (
    <Document title={`Marksheet - ${data.studentName}`} author={data.schoolName}>
      <Page size="A4" style={s.page}>
        <Text style={s.watermark}>OFFICIAL</Text>

        {/* Letterhead */}
        <View style={s.letterhead}>
          {data.logoUrl ? <Image src={data.logoUrl} style={s.logo} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={s.schoolName}>{data.schoolName}</Text>
            <Text style={s.docTitle}>ACADEMIC MARK SHEET  |  {data.examName}</Text>
          </View>
        </View>

        {/* Meta bar */}
        <View style={s.metaBar}>
          {[
            ['Class',  data.className],
            ['Year',   data.examYear],
            ['Exam',   data.examName],
            ...(data.group ? [['Group', data.group] as [string, string]] : []),
            ['Issued', today],
          ].map(([label, value]) => (
            <View key={label} style={s.metaItem}>
              <View style={s.metaDot} />
              <Text style={s.metaText}>{label}: {value}</Text>
            </View>
          ))}
        </View>

        {/* Student info + photo */}
        <View style={s.infoRow}>
          {data.photoUrl ? <Image src={data.photoUrl} style={s.photo} /> : null}
          <View style={s.infoBox}>
            {[
              ['Student Name', data.studentName],
              ['Student ID',   data.studentID],
              ['Class Roll',   data.roll],
              ['Class',        data.className],
              ...(data.position != null
                ? [['Position', `#${data.position} of ${data.totalStudents ?? '-'}`] as [string, string]]
                : []),
            ].map(([label, value]) => (
              <View key={label} style={s.infoLine}>
                <Text style={s.infoLabel}>{label}</Text>
                <Text style={s.infoValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Summary bar */}
        <View style={s.summaryBar}>
          {[
            ['Obtained',     String(data.obtainedMarks)],
            ['Total Marks',  String(data.totalMarks)],
            ['Percentage',   `${pct}%`],
            ['GPA',          data.gpa.toFixed(2)],
          ].map(([label, value]) => (
            <View key={label} style={s.summaryItem}>
              <Text style={s.summaryLabel}>{label}</Text>
              <Text style={s.summaryValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Subject table */}
        <View style={s.table}>
          <View style={s.headerRow}>
            <Text style={[s.colSubject, s.headerText]}>Subject</Text>
            <Text style={[s.colMarks,   s.headerText]}>Marks</Text>
            <Text style={[s.colGrade,   s.headerText]}>Grade</Text>
            <Text style={[s.colGP,      s.headerText]}>GP</Text>
          </View>
          {data.results.map((r, i) => (
            <View key={r.name} style={i % 2 === 0 ? s.dataRow : s.altRow}>
              <Text style={s.colSubject}>{r.name}</Text>
              <Text style={s.colMarks}>{r.marks}</Text>
              <Text style={[s.colGrade, { fontFamily: 'NotoSansBold', color: GREEN }]}>{r.grade}</Text>
              <Text style={[s.colGP,    { fontFamily: 'NotoSansBold' }]}>{r.gp.toFixed(1)}</Text>
            </View>
          ))}
          <View style={s.totalRow}>
            <Text style={[s.colSubject, { fontFamily: 'NotoSansBold', color: GREEN }]}>TOTAL</Text>
            <Text style={[s.colMarks,   { fontFamily: 'NotoSansBold' }]}>{data.obtainedMarks}</Text>
            <Text style={s.colGrade} />
            <Text style={[s.colGP,      { fontFamily: 'NotoSansBold' }]}>{data.gpa.toFixed(2)}</Text>
          </View>
        </View>

        {/* Attendance bar */}
        {data.attendancePercent != null && (
          <View style={s.attBar}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={s.attLabel}>Yearly Attendance Rate</Text>
              <Text style={[s.attLabel, { color: WHITE, fontFamily: 'NotoSansBold' }]}>{data.attendancePercent}%</Text>
            </View>
            <View style={s.attTrack}>
              <View style={[s.attFill, { width: `${data.attendancePercent}%` }]} />
            </View>
          </View>
        )}

        {/* Stamp / Signature area */}
        <View style={s.stampBox}>
          <View>
            <Text style={s.stampText}>Class Teacher</Text>
            <Text style={[s.stampText, { marginTop: 20 }]}>________________________</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={s.stampText}>Official Seal</Text>
            <View style={{ marginTop: 4 }}>
              <SealComponent logoUrl={data.logoUrl} size={65} />
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.stampText}>Principal</Text>
            {/* Principal's signature */}
            <Image 
              src="/images/principal's%20signature.png" 
              style={{ width: 60, height: 30, marginTop: 10, objectFit: 'contain' }} 
            />
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>{data.schoolName}  |  Official Academic Document  |  Not valid without seal</Text>
          <Text style={s.footerText}>Generated: {today}</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
