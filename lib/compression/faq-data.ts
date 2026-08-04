export interface FAQItem {
  question: string;
  answer: string;
}

export const FILE_COMPRESSOR_FAQS: FAQItem[] = [
  {
    question: 'Are my files safe and private when using this compressor?',
    answer:
      'Yes, 100%! All image, PDF, video, audio, and zip file compression happens directly inside your web browser using client-side JavaScript, Web Audio API, HTML5 Canvas, and MediaRecorder. Your files are never uploaded to our servers, Supabase, or any third-party database. Once you close or refresh the page, all processed data is completely wiped.',
  },
  {
    question: 'What file formats are supported for compression?',
    answer:
      'Our tool supports JPG, JPEG, PNG, and WebP images, PDF documents, MP4, WebM, MOV, and AVI videos, MP3, WAV, AAC, M4A, and OGG audio files, and a generic ZIP shrinker for any file types.',
  },
  {
    question: 'How does Target File Size compression work?',
    answer:
      'In Target File Size mode, you can specify your desired max file size (e.g. 500 KB, 1 MB, 2 MB, 5 MB, 10 MB, or 20 MB). Our multi-pass algorithm automatically adjusts quality and resolution scaling to ensure your file stays strictly under your target size while maintaining visual and acoustic clarity.',
  },
  {
    question: 'Can I compress multiple files at once (Batch Compression)?',
    answer:
      'Yes! You can drag and drop multiple files at once. After processing, you can download compressed files individually or click "Download All (ZIP)" to download them in a single archive.',
  },
  {
    question: 'Why does Rollix Media offer this file compressor for free?',
    answer:
      'Rollix Media is a digital marketing, web design, and video production agency. We created this free utility to help school administrators, coaching institutes, e-commerce owners, and content creators easily optimize their media without paying for software subscription paywalls.',
  },
];
