import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType, PageOrientation,
} from 'docx'
import { saveAs } from 'file-saver'

const NAVY = '0C1A2E'
const GOLD  = '0EA5E9'   // college blue
const WHITE = 'FFFFFF'
const GREY  = '64748B'

const subjects = [
  { icon: '🤖', title: 'Artificial Intelligence', body: 'Build systems that learn, predict, and make decisions. Create chatbots, recommendation engines, and smart automation used by real businesses.' },
  { icon: '🎮', title: 'Game Design', body: 'Design and develop 2D and 3D games. Master Unity and Unreal Engine. Create experiences played by audiences worldwide.' },
  { icon: '🦾', title: 'Robotics', body: 'Programme physical machines to sense, move, and respond. Work in automation, manufacturing, healthcare, and agriculture.' },
  { icon: '🌐', title: 'Web Development', body: 'Build the websites and platforms businesses depend on. Front-end, back-end, full-stack — you choose your path.' },
  { icon: '📱', title: 'Mobile App Development', body: 'Put your product in every pocket. Build Android and iOS apps for local businesses, startups, and your own ideas.' },
  { icon: '🖥️', title: 'Desktop Software', body: 'Develop the tools professionals rely on daily — in offices, hospitals, schools, and government across Kurdistan.' },
]

function heading(text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel] = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: level === HeadingLevel.HEADING_1 ? 52 : 32 })],
  })
}

function body(text: string) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 20, color: '374151' })],
  })
}

function rule() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 1 } },
    children: [],
  })
}

function subjectTable() {
  const rows: TableRow[] = []
  for (let i = 0; i < subjects.length; i += 2) {
    const cells = [subjects[i], subjects[i + 1]].map(s => new TableCell({
      width: { size: 50, type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.CLEAR, color: 'F8FAFC', fill: 'F8FAFC' },
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' } },
      children: [
        new Paragraph({ children: [new TextRun({ text: `${s.icon}  ${s.title}`, bold: true, size: 22, color: NAVY })] }),
        new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: s.body, size: 18, color: GREY })] }),
      ],
    }))
    rows.push(new TableRow({ children: cells }))
  }
  return new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } })
}

export async function downloadWordDoc() {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 16838, height: 23811, orientation: PageOrientation.PORTRAIT }, // A3
          margin: { top: 720, bottom: 720, left: 900, right: 900 },
        },
      },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: 'NAWROZ UNIVERSITY  ·  COLLEGE OF SCIENCE', size: 18, color: GOLD, bold: true })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: 'College of Science', size: 24, color: NAVY, bold: true })] }),
        rule(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160, after: 40 }, children: [new TextRun({ text: 'COMPUTER SCIENCE', bold: true, size: 88, color: NAVY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 200 }, children: [new TextRun({ text: 'Department', bold: true, size: 36, color: GOLD })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 300 }, children: [new TextRun({ text: 'Build. Create. Innovate.  —  4 Years to Change Everything.', size: 26, color: GREY, italics: true })] }),
        rule(),

        new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: 'SIX TRACKS — CHOOSE YOUR PATH', bold: true, size: 24, color: NAVY })] }),
        subjectTable(),
        rule(),

        new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text: '💼  Work from home or on-site · Freelance or employed · Local or global', bold: true, size: 24, color: '0EA5E9' })] }),
        body('CS graduates can work in Kurdistan, the Gulf, Europe, or entirely remotely — building products and services for clients worldwide. Our experienced faculty guide you from your first line of code to your first professional role.'),

        new Paragraph({ spacing: { before: 160, after: 80 }, children: [new TextRun({ text: '👨‍🏫  Taught by Experienced Professionals', bold: true, size: 24, color: NAVY })] }),
        body('Our faculty hold advanced degrees and bring real-world industry experience into every lecture, lab, and project.'),

        rule(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160, after: 60 }, children: [new TextRun({ text: '🎓  4-Year Bachelor\'s Degree', bold: true, size: 26, color: NAVY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: '📍 Duhok, Kurdistan Region, Iraq', size: 20, color: GREY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: '📧 cs@nawroz.edu.krd', size: 20, color: GREY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: '🌐 cs.nawroz.edu.krd', size: 20, color: GOLD, bold: true })] }),
      ],
    }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, 'CS-Department-Poster-Nawroz.docx')
}
