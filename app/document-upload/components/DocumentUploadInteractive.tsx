'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import WorkflowProgressIndicator from '@/components/common/WorkflowProgressIndicator';
import FileUploadZone from './FileUploadZone';
import UploadedFilesList from './UploadedFilesList';
import PrintConfigurationPanel from './PrintConfigurationPanel';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface PrintConfiguration {
  paperSize: 'A4' | 'A3' | 'Letter';
  colorMode: 'color' | 'blackwhite';
  printSide: 'single' | 'duplex';
  copies: number;
}

const DocumentUploadInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [configuration, setConfiguration] = useState<PrintConfiguration>({
    paperSize: 'A4',
    colorMode: 'color',
    printSide: 'single',
    copies: 1,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleFilesSelected = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: 'just now',
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleConfigurationChange = (newConfig: PrintConfiguration) => {
    setConfiguration(newConfig);
  };

  const handleContinue = () => {
    if (uploadedFiles.length === 0) {
      return;
    }

    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
      localStorage.setItem('printConfiguration', JSON.stringify(configuration));
    }

    router.push('/print-shop-selection');
  };

  const handleLogout = () => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.removeItem('uploadedFiles');
      localStorage.removeItem('printConfiguration');
      localStorage.removeItem('isAuthenticated');
    }
    router.push('/login');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigationBar isAuthenticated={true} userName="User" userEmail="user@example.com" />
        <WorkflowProgressIndicator />
        <div className="pt-32 md:pt-28 sm:pt-24 pb-16 md:pb-12 sm:pb-8 px-8 md:px-6 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8 md:space-y-6 sm:space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-64 bg-muted rounded"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar
        isAuthenticated={true}
        userName="John Doe"
        userEmail="john.doe@example.com"
        onLogout={handleLogout}
      />
      
      <WorkflowProgressIndicator />

      <main className="pt-32 md:pt-28 sm:pt-24 pb-16 md:pb-12 sm:pb-8 px-8 md:px-6 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-6 sm:mb-4">
            <h1 className="text-4xl md:text-3xl sm:text-2xl font-heading font-semibold text-foreground mb-3 md:mb-2 sm:mb-1.5">
              Upload Your Documents
            </h1>
            <p className="text-base md:text-sm sm:text-xs text-muted-foreground max-w-3xl">
              Upload your documents and configure your print preferences. We support PDF and DOC formats up to 10MB per file.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
            <div className="lg:col-span-2 space-y-8 md:space-y-6 sm:space-y-4">
              <div className="bg-card border border-border rounded-xl p-8 md:p-6 sm:p-4 shadow-warm-sm">
                <FileUploadZone
                  onFilesSelected={handleFilesSelected}
                  acceptedFormats={['.pdf', '.doc', '.docx']}
                  maxFileSize={10 * 1024 * 1024}
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-8 md:p-6 sm:p-4 shadow-warm-sm">
                  <UploadedFilesList files={uploadedFiles} onRemoveFile={handleRemoveFile} />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-8 md:p-6 sm:p-4 shadow-warm-sm sticky top-32 md:top-28 sm:top-24">
                <h2 className="text-xl md:text-lg sm:text-base font-heading font-semibold text-foreground mb-6 md:mb-4 sm:mb-3">
                  Print Configuration
                </h2>
                
                <PrintConfigurationPanel
                  configuration={configuration}
                  onConfigurationChange={handleConfigurationChange}
                />

                <div className="mt-8 md:mt-6 sm:mt-4 pt-8 md:pt-6 sm:pt-4 border-t border-border space-y-3 md:space-y-2 sm:space-y-1.5">
                  <button
                    onClick={handleContinue}
                    disabled={uploadedFiles.length === 0}
                    className="w-full px-6 md:px-5 sm:px-4 py-3 md:py-2.5 sm:py-2 bg-primary text-primary-foreground rounded-lg font-medium text-base md:text-sm sm:text-xs transition-all duration-250 ease-out hover:-translate-y-px hover:shadow-warm-md focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    <span className="flex items-center justify-center gap-2 md:gap-1.5 sm:gap-1">
                      Continue to Shop Selection
                      <Icon name="ArrowRightIcon" size={20} className="md:w-5 md:h-5 sm:w-4 sm:h-4" />
                    </span>
                  </button>

                  {uploadedFiles.length === 0 && (
                    <p className="text-xs md:text-[11px] sm:text-[10px] text-caption text-muted-foreground text-center">
                      Please upload at least one document to continue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentUploadInteractive;