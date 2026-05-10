'use client';

interface ApplicationLoaderProps {
  progress: number;
  currentStep: string;
}

export default function ApplicationLoader({ progress, currentStep }: ApplicationLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
            style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
          >
            <span className="text-lg font-bold" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>IR</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>InterviewReady</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{currentStep}</p>
        </div>
        <div className="h-px rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'var(--accent)' }}
          />
        </div>
        <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{progress}%</p>
      </div>
    </div>
  );
}
