
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const FLATS_MAP: Record<string, string> = {
  'DB': 'C#', 'EB': 'D#', 'GB': 'F#', 'AB': 'G#', 'BB': 'A#'
};

export interface TuningString {
  note: string;
  octave: number; // Not strictly used in the python script logic for pitch calculation other than relative, but good to have
  baseIndex: number; // Index in NOTES array
}

export const TUNINGS: Record<string, TuningString[]> = {
  'STD': [
    { note: 'E', octave: 4, baseIndex: 4 },
    { note: 'B', octave: 3, baseIndex: 11 },
    { note: 'G', octave: 3, baseIndex: 7 },
    { note: 'D', octave: 3, baseIndex: 2 },
    { note: 'A', octave: 2, baseIndex: 9 },
    { note: 'E', octave: 2, baseIndex: 4 }
  ],
  'B': [
    { note: 'B', octave: 3, baseIndex: 11 },
    { note: 'F#', octave: 3, baseIndex: 6 },
    { note: 'D', octave: 3, baseIndex: 2 },
    { note: 'A', octave: 2, baseIndex: 9 },
    { note: 'E', octave: 2, baseIndex: 4 },
    { note: 'B', octave: 1, baseIndex: 11 }
  ],
  'DADGAD': [
    { note: 'D', octave: 4, baseIndex: 2 },
    { note: 'A', octave: 3, baseIndex: 9 },
    { note: 'G', octave: 3, baseIndex: 7 },
    { note: 'D', octave: 3, baseIndex: 2 },
    { note: 'A', octave: 2, baseIndex: 9 },
    { note: 'D', octave: 2, baseIndex: 2 }
  ],
  'FACGCE': [
    { note: 'E', octave: 4, baseIndex: 4 },
    { note: 'C', octave: 4, baseIndex: 0 },
    { note: 'G', octave: 3, baseIndex: 7 },
    { note: 'C', octave: 3, baseIndex: 0 },
    { note: 'A', octave: 2, baseIndex: 9 },
    { note: 'F', octave: 2, baseIndex: 5 }
  ]
};

export const PATTERNS: Record<string, number[]> = {
  'major':     [0, 4, 7],
  'minor':     [0, 3, 7],
  'maj7':      [0, 4, 7, 11],
  'min7':      [0, 3, 7, 10],
  'dom7':      [0, 4, 7, 10],
  'maj9':      [0, 4, 7, 11, 14],
  'min9':      [0, 3, 7, 10, 14],
  'dom9':      [0, 4, 7, 10, 14],
  'pent_maj':  [0, 2, 4, 7, 9],
  'pent_min':  [0, 3, 5, 7, 10],
  'scale_maj': [0, 2, 4, 5, 7, 9, 11],
  'scale_min': [0, 2, 3, 5, 7, 8, 10],
  'ionian':    [0, 2, 4, 5, 7, 9, 11],
  'dorian':    [0, 2, 3, 5, 7, 9, 10],
  'phrygian':  [0, 1, 3, 5, 7, 8, 10],
  'lydian':    [0, 2, 4, 6, 7, 9, 11],
  'mixolydian':[0, 2, 4, 5, 7, 9, 10],
  'aeolian':   [0, 2, 3, 5, 7, 8, 10],
  'locrian':   [0, 1, 3, 5, 6, 8, 10],
};

export const EXTENSIONS = {
  'major': [11, 14],
  'minor': [10, 14]
};

