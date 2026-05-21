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

// ── Interfaces ───────────────────────────────────────────────────────────────

interface CurriculumPDFProps {
  className: string;
  background?: string;
  version: string;
  lastUpdated: string;
  subjects: Subject[];
  schoolName: string;
  logoUrl: string;
}

// ── Palette ──────────────────────────────────────────────────────────────────

const GREEN  = '#008236';
const WHITE  = '#FFFFFF';
const LIGHT  = '#E8F5EE';
const BORDER = '#C8E6D4';
const DARK   = '#1a1a1a';
const MUTED  = '#555555';
const AMBER_BG = '#FEF9C3';
const AMBER_BORDER = '#F59E0B';
const AMBER_TEXT = '#78350F';

// ── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: { backgroundColor: WHITE, padding: 28, fontSize: 9, fontFamily: 'Helvetica', color: DARK },

  letterhead: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: GREEN, paddingBottom: 10, marginBottom: 8, gap: 14 },
  logo: { width: 56, height: 56, objectFit: 'contain' },
  schoolName: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: GREEN, letterSpacing: 2, textTransform: 'uppercase' },
  docTitle: { fontSize: 10, color: MUTED, marginTop: 2, letterSpacing: 0.5 },

  metaBar: { flexDirection: 'row', backgroundColor: LIGHT, borderRadius: 6, padding: '6 12', marginBottom: 12, gap: 20, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  metaText: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.8 },

  // Section header inside table
  sectionRow: { flexDirection: 'row', backgroundColor: '#d1fae5', padding: '5 8', borderTopWidth: 1, borderTopColor: BORDER },
  sectionText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#065f46', textTransform: 'uppercase', letterSpacing: 0.8 },

  table: { borderWidth: 1, borderColor: BORDER, borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: GREEN, padding: '7 8' },
  tableRow: { flexDirection: 'row', padding: '6 8', borderTopWidth: 1, borderTopColor: BORDER },
  tableRowAlt: { flexDirection: 'row', padding: '6 8', borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: LIGHT },
  totalRow: { flexDirection: 'row', padding: '7 8', borderTopWidth: 2, borderTopColor: GREEN, backgroundColor: '#f8fafC' },

  col_num:     { width: 26 },
  col_name:    { flex: 3 },
  col_bengali: { flex: 3 },
  col_marks:   { width: 55, textAlign: 'center' },
  col_type:    { width: 75, textAlign: 'right' },

  headerText:       { fontSize: 8, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 },
  cellText:         { fontSize: 8, color: DARK },
  bengaliText:      { fontSize: 8, color: DARK, fontFamily: 'NotoSansBengali' },
  cellNameText:     { fontSize: 8, fontFamily: 'Helvetica-Bold', color: DARK },
  marksText:        { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GREEN, textAlign: 'center' },
  totalText:        { fontSize: 9, fontFamily: 'Helvetica-Bold', color: DARK },
  totalMarksText:   { fontSize: 9, fontFamily: 'Helvetica-Bold', color: GREEN, textAlign: 'center' },
  compulsoryBadge:  { fontSize: 7.5, color: '#1d4ed8', fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  electiveBadge:    { fontSize: 7.5, color: '#15803d', fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  optionalBadge:    { fontSize: 7.5, color: '#b45309', fontFamily: 'Helvetica-Bold', textAlign: 'right' },

  noteBox: { flexDirection: 'row', backgroundColor: AMBER_BG, borderLeftWidth: 4, borderLeftColor: AMBER_BORDER, borderRadius: 3, padding: '8 12', marginBottom: 14, gap: 6 },
  noteText: { fontSize: 8, color: AMBER_TEXT, flex: 1 },
  noteBold: { fontFamily: 'Helvetica-Bold' },

  sigRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, paddingTop: 10, borderTopWidth: 1, borderTopColor: BORDER },
  sigItem: { alignItems: 'center', width: 140 },
  sigLine: { width: 120, borderTopWidth: 1, borderTopColor: '#94a3b8', marginBottom: 4 },
  sigLabel: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1, color: MUTED },

  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 6, borderTopWidth: 1, borderTopColor: BORDER },
  footerText: { fontSize: 7, color: '#94a3b8' },
});

// ── Sub-Components ────────────────────────────────────────────────────────────

