"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Trophy, Sparkles } from "lucide-react";

interface Word {
  word: string;
  found: boolean;
  color: string;
  cells: { r: number; c: number }[];
}

const INITIAL_WORDS: Omit<Word, "found">[] = [
  {
    word: "WEBSITE",
    color: "bg-emerald-600 text-white border-emerald-800",
    cells: [
      { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 0, c: 5 }, { r: 0, c: 6 }
    ]
  },
  {
    word: "DESIGN",
    color: "bg-sky-600 text-white border-sky-800",
    cells: [
      { r: 1, c: 0 }, { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 }, { r: 5, c: 0 }, { r: 6, c: 0 }
    ]
  },
  {
    word: "DEVELOPER",
    color: "bg-indigo-600 text-white border-indigo-800",
    cells: [
      { r: 0, c: 9 }, { r: 1, c: 9 }, { r: 2, c: 9 }, { r: 3, c: 9 }, { r: 4, c: 9 }, { r: 5, c: 9 }, { r: 6, c: 9 }, { r: 7, c: 9 }, { r: 8, c: 9 }
    ]
  },
  {
    word: "PORTFOLIO",
    color: "bg-amber-600 text-white border-amber-800",
    cells: [
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 }, { r: 7, c: 7 }, { r: 7, c: 8 }
    ]
  },
  {
    word: "AGENTS",
    color: "bg-teal-600 text-white border-teal-800",
    cells: [
      { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 }, { r: 4, c: 7 }
    ]
  },
  {
    word: "MAGIC",
    color: "bg-purple-600 text-white border-purple-800",
    cells: [
      { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 }, { r: 6, c: 7 }
    ]
  },
  {
    word: "PREMIUM",
    color: "bg-rose-600 text-white border-rose-800",
    cells: [
      { r: 8, c: 0 }, { r: 8, c: 1 }, { r: 8, c: 2 }, { r: 8, c: 3 }, { r: 8, c: 4 }, { r: 8, c: 5 }, { r: 8, c: 6 }
    ]
  },
  {
    word: "DIGITALHUB",
    color: "bg-fuchsia-600 text-white border-fuchsia-800",
    cells: [
      { r: 9, c: 0 }, { r: 9, c: 1 }, { r: 9, c: 2 }, { r: 9, c: 3 }, { r: 9, c: 4 }, { r: 9, c: 5 }, { r: 9, c: 6 }, { r: 9, c: 7 }, { r: 9, c: 8 }, { r: 9, c: 9 }
    ]
  }
];

const GRID = [
  ["W", "E", "B", "S", "I", "T", "E", "A", "Q", "D"],
  ["D", "K", "J", "H", "G", "F", "D", "S", "A", "E"],
  ["E", "A", "B", "C", "D", "F", "G", "H", "I", "V"],
  ["S", "Y", "T", "R", "E", "W", "Q", "A", "S", "E"],
  ["I", "Z", "A", "G", "E", "N", "T", "S", "X", "L"],
  ["G", "M", "N", "B", "V", "C", "X", "Z", "A", "O"],
  ["N", "L", "K", "M", "A", "G", "I", "C", "P", "P"],
  ["P", "O", "R", "T", "F", "O", "L", "I", "O", "E"],
  ["P", "R", "E", "M", "I", "U", "M", "N", "K", "R"],
  ["D", "I", "G", "I", "T", "A", "L", "H", "U", "B"]
];

