'use client';

import { useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFormats: string[];
  maxFileSize: number;
}

const FileUploadZone = ({ onFilesSelected, acceptedFormats, maxFileSize }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedFormats.includes(fileExtension)) {
      setError(`File type ${fileExtension} is not supported. Please upload ${acceptedFormats.join(', ')} files only.`);
      return false;
    }

    if (file.size > maxFileSize) {
      setError(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit. Please upload a smaller file.`);
      return false;
    }

    setError('');
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = selectedFiles.filter(validateFile);

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }

    e.target.value = '';
  }, [onFilesSelected]);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-250 ease-out ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Upload documents"
        />
        
        <div className="flex flex-col items-center justify-center py-16 md:py-12 sm:py-8 px-8 md:px-6 sm:px-4">
          <div className={`flex items-center justify-center w-20 h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 rounded-full mb-6 md:mb-4 sm:mb-3 transition-all duration-250 ${
            isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="CloudArrowUpIcon" size={40} className="md:w-8 md:h-8 sm:w-7 sm:h-7" />
          </div>
          
          <h3 className="text-xl md:text-lg sm:text-base font-heading font-semibold text-foreground mb-2 md:mb-1.5 sm:mb-1 text-center">
            {isDragging ? 'Drop your files here' : 'Upload Your Documents'}
          </h3>
          
          <p className="text-base md:text-sm sm:text-xs text-muted-foreground text-center mb-4 md:mb-3 sm:mb-2 max-w-md">
            Drag and drop your files here, or click to browse
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-2 sm:gap-1.5 text-xs md:text-[11px] sm:text-[10px] text-caption text-muted-foreground">
            <span className="flex items-center gap-1.5 md:gap-1 sm:gap-0.5">
              <Icon name="DocumentTextIcon" size={16} className="md:w-3.5 md:h-3.5 sm:w-3 sm:h-3" />
              Supported: {acceptedFormats.join(', ').toUpperCase()}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 md:gap-1 sm:gap-0.5">
              <Icon name="ArrowUpTrayIcon" size={16} className="md:w-3.5 md:h-3.5 sm:w-3 sm:h-3" />
              Max size: {maxFileSize / (1024 * 1024)}MB
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 md:mt-3 sm:mt-2 p-4 md:p-3 sm:p-2.5 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3 md:gap-2 sm:gap-1.5">
          <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 md:w-5 md:h-5 sm:w-4 sm:h-4" />
          <p className="text-sm md:text-xs sm:text-[11px] text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;