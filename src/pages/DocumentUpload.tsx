import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  FileJson,
  FileCode,
  File
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  extractedData?: {
    adNumber: string;
    source: string;
    aircraftType: string;
    deadline: string;
  };
}

const mockExtractedData = [
  { adNumber: 'FAA-AD-2025-008', source: 'FAA', aircraftType: 'A320', deadline: '2025-08-15' },
  { adNumber: 'EASA-AD-2025-0092', source: 'EASA', aircraftType: 'B737', deadline: '2025-07-30' },
  { adNumber: 'FAA-AD-2025-009', source: 'FAA', aircraftType: 'A350', deadline: '2025-09-01' },
];

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const newFile: UploadedFile = {
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    };

    setFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, progress: 100, status: 'processing' } 
            : f
        ));

        // Simulate processing
        setTimeout(() => {
          const randomData = mockExtractedData[Math.floor(Math.random() * mockExtractedData.length)];
          setFiles(prev => prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'completed', extractedData: randomData } 
              : f
          ));
          toast({
            title: "Document processed",
            description: `Successfully extracted data from ${file.name}`,
          });
        }, 2000);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, progress } 
            : f
        ));
      }
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(file => {
      if (file.type === 'application/pdf' || file.type.includes('xml') || file.type.includes('json')) {
        processFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive"
        });
      }
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(file => processFile(file));
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('json')) return FileJson;
    if (type.includes('xml')) return FileCode;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Upload Regulatory Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload FAA/EASA Airworthiness Directives for automated processing
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center transition-all",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border bg-card hover:border-primary/50 hover:bg-secondary/30"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.xml,.json"
          multiple
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
            isDragging ? "bg-primary/20" : "bg-secondary"
          )}>
            <Upload className={cn(
              "w-8 h-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          
          <div>
            <p className="text-lg font-semibold text-foreground mb-1">
              Drop regulatory documents here
            </p>
            <p className="text-sm text-muted-foreground">
              or{' '}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:underline font-medium"
              >
                browse files
              </button>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" /> PDF
            </span>
            <span className="flex items-center gap-1">
              <FileCode className="w-3 h-3" /> XML
            </span>
            <span className="flex items-center gap-1">
              <FileJson className="w-3 h-3" /> JSON
            </span>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Uploaded Documents</h2>
          
          <div className="grid gap-4">
            <AnimatePresence>
              {files.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-elevated p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        file.status === 'completed' && "bg-success/10",
                        file.status === 'processing' && "bg-primary/10",
                        file.status === 'uploading' && "bg-secondary",
                        file.status === 'error' && "bg-destructive/10"
                      )}>
                        {file.status === 'processing' ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        ) : file.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : file.status === 'error' ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <FileIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium text-foreground truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Progress Bar */}
                        {(file.status === 'uploading' || file.status === 'processing') && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">
                                {file.status === 'uploading' ? 'Uploading...' : 'Processing with AI...'}
                              </span>
                              <span className="text-foreground font-medium">{file.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${file.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Extracted Data */}
                        {file.status === 'completed' && file.extractedData && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 p-3 rounded-lg bg-success/5 border border-success/20"
                          >
                            <p className="text-xs font-semibold text-success mb-2">
                              ✓ Data Extracted Successfully
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">AD Number:</span>
                                <span className="ml-2 font-mono text-foreground">{file.extractedData.adNumber}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Source:</span>
                                <span className="ml-2 font-mono text-foreground">{file.extractedData.source}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Aircraft:</span>
                                <span className="ml-2 font-mono text-foreground">{file.extractedData.aircraftType}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deadline:</span>
                                <span className="ml-2 font-mono text-foreground">{file.extractedData.deadline}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: 1, title: 'Upload Document', desc: 'Drop or select regulatory PDFs, XMLs, or JSONs' },
            { step: 2, title: 'AI Processing', desc: 'Our Detection Agent parses and extracts requirements' },
            { step: 3, title: 'Automated Pipeline', desc: 'Impact analysis, work orders, and compliance tracking begin' }
          ].map(item => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