export default function WordSearch() {
  const [words, setWords] = useState<Word[]>(() => INITIAL_WORDS.map((w) => ({ ...w, found: false })));
  const [startCell, setStartCell] = useState<{ r: number; c: number } | null>(null);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [message, setMessage] = useState<string | null>("HUBUNGKAN HURUF AWAL DAN AKHIR!");
  const resetGame = () => {
    setWords(INITIAL_WORDS.map((w) => ({ ...w, found: false })));
    setStartCell(null);
    setSelectedCells([]);
    setMessage("HUBUNGKAN HURUF AWAL DAN AKHIR!");
  };

  const getCellsBetween = (
    start: { r: number; c: number },
    end: { r: number; c: number }
  ): { r: number; c: number }[] => {
    const cells: { r: number; c: number }[] = [];
    const rowDiff = end.r - start.r;
    const colDiff = end.c - start.c;

    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    if (steps === 0) return [start];

    // Verify if it is horizontal, vertical or a perfect 45-degree diagonal
    const isHorizontal = rowDiff === 0;
    const isVertical = colDiff === 0;
    const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return []; // Invalid line path
    }

    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    for (let i = 0; i <= steps; i++) {
      cells.push({
        r: start.r + i * rowStep,
        c: start.c + i * colStep,
      });
    }

    return cells;
  };

  const handleCellClick = (r: number, c: number) => {
    if (!startCell) {
      // First click: select starting cell
      setStartCell({ r, c });
      setSelectedCells([{ r, c }]);
      setMessage("PILIH HURUF AKHIR UNTUK MENGHUBUNGKAN...");
    } else {
      // Second click: connect line
      const cells = getCellsBetween(startCell, { r, c });

      if (cells.length === 0) {
        // Invalid path
        setStartCell({ r, c });
        setSelectedCells([{ r, c }]);
        setMessage("GARIS TIDAK VALID! PILIH HURUF AWAL BARU.");
        return;
      }

      // Read spelling
      const spelled = cells.map((cell) => GRID[cell.r][cell.c]).join("");
      const reversedSpelled = [...spelled].reverse().join("");

      // Find matching word
      const foundWordIdx = words.findIndex(
        (w) =>
          !w.found &&
          (w.word === spelled || w.word === reversedSpelled)
      );

      if (foundWordIdx !== -1) {
        // Success: mark word as found
        const updatedWords = [...words];
        updatedWords[foundWordIdx].found = true;
        setWords(updatedWords);
        setMessage(`🎉 BERHASIL MENEMUKAN: "${updatedWords[foundWordIdx].word}"`);

        // Check if all found
        const allFound = updatedWords.every((w) => w.found);
        if (allFound) {
          setMessage("🏆 LUAR BIASA! SEMUA KATA DITEMUKAN!");
        }
      } else {
        // Incorrect word
        setMessage(`❌ "${spelled}" BUKAN KATA YANG DICARI.`);
      }

      // Reset selection
      setStartCell(null);
      setSelectedCells([]);
    }
  };

  const handleCellHover = (r: number, c: number) => {
    if (startCell) {
      const cells = getCellsBetween(startCell, { r, c });
      if (cells.length > 0) {
        setSelectedCells(cells);
      }
    }
  };

  // Helper to determine cell background color
  const getCellClassName = (r: number, c: number) => {
    // Check if cell is in the currently selected cells
    const isSelected = selectedCells.some((cell) => cell.r === r && cell.c === c);
    
    // Check if cell is in a word that has already been found
    let foundWordColor = "";
    for (const w of words) {
      if (w.found && w.cells.some((cell) => cell.r === r && cell.c === c)) {
        foundWordColor = w.color + " font-bold border-2 scale-95 opacity-80";
        break;
      }
    }

    if (isSelected) {
      return "bg-[#0ea5e9] text-white font-extrabold border-2 border-black";
    }

    if (foundWordColor) {
      return foundWordColor;
    }

    return "bg-[#222] text-gray-300 hover:bg-[#333] border-2 border-black";
  };

  const allWordsFound = words.length > 0 && words.every((w) => w.found);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-10 pixel-border relative overflow-hidden">
      
      {/* Completion Screen */}
      <AnimatePresence>
        {allWordsFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center p-8 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-emerald-950 border-4 border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Trophy className="w-10 h-10" />
            </motion.div>

            <div className="space-y-3 font-pixel">
              <h3 className="text-xl md:text-2xl font-bold text-emerald-400 tracking-wider flex items-center justify-center gap-2 animate-bounce">
                &gt; STAGE CLEAR!
              </h3>
              <p className="text-[10px] text-gray-300 max-w-md mx-auto leading-relaxed uppercase">
                Anda berhasil menemukan semua kata kunci layanan Digital Hub. Kami siap membantu merealisasikan proyek digital Anda berikutnya!
              </p>
            </div>

            <button
              onClick={resetGame}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[10px] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all uppercase flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Main Lagi</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Game Grid */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[360px] md:max-w-[400px] aspect-square bg-[#000] p-2 border-4 border-black grid grid-cols-10 grid-rows-10 gap-1 md:gap-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {GRID.map((row, rIdx) =>
              row.map((letter, cIdx) => (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  onMouseEnter={() => handleCellHover(rIdx, cIdx)}
                  className={`aspect-square flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-100 wordsearch-grid-cell ${getCellClassName(
                    rIdx,
                    cIdx
                  )}`}
                >
                  {letter}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Game Info & Words List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-wider font-pixel shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>MINI GAME</span>
            </span>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight leading-none font-title pt-2">
              Cari Layanan Kami
            </h3>
            <div className="p-3 bg-gray-100 border-2 border-black text-left min-h-[50px] flex items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono">
              <p className="text-[11px] font-bold text-gray-600 leading-normal uppercase">
                {message}
              </p>
            </div>
          </div>

          {/* List of Words to Find */}
          <div className="grid grid-cols-2 gap-2">
            {words.map((w, idx) => (
              <motion.div
                key={idx}
                animate={w.found ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`px-3 py-2.5 border-2 border-black flex items-center justify-between text-[8px] font-pixel transition-all ${
                  w.found
                    ? "bg-emerald-50 text-emerald-700 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <span className={w.found ? "line-through opacity-60" : ""}>
                  {w.word}
                </span>
                {w.found ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-gray-300 border border-black" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Reset Button */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={resetGame}
              className="text-[8px] font-pixel text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors uppercase"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Game</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
