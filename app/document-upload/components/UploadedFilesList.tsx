'use client';

import Icon from '@/components/ui/AppIcon';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface UploadedFilesListProps {
  files: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
}

const UploadedFilesList = ({ files, onRemoveFile }: UploadedFilesListProps) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string): string => {
    if (type.includes('pdf')) return 'DocumentTextIcon';
    if (type.includes('doc')) return 'DocumentIcon';
    return 'DocumentIcon';
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-3 md:space-y-2 sm:space-y-1.5">
      <h3 className="text-lg md:text-base sm:text-sm font-heading font-semibold text-foreground">
        Uploaded Files ({files.length})
      </h3>
      
      <div className="space-y-3 md:space-y-2 sm:space-y-1.5">
        {files.map((file) => (
          <div
            key={file.id}
            className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-3 sm:p-2.5 transition-all duration-250 ease-out hover:shadow-warm-sm"
          >
            <div className="flex items-start gap-4 md:gap-3 sm:gap-2">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-10 md:h-10 sm:w-9 sm:h-9 bg-primary/10 rounded-lg">
                <Icon name={getFileIcon(file.type) as any} size={24} className="text-primary md:w-5 md:h-5 sm:w-4 sm:h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xs sm:text-[11px] font-medium text-foreground truncate mb-1 md:mb-0.5 sm:mb-0.5">
                  {file.name}
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-2 sm:gap-1.5 text-xs md:text-[11px] sm:text-[10px] text-caption text-muted-foreground">
                  <span className="whitespace-nowrap">{formatFileSize(file.size)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">{file.type.split('/')[1].toUpperCase()}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">Uploaded {file.uploadedAt}</span>
                </div>
              </div>
              
              <button
                onClick={() => onRemoveFile(file.id)}
                className="flex-shrink-0 p-2 md:p-1.5 sm:p-1 rounded-lg transition-all duration-250 ease-out hover:bg-error/10 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
                aria-label={`Remove ${file.name}`}
              >
                <Icon name="XMarkIcon" size={20} className="text-muted-foreground hover:text-error md:w-5 md:h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;