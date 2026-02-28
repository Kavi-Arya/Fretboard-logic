
import React, { useState, useMemo } from 'react';
import { 
  NOTES, 
  TUNINGS, 
  PATTERNS, 
  generateFretboard, 
  getNoteIndex, 
  getIntervals,
  parseProgression,
  MODE_NAMES,
  MODE_INTERVALS,
  TRIAD_NUMERALS,
  SEVENTH_NUMERALS,
  TRIAD_QUALITIES,
  SEVENTH_QUALITIES,
  DEGREE_ROLES,
  VoicingMode,
  VOICING_DEFINITIONS,
  INTERVAL_LABELS
} from './utils/music-theory';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Music, 
  Grid, 
  ListMusic, 
  ChevronDown, 
  ChevronRight,
  Maximize2,
  Minimize2,
  Layers,
  Type
} from 'lucide-react';

// --- Components ---

const NoteCircle = ({ 
  note, 
  isRoot, 
  interval, 
  isVisible,
  showIntervals 
}: { 
  note: string, 
  isRoot: boolean, 
  interval: number, 
  isVisible: boolean,
  showIntervals: boolean
}) => {
  if (!isVisible) return <div className="w-5 h-5" />;
  
  // Determine color based on interval
  // Root (0) -> Orange (Gruvbox Orange)
  // 3rd (3 or 4) -> Green (Gruvbox Green)
  // 5th (7) -> Blue (Gruvbox Blue)
  // 7th (10 or 11) -> Purple (Gruvbox Purple)
  // Others -> bg5 (Gruvbox bg5)
  
  let bgClass = 'bg-[#504945] text-[#d4be98]';
  
  if (isRoot) {
    bgClass = 'bg-[#e78a4e] text-[#1d2021] ring-2 ring-[#d8a657]';
  } else if (interval === 3 || interval === 4) {
    bgClass = 'bg-[#a9b665] text-[#1d2021] shadow-sm shadow-[#a9b665]/30';
  } else if (interval === 7) {
    bgClass = 'bg-[#7daea3] text-[#1d2021] shadow-sm shadow-[#7daea3]/30';
  } else if (interval === 10 || interval === 11) {
    bgClass = 'bg-[#d3869b] text-[#1d2021] shadow-sm shadow-[#d3869b]/30';
  }

  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`
        w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shadow-sm z-10
        ${bgClass}
      `}
    >
      {showIntervals ? (INTERVAL_LABELS[interval] || '?') : note}
    </motion.div>
  );
};

