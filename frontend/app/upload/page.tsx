"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import AudioUpload from "@/components/AudioUpload";
import useAudioUpload from "@/hooks/useAudioUpload";
import Link from "next/link";

export default function UploadPage() {
  const {
    file,
    status,
    progress,
    error,
    result,
    selectFile,
    removeFile,
    uploadFile,
    reset,
  } = useAudioUpload();

  const handleStartUpload = async () => {
    await uploadFile();
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-6">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>Piano Transcription Upload</span>
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                AI Powered
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Upload audio files or PDF sheet music to automatically generate sheet music, MIDI exports, and keyboard visualizations.
            </p>
          </div>
          <Link
            href="/my-sheets"
            className="inline-flex items-center justify-center rounded-xl bg-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
          >
            📁 View Saved Sheets
          </Link>
        </div>

        {/* Status Error Alert */}
        {error && (
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 text-sm text-rose-300 flex items-start space-x-3">
            <span className="text-xl">⚠️</span>
            <div className="flex-1">
              <p className="font-semibold text-rose-200">Upload Encountered an Error</p>
              <p className="mt-0.5 text-xs text-rose-300/80">{error}</p>
            </div>
            <button
              onClick={reset}
              className="text-xs underline text-rose-300 hover:text-rose-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Success Card State */}
        {status === "success" && result ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center backdrop-blur-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl border border-emerald-500/30">
              ✅
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-100">Upload Complete!</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                <span className="font-medium text-slate-200">{result.original_name}</span> has been processed successfully. Your transcriptions are being generated.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/my-sheets"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 transition-all"
              >
                View Sheet Music & Keynotes
              </Link>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Upload Another File
              </button>
            </div>
          </div>
        ) : (
          /* Audio Upload Component */
          <div className="space-y-6">
            <AudioUpload
              onFileSelect={selectFile}
              selectedFile={file}
              onRemoveFile={removeFile}
              isUploading={status === "uploading"}
              progress={progress}
            />

            {/* Action Bar when file is selected */}
            {file && status === "selected" && (
              <div className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <span className="flex h-3 w-3 rounded-full bg-indigo-400 animate-ping"></span>
                  <span className="text-sm font-medium text-slate-200">
                    Ready to start transcription pipeline
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStartUpload}
                    className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 transition-all flex items-center space-x-2"
                  >
                    <span>Start Transcription</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <div className="text-2xl">🎼</div>
            <h3 className="text-sm font-bold text-slate-200">MusicXML & PDF</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export multi-stave sheet music ready for MuseScore, Sibelius, or printing.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <div className="text-2xl">🎹</div>
            <h3 className="text-sm font-bold text-slate-200">Polyphonic MIDI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High accuracy pitch detection separating melody, basslines, and chords.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <div className="text-2xl">✨</div>
            <h3 className="text-sm font-bold text-slate-200">Interactive Visualizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Watch notes fall on an interactive 88-key piano roll in real-time.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
