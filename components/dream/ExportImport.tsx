'use client';

import { useState, useRef } from 'react';
import { Download, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { exportDreamsData, importDreamsData } from '@/services/dream.service';
import { useDreamContext } from '@/context/DreamContext';

export default function ExportImport() {
  const { refetchAll } = useDreamContext();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportDreamsData();

      // Create blob and download
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dream-journal-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${data.metadata?.dreamCount || 0} dreams and ${data.metadata?.symbolCount || 0} symbols`);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to export data'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate structure
      if (!data.dreams && !data.symbols) {
        throw new Error(
          'Invalid file format. Expected dreams or symbols data.'
        );
      }

      const result = await importDreamsData(data);

      await refetchAll();

      toast.success(
        `Imported ${result.imported.dreams} dreams and ${result.imported.symbols} symbols`
      );
    } catch (error) {
      console.error('Import failed:', error);

      if (error instanceof SyntaxError) {
        toast.error('Invalid JSON file format');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to import data. Please check the file format.');
      }
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting || isImporting}
        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
          isExporting || isImporting
            ? 'bg-purple-800/50 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
        }`}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Export</span>
          </>
        )}
      </button>

      {/* Import Button */}
      <button
        onClick={handleImportClick}
        disabled={isExporting || isImporting}
        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
          isExporting || isImporting
            ? 'bg-purple-800/50 cursor-not-allowed opacity-50'
            : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30'
        }`}
      >
        {isImporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Importing...</span>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            <span>Import</span>
          </>
        )}
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
        aria-label="Import dream journal"
      />

      {/* Helper text */}
      <p className="text-sm text-purple-300 self-center">
        Backup or restore your dreams
      </p>
    </div>
  );
}