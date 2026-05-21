import { readFileSync, writeFileSync } from 'fs';

const path = './src/components/admission/ApplicationForm.tsx';
let content = readFileSync(path, 'utf8');

// Find the old dummy upload section and replace with PhotoUpload component call
const oldSection = `                <div className="md:col-span-2">\r\n                   <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Upload Photo (Passport Size)</label>\r\n                  <div className="mt-2 border-2 border-dashed border-ui-border rounded-2xl p-8 text-center hover:border-brand-primary transition-colors group cursor-pointer">\r\n                    <Upload size={32} className="mx-auto mb-4 text-slate-300 group-hover:text-brand-primary transition-colors" />\r\n                    <p className="text-sm font-bold text-text-muted group-hover:text-text-main transition-colors">Click to upload or drag and drop</p>\r\n                    <p className="text-[10px] text-slate-400 mt-2 uppercase">PNG, JPG or JPEG (Max 2MB)</p>\r\n                  </div>\r\n                </div>`;

const newSection = `                <div className="md:col-span-2">\r\n                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Upload Photo (Passport Size) <span className="text-red-500">*</span></label>\r\n                  <PhotoUpload\r\n                    value={formData.photo || ''}\r\n                    onChange={(dataUrl) => {\r\n                      const newFormData = { ...formData, photo: dataUrl };\r\n                      setFormData(newFormData);\r\n                      updateApplication({ formData: newFormData });\r\n                    }}\r\n                  />\r\n                </div>`;

if (content.includes(oldSection)) {
  content = content.replace(oldSection, newSection);
  writeFileSync(path, content, 'utf8');
  console.log('SUCCESS: PhotoUpload wired in ApplicationForm.tsx');
} else {
  console.log('NOT FOUND - trying alternative match...');
  // Try without carriage returns
  const alt = oldSection.replace(/\r\n/g, '\n');
  if (content.includes(alt)) {
    content = content.replace(alt, newSection.replace(/\r\n/g, '\n'));
    writeFileSync(path, content, 'utf8');
    console.log('SUCCESS (LF): PhotoUpload wired');
  } else {
    console.log('FAILED: Could not find upload section. Dumping lines 346-354...');
    const lines = content.split(/\r?\n/);
    lines.slice(344, 354).forEach((l, i) => console.log(`${345+i}: ${JSON.stringify(l)}`));
  }
}