export const MODE_NAMES = ["Ionian (Major)", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian (Minor)", "Locrian"];

export const MODE_INTERVALS = [
    [0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 9, 10], [0, 1, 3, 5, 7, 8, 10],
    [0, 2, 4, 6, 7, 9, 11], [0, 2, 4, 5, 7, 9, 10], [0, 2, 3, 5, 7, 8, 10],
    [0, 1, 3, 5, 6, 8, 10]
];

export const TRIAD_NUMERALS = [
    ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    ["i", "ii", "bIII", "IV", "v", "vi°", "bVII"],
    ["i", "bII", "bIII", "iv", "v°", "bVI", "bVII"],
    ["I", "II", "iii", "#iv°", "V", "vi", "vii"],
    ["I", "ii", "iii°", "IV", "v", "vi", "bVII"],
    ["i", "ii°", "bIII", "iv", "v", "bVI", "bVII"],
    ["i°", "bII", "biii", "iv", "bV", "bVI", "bvii"]
];

export const SEVENTH_NUMERALS = [
    ["Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "vii°7"],
    ["i7", "ii7", "bIIImaj7", "IV7", "v7", "vi°7", "bVIImaj7"],
    ["i7", "bIImaj7", "bIII7", "iv7", "v°7", "bVImaj7", "bVII7"],
    ["Imaj7", "II7", "iii7", "#iv°7", "Vmaj7", "vi7", "vii7"],
    ["I7", "ii7", "iii°7", "IVmaj7", "v7", "vi7", "bVIImaj7"],
    ["i7", "ii°7", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
    ["i°7", "bIImaj7", "biii7", "iv7", "bVmaj7", "bVI7", "bvii7"]
];

export const TRIAD_QUALITIES = [
    ["", "m", "m", "", "", "m", "dim"], ["m", "m", "", "", "m", "dim", ""],
    ["m", "", "", "m", "dim", "", ""], ["", "", "m", "dim", "", "m", "m"],
    ["", "m", "dim", "", "m", "m", ""], ["m", "dim", "", "m", "m", "", ""],
    ["dim", "", "m", "m", "", "", "m"]
];

export const SEVENTH_QUALITIES = [
    ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"], ["m7", "m7", "maj7", "7", "m7", "m7b5", "maj7"],
    ["m7", "maj7", "7", "m7", "m7b5", "maj7", "m7"], ["maj7", "7", "m7", "m7b5", "maj7", "m7", "m7"],
    ["7", "m7", "m7b5", "maj7", "m7", "m7", "maj7"], ["m7", "m7b5", "maj7", "m7", "m7", "maj7", "7"],
    ["m7b5", "maj7", "m7", "m7", "maj7", "7", "m7"]
];

export const DEGREE_ROLES: Record<number, { name: string; desc: string }> = {
    0: { name: "Tonic", desc: "Home chord, stable resolution center" },
    1: { name: "Supertonic", desc: "Predominant, builds tension leading to V" },
    2: { name: "Mediant", desc: "Prolongs tonic, shares notes with I" },
    3: { name: "Subdominant", desc: "Moves away from tonic, prepares V" },
    4: { name: "Dominant", desc: "Peak tension, strongly resolves to I" },
    5: { name: "Submediant", desc: "Deceptive resolution target, bridges I and IV" },
    6: { name: "Leading/Subtonic", desc: "High tension pulling to I (Maj) or moving to III (Min)" }
};

export const INTERVAL_LABELS: Record<number, string> = {
  0: 'R',
  1: 'b2',
  2: '2',
  3: 'm3',
  4: 'M3',
  5: '4',
  6: 'b5',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7'
};

export type VoicingMode = 'all' | 'triads_close' | 'triads_spread' | 'shells';

export const VOICING_DEFINITIONS: Record<VoicingMode, { 
  label: string; 
  intervals: number[]; // Intervals to keep (e.g., [0, 4, 7] for triads)
  stringSets?: { name: string; indices: number[] }[];
}> = {
  'all': { 
    label: 'All Notes', 
    intervals: [] // Empty means all from the selected scale/chord
  },
  'triads_close': {
    label: 'Close Triads',
    intervals: [0, 3, 4, 7], // R, m3, M3, 5
    stringSets: [
      { name: 'Strings 1-2-3', indices: [0, 1, 2] },
      { name: 'Strings 2-3-4', indices: [1, 2, 3] },
      { name: 'Strings 3-4-5', indices: [2, 3, 4] },
      { name: 'Strings 4-5-6', indices: [3, 4, 5] }
    ]
  },
  'triads_spread': {
    label: 'Spread Triads',
    intervals: [0, 3, 4, 7],
    stringSets: [
      { name: 'Strings 1-2-4', indices: [0, 1, 3] },
      { name: 'Strings 2-3-5', indices: [1, 2, 4] },
      { name: 'Strings 3-4-6', indices: [2, 3, 5] }
    ]
  },
  'shells': {
    label: 'Shell Voicings',
    intervals: [0, 3, 4, 10, 11], // R, 3rds, 7ths
    stringSets: [
      { name: 'E-String Root (6-4-3)', indices: [5, 3, 2] },
      { name: 'A-String Root (5-3-2)', indices: [4, 2, 1] }
    ]
  }
};

// --- Helpers ---

export function getNoteIndex(noteName: string): number {
    let clean = noteName.toUpperCase().trim();
    clean = FLATS_MAP[clean] || clean;
    const idx = NOTES.indexOf(clean);
    return idx === -1 ? 0 : idx; // Default to C if invalid
}

export function getIntervals(
    type: string,
    isExtended: boolean = false
): number[] {
    // Basic mapping from UI selection to pattern
    let base = PATTERNS[type] || PATTERNS['major'];
    
    if (isExtended) {
        if (type === 'major' || type === 'scale_maj') {
             // Logic from python: if args.major return PATTERNS['major'] + extensions
             // But here we might just append if it makes sense.
             // Python logic was specific: if args.major -> add extensions.
             if (type === 'major') return [...base, ...EXTENSIONS['major']];
        }
        if (type === 'minor' || type === 'scale_min') {
             if (type === 'minor') return [...base, ...EXTENSIONS['minor']];
        }
    }
    return base;
}

export interface ProgressionResult {
    numeral: string;
    chord: string;
    deg: number;
    role?: string;
    desc?: string;
}

export function parseProgression(progStr: string, rootIdx: number, scaleType: 'major' | 'minor' = 'major'): ProgressionResult[] {
    const tokens = progStr.split('-').filter(t => t.trim() !== '');
    
    // Auto-detect minor if not explicitly forced, but for this UI we might let user select key signature
    // The python script auto-detected based on 'i' vs 'I'.
    let isMinor = scaleType === 'minor';
    if (!isMinor) {
        const bases = tokens.map(t => t.replace(/[^ivIV]/g, ''));
        if (bases.includes('i') && !bases.includes('I')) {
            isMinor = true;
        }
    }

    const baseIntervals = isMinor ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11];
    const degrees: Record<string, number> = {'i': 0, 'ii': 1, 'iii': 2, 'iv': 3, 'v': 4, 'vi': 5, 'vii': 6};

    return tokens.map(token => {
        const match = token.trim().match(/^(b|#)?([ivIV]+)(.*)$/i);
        if (!match) {
            return { numeral: token, chord: '?', deg: -1 };
        }

        const [, acc, num, extRaw] = match;
        let ext = extRaw || "";
        const numLower = num.toLowerCase();

        if (!(numLower in degrees)) {
            return { numeral: token, chord: '?', deg: -1 };
        }

        const deg = degrees[numLower];
        let interval = baseIntervals[deg];

        if (acc === 'b') interval -= 1;
        else if (acc === '#') interval += 1;

        const chordRootIdx = (rootIdx + interval + 12) % 12; // Ensure positive
        const chordRootNote = NOTES[chordRootIdx];

        const isUpper = num === num.toUpperCase();
        let quality = isUpper ? '' : 'm';
        const extLower = ext.toLowerCase();

        if (extLower.includes('ø') || extLower.includes('m7b5')) {
            quality = 'm7b5';
            ext = ext.replace(/ø|m7b5/gi, '');
        } else if (extLower.includes('dim') || extLower.includes('°')) {
            quality = 'dim';
            ext = ext.replace(/dim|°/gi, '');
        } else if (extLower.includes('aug') || extLower.includes('+')) {
            quality = 'aug';
            ext = ext.replace(/aug|\+/gi, '');
        } else if (extLower.includes('sus')) {
            quality = '';
        } else if (!isUpper && extLower.startsWith('m')) {
            // If it was 'ivm7', quality is 'm', ext is 'm7'. Avoid double 'm'.
            // Python logic: if not is_upper and ext_lower.startswith('m'): quality = ''
            quality = '';
        }

        const roleInfo = DEGREE_ROLES[deg];

        return {
            numeral: token,
            chord: `${chordRootNote}${quality}${ext}`,
            deg: deg,
            role: roleInfo?.name,
            desc: roleInfo?.desc
        };
    });
}

export interface FretInfo {
    stringIndex: number; // 0 is high E (top visually in tab, but usually index 0 in arrays)
    fret: number;
    note: string;
    interval: number; // 0-11 relative to root
    isRoot: boolean;
    isInScale: boolean;
}

export function generateFretboard(
    rootIdx: number,
    intervals: number[],
    tuningName: string,
    frets: number = 21
): FretInfo[][] {
    const tuning = TUNINGS[tuningName];
    const targetNotes = new Set(intervals.map(i => (rootIdx + i) % 12));
    
    // Tuning is defined high-to-low in Python (e, B, G, D, A, E) which matches standard tab view
    // We will return an array of strings, where each string is an array of frets
    
    return tuning.map((stringObj, stringIndex) => {
        const stringFrets: FretInfo[] = [];
        const startPitch = stringObj.baseIndex;
        
        for (let f = 0; f <= frets; f++) {
            const currentPitch = (startPitch + f) % 12;
            const isInScale = targetNotes.has(currentPitch);
            // Calculate interval relative to root
            // (current - root + 12) % 12
            const interval = (currentPitch - rootIdx + 12) % 12;
            
            stringFrets.push({
                stringIndex,
                fret: f,
                note: NOTES[currentPitch],
                interval,
                isRoot: interval === 0,
                isInScale
            });
        }
        return stringFrets;
    });
}
