import React from 'react';
import {
  Document, Page, View, Text, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { Subject } from '@/data/academic';
import { SealComponent } from './SealComponent';

// Register Bengali-capable font
Font.register({
  family: 'NotoSansBengali',
  src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-400-normal.woff',
});

Font.register({
  family: 'NotoSansBengaliBold',
  src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-700-normal.woff',
});

// ── Interfaces ───────────────────────────────────────────────────────────────

interface Period {
  time: string;
  subjectId: string;
  teacher?: string;
}

interface DayRoutine {
  day: string;
  periods: Period[];
}

interface RoutinePDFProps {
  className: string;
  background?: string;
  shift: string;
  version: string;
  lastUpdated: string;
  schedule: DayRoutine[];
  subjects: Subject[];
  schoolName: string;
  logoUrl: string;
}

// ── Palette ──────────────────────────────────────────────────────────────────

const GREEN  = '#008236';
const WHITE  = '#FFFFFF';
const LIGHT  = '#E8F5EE';  // very light green tint
const BORDER = '#C8E6D4';
const DARK   = '#1a1a1a';
const MUTED  = '#555555';
const AMBER  = '#92400E';
const AMBER_BG = '#FEF9C3';

// ── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: { backgroundColor: WHITE, padding: 24, fontSize: 9, fontFamily: 'Helvetica', color: DARK },

  // Letterhead
  letterhead: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: GREEN, paddingBottom: 10, marginBottom: 8, gap: 14 },
  logo: { width: 52, height: 52, objectFit: 'contain' },
  schoolInfo: { flex: 1 },
  schoolName: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: GREEN, letterSpacing: 2, textTransform: 'uppercase' },
  docTitle: { fontSize: 10, color: MUTED, marginTop: 2, letterSpacing: 0.5 },

  // Meta bar
  metaBar: { flexDirection: 'row', backgroundColor: LIGHT, borderRadius: 6, padding: '6 12', marginBottom: 10, gap: 20, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  metaText: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.8, color: DARK },

  // Timetable
  table: { borderWidth: 1, borderColor: BORDER, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: GREEN },
  tableRow: { flexDirection: 'row' },
  tableRowAlt: { flexDirection: 'row', backgroundColor: LIGHT },
  dayCell: { width: 72, padding: '7 8', borderRightWidth: 1, borderRightColor: BORDER },
  dayCellHeader: { width: 72, padding: '8 8', borderRightWidth: 1, borderRightColor: '#005a24' },
  periodCell: { flex: 1, padding: '7 6', borderRightWidth: 1, borderRightColor: BORDER, alignItems: 'center' },
  periodCellHeader: { flex: 1, padding: '8 6', borderRightWidth: 1, borderRightColor: '#005a24', alignItems: 'center' },
  breakCell: { flex: 1, padding: '7 6', borderRightWidth: 1, borderRightColor: BORDER, alignItems: 'center', backgroundColor: AMBER_BG },
  headerText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 },
  timeText: { fontSize: 7, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  dayText: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5, color: DARK },
  subjectText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: DARK, textAlign: 'center' },
  teacherText: { fontSize: 7, color: MUTED, textAlign: 'center', marginTop: 2 },
  breakText: { fontSize: 8, fontFamily: 'Helvetica-BoldOblique', color: AMBER },

  // Subject list
  sectionTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GREEN, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  subjectTable: { borderWidth: 1, borderColor: BORDER, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  subjectHeaderRow: { flexDirection: 'row', backgroundColor: GREEN, padding: '6 8' },
  subjectRow: { flexDirection: 'row', padding: '5 8', borderTopWidth: 1, borderTopColor: BORDER },
  subjectRowAlt: { flexDirection: 'row', padding: '5 8', borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: LIGHT },
  col_num:     { width: 24 },
  col_name:    { flex: 3 },
  col_bengali: { flex: 3 },
  col_marks:   { width: 50, textAlign: 'center' },
  col_type:    { width: 70, textAlign: 'right' },
  subjectHeaderText: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 },
  subjectCellText: { fontSize: 8, color: DARK },
  bengaliText: { fontSize: 8, color: DARK, fontFamily: 'NotoSansBengali' },
  subjectNameText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: DARK },
  marksText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GREEN, textAlign: 'center' },
  compulsoryBadge: { fontSize: 7, color: '#1d4ed8', fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  electiveBadge:   { fontSize: 7, color: '#15803d', fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  optionalBadge:   { fontSize: 7, color: '#b45309', fontFamily: 'Helvetica-Bold', textAlign: 'right' },

  // Signatures
  sigRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, paddingTop: 10, borderTopWidth: 1, borderTopColor: BORDER },
  sigItem: { alignItems: 'center', width: 140 },
  sigLine: { width: 120, borderTopWidth: 1, borderTopColor: '#94a3b8', marginBottom: 4 },
  sigLabel: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1, color: MUTED },

  // Footer
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 6, borderTopWidth: 1, borderTopColor: BORDER },
  footerText: { fontSize: 7, color: '#94a3b8' },
});