const Fretboard = ({ 
  rootNote, 
  scaleType, 
  tuning, 
  voicingMode = 'all',
  showAllNotes = false,
  showIntervals = false
}: { 
  rootNote: string, 
  scaleType: string, 
  tuning: string,
  voicingMode?: VoicingMode,
  showAllNotes?: boolean,
  showIntervals?: boolean
}) => {
  const rootIdx = getNoteIndex(rootNote);
  const intervals = getIntervals(scaleType);
  const strings = useMemo(() => generateFretboard(rootIdx, intervals, tuning), [rootIdx, intervals, tuning]);
  
  // Markers for standard guitar (3, 5, 7, 9, 12, 15, 17, 19, 21)
  const markers = [3, 5, 7, 9, 12, 15, 17, 19, 21];

  const allowedIntervals = VOICING_DEFINITIONS[voicingMode].intervals;

  return (
    <div className="overflow-x-auto pb-8 pt-4 px-4 bg-[#1d2021] rounded-xl shadow-2xl border border-[#3c3836]">
      <div className="min-w-[900px] relative select-none pl-8">
        {/* Fret Numbers (Top) */}
        <div className="flex pl-[4px] mb-2 text-[#928374] font-mono text-[10px] tracking-widest opacity-80">
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} className="flex-1 text-center">
              {markers.includes(i) ? i : ''}
            </div>
          ))}
        </div>

        {/* Board Container */}
        <div className="relative bg-[#282828] border-y border-[#504945] shadow-inner">
          
          {/* Inlays (Background Layer) */}
          <div className="absolute inset-0 pointer-events-none z-0">
             {/* Single Dots */}
             {[3, 5, 7, 9, 15, 17, 19, 21].map(fret => (
               <div key={fret} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1d2021] rounded-full shadow-inner"
                    style={{ left: `${(fret / 22) * 100 + (1/44)*100}%`, transform: 'translate(-50%, -50%)' }} />
             ))}
             {/* Double Dot (12) */}
             <div className="absolute top-[30%] -translate-y-1/2 w-3 h-3 bg-[#1d2021] rounded-full shadow-inner"
                  style={{ left: `${(12 / 22) * 100 + (1/44)*100}%`, transform: 'translate(-50%, -50%)' }} />
             <div className="absolute bottom-[30%] translate-y-1/2 w-3 h-3 bg-[#1d2021] rounded-full shadow-inner"
                  style={{ left: `${(12 / 22) * 100 + (1/44)*100}%`, transform: 'translate(-50%, -50%)' }} />
          </div>

          {/* Strings (Rows) */}
          <div className="flex flex-col"> 
            {strings.map((stringData, sIdx) => (
              <div key={sIdx} className="flex items-center relative h-8">
                
                {/* String Label */}
                <div className="absolute -left-8 w-6 text-[#a89984] font-mono font-bold text-xs text-right opacity-80">
                  {TUNINGS[tuning][sIdx].note}
                </div>

                {/* The String Line */}
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#7c6f64] z-0 shadow-[0_1px_0_rgba(0,0,0,0.5)]" />
                
                {/* Frets Cells */}
                <div className="flex flex-1 h-full relative z-10">
                  {stringData.map((fret, fIdx) => {
                    // Filter visibility based on voicing mode
                    let isVisible = fret.isInScale || showAllNotes;
                    if (isVisible && allowedIntervals.length > 0) {
                      isVisible = allowedIntervals.includes(fret.interval);
                    }

                    return (
                      <div key={fIdx} className="flex-1 relative border-r border-[#504945] h-full flex items-center justify-center">
                        
                        {/* Nut Styling (Index 0) */}
                        {fIdx === 0 && (
                           <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#d4be98] -ml-[1px] z-20 shadow-lg border-r border-[#504945]" />
                        )}

                        {/* Note Circle */}
                        <NoteCircle 
                          note={fret.note} 
                          isRoot={fret.isRoot} 
                          interval={fret.interval}
                          isVisible={isVisible}
                          showIntervals={showIntervals}
                        />
                        
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressionAnalyzer = ({ rootNote }: { rootNote: string }) => {
  const [input, setInput] = useState('ii-V-I');
  const rootIdx = getNoteIndex(rootNote);
  
  const result = useMemo(() => parseProgression(input, rootIdx), [input, rootIdx]);

  return (
    <div className="bg-[#1d2021] rounded-xl p-6 border border-[#3c3836] shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ListMusic className="w-5 h-5 text-[#e78a4e]" />
        <h2 className="text-lg font-semibold text-[#d4be98]">Progression Analyzer</h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#928374] uppercase tracking-wider mb-2">
          Roman Numerals (e.g., ii-V-I)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-[#282828] border-none rounded-lg px-4 py-3 text-[#d4be98] font-mono focus:ring-2 focus:ring-[#e78a4e] outline-none placeholder-[#7c6f64]"
          placeholder="e.g. vi-IV-I-V"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-[#3c3836]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#282828] text-[#a89984] font-medium">
            <tr>
              <th className="px-4 py-3">Input</th>
              <th className="px-4 py-3">Chord</th>
              <th className="px-4 py-3">Function</th>
              <th className="px-4 py-3 hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3c3836]">
            {result.map((row, i) => (
              <tr key={i} className="bg-[#1d2021]">
                <td className="px-4 py-3 font-mono text-[#e78a4e] font-medium">{row.numeral}</td>
                <td className="px-4 py-3 font-bold text-[#d4be98]">{row.chord}</td>
                <td className="px-4 py-3 text-[#a89984]">{row.role || '-'}</td>
                <td className="px-4 py-3 text-[#7c6f64] text-xs hidden sm:table-cell">{row.desc || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KeyModesTable = ({ rootNote }: { rootNote: string }) => {
  const rootIdx = getNoteIndex(rootNote);
  const [mode, setMode] = useState<'triads' | 'sevenths'>('triads');

  const data = useMemo(() => {
    const numerals = mode === 'triads' ? TRIAD_NUMERALS : SEVENTH_NUMERALS;
    const qualities = mode === 'triads' ? TRIAD_QUALITIES : SEVENTH_QUALITIES;
    
    return MODE_NAMES.map((name, i) => {
      const chords = Array.from({ length: 7 }).map((_, j) => {
        const noteIdx = (rootIdx + MODE_INTERVALS[i][j]) % 12;
        return `${NOTES[noteIdx]}${qualities[i][j]}`;
      });
      return { name, numerals: numerals[i], chords };
    });
  }, [rootIdx, mode]);

  return (
    <div className="bg-[#1d2021] rounded-xl p-6 border border-[#3c3836] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Grid className="w-5 h-5 text-[#a9b665]" />
          <h2 className="text-lg font-semibold text-[#d4be98]">Key Modes Reference</h2>
        </div>
        <div className="flex bg-[#282828] rounded-lg p-1">
          <button
            onClick={() => setMode('triads')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'triads' ? 'bg-[#3c3836] shadow-sm text-[#d4be98]' : 'text-[#928374] hover:text-[#d4be98]'
            }`}
          >
            Triads
          </button>
          <button
            onClick={() => setMode('sevenths')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'sevenths' ? 'bg-[#3c3836] shadow-sm text-[#d4be98]' : 'text-[#928374] hover:text-[#d4be98]'
            }`}
          >
            7ths
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="text-[#928374] border-b border-[#3c3836]">
              <th className="px-4 py-3 text-left">Mode</th>
              {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map(d => (
                <th key={d} className="px-2 py-3 text-center w-16">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3c3836]">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-[#282828] transition-colors">
                <td className="px-4 py-3 font-medium text-[#d4be98]">{row.name}</td>
                {row.chords.map((chord, j) => (
                  <td key={j} className="px-2 py-3 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-[#ddc7a1]">{chord}</span>
                      <span className="text-[10px] text-[#7c6f64] font-mono mt-0.5">{row.numerals[j]}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [rootNote, setRootNote] = useState('C');
  const [scaleType, setScaleType] = useState('major');
  const [tuning, setTuning] = useState('STD');
  const [voicingMode, setVoicingMode] = useState<VoicingMode>('all');
  const [showIntervals, setShowIntervals] = useState(false);

  return (
    <div className="min-h-screen bg-[#141617] text-[#d4be98] font-sans selection:bg-[#e78a4e]/30">
      {/* Header */}
      <header className="border-b border-[#3c3836] bg-[#1d2021]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#e78a4e] rounded-lg flex items-center justify-center text-[#1d2021] font-bold shadow-lg shadow-[#e78a4e]/20">
              F
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#d4be98]">FretLogic</h1>
          </div>
          <div className="text-sm text-[#928374]">
            Basic BS
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Controls */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1d2021] p-4 rounded-xl border border-[#3c3836] shadow-sm">
            <label className="block text-xs font-semibold text-[#928374] uppercase tracking-wider mb-2">Root Note</label>
            <div className="grid grid-cols-4 gap-2">
              {NOTES.map(note => (
                <button
                  key={note}
                  onClick={() => setRootNote(note)}
                  className={`
                    h-10 rounded-lg text-sm font-medium transition-all
                    ${rootNote === note 
                      ? 'bg-[#e78a4e] text-[#1d2021] shadow-md shadow-[#e78a4e]/20' 
                      : 'bg-[#282828] text-[#a89984] hover:bg-[#3c3836] hover:text-[#d4be98]'}
                  `}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1d2021] p-4 rounded-xl border border-[#3c3836] shadow-sm">
            <label className="block text-xs font-semibold text-[#928374] uppercase tracking-wider mb-2">Scale / Chord</label>
            <select 
              value={scaleType}
              onChange={(e) => setScaleType(e.target.value)}
              className="w-full h-10 bg-[#282828] border-none rounded-lg px-3 text-sm font-medium focus:ring-2 focus:ring-[#e78a4e] outline-none text-[#d4be98]"
            >
              {Object.keys(PATTERNS).map(p => (
                <option key={p} value={p}>{p.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-[#928374] uppercase tracking-wider mb-2">Tuning</label>
                <select 
                  value={tuning}
                  onChange={(e) => setTuning(e.target.value)}
                  className="w-full h-10 bg-[#282828] border-none rounded-lg px-3 text-sm font-medium focus:ring-2 focus:ring-[#e78a4e] outline-none text-[#d4be98]"
                >
                  {Object.keys(TUNINGS).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#928374] uppercase tracking-wider mb-2">Voicing</label>
                <select 
                  value={voicingMode}
                  onChange={(e) => setVoicingMode(e.target.value as VoicingMode)}
                  className="w-full h-10 bg-[#282828] border-none rounded-lg px-3 text-sm font-medium focus:ring-2 focus:ring-[#e78a4e] outline-none text-[#d4be98]"
                >
                  {Object.entries(VOICING_DEFINITIONS).map(([key, def]) => (
                    <option key={key} value={key}>{def.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-[#ea6962] rounded-xl p-6 text-[#1d2021] shadow-lg shadow-[#ea6962]/20 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1">Current Selection</h3>
              <p className="text-[#3c3836] text-sm font-medium">
                {rootNote} {scaleType.replace('_', ' ')}
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {getIntervals(scaleType).map(i => (
                  <span key={i} className="px-2 py-1 bg-[#1d2021]/10 rounded text-xs font-mono font-bold">
                    {NOTES[(getNoteIndex(rootNote) + i) % 12]}
                  </span>
                ))}
              </div>
            </div>
            <Music className="absolute -bottom-4 -right-4 w-32 h-32 text-[#1d2021]/10 rotate-12" />
          </div>
        </section>

        {/* Fretboard */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#d4be98] flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-[#928374]" />
              Fretboard Visualization
            </h2>
            <button
              onClick={() => setShowIntervals(!showIntervals)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${showIntervals 
                  ? 'bg-[#e78a4e] text-[#1d2021] shadow-sm' 
                  : 'bg-[#282828] text-[#928374] hover:text-[#d4be98]'}
              `}
            >
              <Type className="w-4 h-4" />
              {showIntervals ? 'Show Notes' : 'Show Intervals'}
            </button>
          </div>
          <Fretboard 
            rootNote={rootNote} 
            scaleType={scaleType} 
            tuning={tuning} 
            voicingMode={voicingMode} 
            showIntervals={showIntervals}
          />
        </section>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProgressionAnalyzer rootNote={rootNote} />
          <KeyModesTable rootNote={rootNote} />
        </section>

      </main>
    </div>
  );
}
