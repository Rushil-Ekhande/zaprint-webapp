import type { Metadata } from 'next';
import DocumentUploadInteractive from './components/DocumentUploadInteractive';

export const metadata: Metadata = {
  title: 'Upload Documents - Zaprint',
  description: 'Upload your documents and configure print preferences including paper size, color mode, and number of copies for professional printing services.',
};

export default function DocumentUploadPage() {
  return <DocumentUploadInteractive />;
}