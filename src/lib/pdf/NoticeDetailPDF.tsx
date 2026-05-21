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

const GREEN   = '#008236';
const WHITE   = '#FFFFFF';
const LIGHT   = '#E8F5EE';
const BORDER  = '#C8E6D4';
const DARK    = '#1a1a1a';
const MUTED   = '#555555';
const RED     = '#DC2626';

const s = StyleSheet.create({
  page:        { backgroundColor: WHITE, padding: 28, fontSize: 10, fontFamily: 'NotoSans', color: DARK },
  
  // Letterhead
  letterhead:  { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: GREEN, paddingBottom: 12, marginBottom: 14, gap: 14 },
  logo:        { width: 50, height: 50, objectFit: 'contain' },
  schoolInfo:  { flex: 1 },
  schoolName:  { fontSize: 16, fontFamily: 'NotoSansBold', color: GREEN, letterSpacing: 1.5, textTransform: 'uppercase' },
  schoolTag:   { fontSize: 8, color: MUTED, marginTop: 2, letterSpacing: 0.5 },

  // Title section
  titleSection: { marginBottom: 16 },
  badge:       { display: 'flex', backgroundColor: GREEN, color: WHITE, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 3, fontSize: 7, fontFamily: 'NotoSansBold', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 },
  badgeUrgent: { backgroundColor: RED },
  title:       { fontSize: 18, fontFamily: 'NotoSansBold', color: DARK, marginBottom: 6, lineHeight: 1.4 },
  meta:        { flexDirection: 'row', gap: 12, fontSize: 9, color: MUTED, marginBottom: 4 },
  metaItem:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  divider:     { height: 1, backgroundColor: BORDER, marginVertical: 12 },

  // Content
  content:     { lineHeight: 1.4, marginBottom: 16, paddingLeft: 8 },
  paragraph:   { marginBottom: 10, fontSize: 10, textAlign: 'justify' },
  heading:     { fontSize: 12, fontFamily: 'NotoSansBold', color: GREEN, marginTop: 14, marginBottom: 8, textTransform: 'uppercase' },
  listItem:    { marginBottom: 8, marginLeft: 18, flexDirection: 'row', alignItems: 'flex-start' },
  bulletDot:   { width: 4, height: 4, borderRadius: 2, backgroundColor: GREEN, marginTop: 5, marginRight: 10, alignSelf: 'flex-start' },
  listText:    { flex: 1, fontSize: 10, lineHeight: 1.4 },

  // Footer
  footer:      { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: BORDER, fontSize: 8, color: MUTED, textAlign: 'center' },
});

export interface NoticeDetailPDFProps {
  title: string;
  date: string;
  category: string;
  isUrgent: boolean;
  content: string;
  schoolName: string;
  logoUrl: string;
}

export default function NoticeDetailPDF({ title, date, category, isUrgent, content, schoolName, logoUrl }: NoticeDetailPDFProps) {
  // Parse HTML content into structured sections sequentially
  const parseContent = (html: string) => {
    const sections: Array<{ type: 'paragraph' | 'heading' | 'listItem'; text: string }> = [];
    
    // Replace newlines and extra spaces to normalize the HTML
    const cleanHtml = html.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');
    
    // Improved regex to handle tags more robustly
    const tagRegex = /<(p|h[1-6]|li)(?:[^>]*)>(.*?)<\/\1>/gi;
    
    let match;
    while ((match = tagRegex.exec(cleanHtml)) !== null) {
      const tagName = match[1].toLowerCase();
      const rawContent = match[2];
      
      // Strip any remaining inner HTML tags and decode basic entities if needed
      const cleanText = rawContent
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
      
      if (cleanText) {
        if (tagName.startsWith('h')) {
          sections.push({ type: 'heading', text: cleanText });
        } else if (tagName === 'li') {
          sections.push({ type: 'listItem', text: cleanText });
        } else {
          sections.push({ type: 'paragraph', text: cleanText });
        }
      }
    }
    
    // Fallback if no supported tags were found
    return sections.length > 0 
      ? sections 
      : [{ type: 'paragraph', text: html.replace(/<[^>]*>/g, '').trim() }];
  };

  const sections = parseContent(content);
  
  return (
    <Document title={title} author={schoolName}>
      <Page size="A4" style={s.page}>
        {/* Watermark */}
        <View style={{ position: 'absolute', top: 80, left: 40, fontSize: 80, color: 'rgba(0,130,54,0.08)', fontFamily: 'NotoSansBold', transform: 'rotate(-45deg)' }}>
          <Text>NOTICE</Text>
        </View>

        {/* Letterhead */}
        <View style={s.letterhead}>
          {logoUrl && (
            <Image src={logoUrl} style={s.logo} />
          )}
          <View style={s.schoolInfo}>
            <Text style={s.schoolName}>{schoolName}</Text>
            <Text style={s.schoolTag}>Official Notice</Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={s.titleSection}>
          <Text style={[s.badge, isUrgent ? s.badgeUrgent : {}]}>
            {category}
          </Text>
          <Text style={s.title}>{title}</Text>
          <View style={s.meta}>
            <Text style={s.metaItem}>📅 {date}</Text>
            <Text style={s.metaItem}>REF: NOTICE-{date.replace(/\s+/g, '-')}-{category.toUpperCase().substring(0, 3)}</Text>
          </View>
        </View>

        <View style={s.divider} />

        {/* Content - Properly formatted */}
        <View style={s.content}>
          {sections.map((section, idx) => {
            if (section.type === 'heading') {
              return (
                <Text key={idx} style={s.heading}>
                  {section.text}
                </Text>
              );
            } else if (section.type === 'listItem') {
              return (
                <View key={idx} style={s.listItem}>
                  <View style={s.bulletDot} />
                  <Text style={s.listText}>{section.text}</Text>
                </View>
              );
            } else {
              return (
                <Text key={idx} style={s.paragraph}>
                  {section.text}
                </Text>
              );
            }
          })}
        </View>

        {/* Signature & Seal Area */}
        <View style={{ marginTop: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: BORDER, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Text style={{ fontSize: 7, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 12 }}>Issued by</Text>
            {/* Principal's signature */}
            <Image 
              src="/images/principal's%20signature.png" 
              style={{ width: 60, height: 25, objectFit: 'contain' }} 
            />
            <Text style={{ fontSize: 7, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 4 }}>Principal</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <SealComponent logoUrl={logoUrl} size={65} />
            <Text style={{ fontSize: 7, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 6 }}>Official Seal</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text>This is an official notice from {schoolName}.</Text>
          <Text style={{ marginTop: 4, fontSize: 7, color: '#999' }}>
            Generated on {new Date().toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