const SubjectRows = ({ list, startIdx }: { list: Subject[]; startIdx: number }) => {
  const badgeStyle = (type: string) => {
    if (type === 'Compulsory') return s.compulsoryBadge;
    if (type === 'Elective')   return s.electiveBadge;
    return s.optionalBadge;
  };

  return (
    <>
      {list.map((sub, i) => (
        <View key={sub.id} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
          <Text style={[s.cellText, s.col_num]}>{startIdx + i + 1}</Text>
          <Text style={[s.cellNameText, s.col_name]}>{sub.name}</Text>
          <Text style={[s.bengaliText, s.col_bengali]}>{sub.bengaliName ?? '—'}</Text>
          <Text style={[s.marksText, s.col_marks]}>{sub.marks}</Text>
          <Text style={[badgeStyle(sub.type), s.col_type]}>{sub.type}</Text>
        </View>
      ))}
    </>
  );
};

// ── Document Component ────────────────────────────────────────────────────────

export function CurriculumPDF({
  className, background, version, lastUpdated,
  subjects, schoolName, logoUrl,
}: CurriculumPDFProps) {
  const compulsory = subjects.filter(s => s.type === 'Compulsory');
  const elective   = subjects.filter(s => s.type === 'Elective');
  const optional   = subjects.filter(s => s.type === 'Optional');
  const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);

  return (
    <Document title={`${className} Curriculum — ${schoolName}`} author={schoolName}>
      <Page size="A4" orientation="portrait" style={s.page}>

        {/* Letterhead */}
        <View style={s.letterhead}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.schoolName}>{schoolName}</Text>
            <Text style={s.docTitle}>Academic Curriculum — Session 2026-2027</Text>
          </View>
        </View>

        {/* Meta bar */}
        <View style={s.metaBar}>
          {[
            className,
            background ? `${background} Background` : null,
            `${version} Version`,
            `${subjects.length} Subjects`,
            `Total: ${totalMarks} Marks`,
          ].filter(Boolean).map((item, i) => (
            <View key={i} style={s.metaItem}>
              <View style={s.metaDot} />
              <Text style={s.metaText}>{item as string}</Text>
            </View>
          ))}
        </View>

        {/* Subject table */}
        <View style={s.table}>
          {/* Header */}
          <View style={s.tableHeaderRow}>
            <Text style={[s.headerText, s.col_num]}>#</Text>
            <Text style={[s.headerText, s.col_name]}>Subject Name</Text>
            <Text style={[s.headerText, s.col_bengali]}>Bengali Name</Text>
            <Text style={[s.headerText, s.col_marks]}>Marks</Text>
            <Text style={[s.headerText, s.col_type]}>Type</Text>
          </View>

          {/* Compulsory */}
          {compulsory.length > 0 && (
            <>
              <View style={s.sectionRow}>
                <Text style={s.sectionText}>Compulsory Subjects ({compulsory.length})</Text>
              </View>
              <SubjectRows list={compulsory} startIdx={0} />
            </>
          )}

          {/* Elective */}
          {elective.length > 0 && (
            <>
              <View style={s.sectionRow}>
                <Text style={s.sectionText}>Elective Subjects ({elective.length})</Text>
              </View>
              <SubjectRows list={elective} startIdx={compulsory.length} />
            </>
          )}

          {/* Optional */}
          {optional.length > 0 && (
            <>
              <View style={s.sectionRow}>
                <Text style={s.sectionText}>Optional / 4th Subject ({optional.length}) — Choose one</Text>
              </View>
              <SubjectRows list={optional} startIdx={compulsory.length + elective.length} />
            </>
          )}

          {/* Total row */}
          <View style={s.totalRow}>
            <Text style={[s.totalText, s.col_num]} />
            <Text style={[s.totalText, { flex: 6 }]}>Total Marks</Text>
            <Text style={[s.totalMarksText, s.col_marks]}>{totalMarks}</Text>
            <Text style={[s.cellText, s.col_type]} />
          </View>
        </View>

        {/* Note for optional subjects */}
        {optional.length > 0 && (
          <View style={s.noteBox}>
            <Text style={s.noteText}>
              <Text style={s.noteBold}>ℹ Note: </Text>
              Students must choose one (1) subject from the Optional / 4th Subject group listed above.
            </Text>
          </View>
        )}

        {/* Signatures & Seal */}
        <View style={s.sigRow}>
          <View style={s.sigItem}>
            <View style={s.sigLine} />
            <Text style={s.sigLabel}>Class Teacher</Text>
          </View>
          <View style={[s.sigItem, { width: 80 }]}>
            <SealComponent logoUrl={logoUrl} size={60} />
            <Text style={[s.sigLabel, { marginTop: 5 }]}>Official Seal</Text>
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
          <Text style={s.footerText}>{schoolName} — Official Document — NCTB Approved Curriculum</Text>
          <Text style={s.footerText}>Last Updated: {lastUpdated} | Session 2026</Text>
        </View>

      </Page>
    </Document>
  );
}