// ── Document Component ────────────────────────────────────────────────────────

export function RoutinePDF({
  className, background, shift, version, lastUpdated,
  schedule, subjects, schoolName, logoUrl,
}: RoutinePDFProps) {
  const firstDay = schedule[0]?.periods ?? [];
  let periodCounter = 0;

  const badgeStyle = (type: string) => {
    if (type === 'Compulsory') return s.compulsoryBadge;
    if (type === 'Elective')   return s.electiveBadge;
    return s.optionalBadge;
  };

  return (
    <Document title={`${className} Routine — ${schoolName}`} author={schoolName}>
      <Page size="A4" orientation="landscape" style={s.page}>

        {/* Letterhead */}
        <View style={s.letterhead}>
          <Image src={logoUrl} style={s.logo} />
          <View style={s.schoolInfo}>
            <Text style={s.schoolName}>{schoolName}</Text>
            <Text style={s.docTitle}>Class Routine — Academic Session 2026-2027</Text>
          </View>
        </View>

        {/* Meta bar */}
        <View style={s.metaBar}>
          {[
            className,
            background ? `${background} Background` : null,
            `${shift} Shift`,
            `${version} Version`,
            `${subjects.length} Subjects`,
          ].filter(Boolean).map((item, i) => (
            <View key={i} style={s.metaItem}>
              <View style={s.metaDot} />
              <Text style={s.metaText}>{item as string}</Text>
            </View>
          ))}
        </View>

        {/* Timetable */}
        <View style={s.table}>
          {/* Header */}
          <View style={s.tableHeaderRow}>
            <View style={s.dayCellHeader}><Text style={s.headerText}>Day</Text></View>
            {firstDay.map((p, i) => {
              const isBreak = p.subjectId === 'break';
              if (!isBreak) periodCounter++;
              return (
                <View key={i} style={s.periodCellHeader}>
                  <Text style={s.headerText}>{isBreak ? 'Break' : `Period ${periodCounter}`}</Text>
                  <Text style={s.timeText}>{p.time}</Text>
                </View>
              );
            })}
          </View>

          {/* Body rows */}
          {schedule.map((day, ri) => (
            <View key={day.day} style={ri % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <View style={s.dayCell}><Text style={s.dayText}>{day.day}</Text></View>
              {day.periods.map((p, ci) => {
                const isBreak = p.subjectId === 'break';
                const sub = isBreak ? null : subjects.find(s => s.id === p.subjectId);
                return (
                  <View key={ci} style={isBreak ? s.breakCell : s.periodCell}>
                    <Text style={isBreak ? s.breakText : s.subjectText}>
                      {isBreak ? 'Tiffin Break' : (sub?.name ?? p.subjectId)}
                    </Text>
                    {!isBreak && p.teacher && (
                      <Text style={s.teacherText}>{p.teacher}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Subject list */}
        <Text style={s.sectionTitle}>Subject List & Marks Distribution</Text>
        <View style={s.subjectTable}>
          <View style={s.subjectHeaderRow}>
            <Text style={[s.subjectHeaderText, s.col_num]}>#</Text>
            <Text style={[s.subjectHeaderText, s.col_name]}>Subject</Text>
            <Text style={[s.subjectHeaderText, s.col_bengali]}>Bengali Name</Text>
            <Text style={[s.subjectHeaderText, s.col_marks]}>Marks</Text>
            <Text style={[s.subjectHeaderText, s.col_type]}>Type</Text>
          </View>
          {subjects.map((sub, i) => (
            <View key={sub.id} style={i % 2 === 0 ? s.subjectRow : s.subjectRowAlt}>
              <Text style={[s.subjectCellText, s.col_num]}>{i + 1}</Text>
              <Text style={[s.subjectNameText, s.col_name]}>{sub.name}</Text>
              <Text style={[s.bengaliText, s.col_bengali]}>{sub.bengaliName ?? '—'}</Text>
              <Text style={[s.marksText, s.col_marks]}>{sub.marks}</Text>
              <Text style={[badgeStyle(sub.type), s.col_type]}>{sub.type}</Text>
            </View>
          ))}
        </View>

        {/* Signatures & Seal */}
        <View style={s.sigRow}>
          <View style={s.sigItem}>
            <View style={s.sigLine} />
            <Text style={s.sigLabel}>Class Teacher</Text>
          </View>
          <View style={[s.sigItem, { width: 80 }]}>
            <SealComponent logoUrl={logoUrl} size={55} />
            <Text style={[s.sigLabel, { marginTop: 4 }]}>Official Seal</Text>
          </View>
          <View style={s.sigItem}>
            {/* Principal's signature */}
            <Image 
              src="/images/principal's%20signature.png" 
              style={{ width: 60, height: 20, marginBottom: 5, objectFit: 'contain' }} 
            />
            <Text style={s.sigLabel}>Principal</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>{schoolName} — Official Document</Text>
          <Text style={s.footerText}>Last Updated: {lastUpdated} | Session 2026</Text>
        </View>

      </Page>
    </Document>
  );
}
