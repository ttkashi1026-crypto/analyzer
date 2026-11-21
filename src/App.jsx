import ErrorPage from "./pages/ErrorPage";
import { useState, useEffect, useCallback } from "react";
import "./App.css";

import Home from "./pages/Home";
import ClubMenu from "./pages/ClubMenu";
import ClubMeasure from "./pages/ClubMeasure";
import ClubResult from "./pages/ClubResult";
import ClubRecordsEdit from "./pages/ClubRecordsEdit";

import RoundMenu from "./pages/RoundMenu";
import RoundMeasure from "./pages/RoundMeasure";
import RoundResult from "./pages/RoundResult";
import MaintenanceMenu from "./pages/MaintenanceMenu";
import RoundRecordsEdit from "./pages/RoundRecordsEdit";

const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const createRoundDraft = (roundId) => ({
  roundId,
  recordedOn: getDateKey(),
  hole: 1,
  par: 4,
  dwShot: 0,
  dwMiss: 0,
  dwPenalty: 0,
  fwShot: 0,
  fwMiss: 0,
  fwPenalty: 0,
  utShot: 0,
  utMiss: 0,
  utPenalty: 0,
  ironShot: 0,
  ironMiss: 0,
  ironPenalty: 0,
  approachShot: 0,
  approachMiss: 0,
  approachPenalty: 0,
  putt: 0,
  updatedAt: Date.now(),
});

function App() {
  const [page, setPage] = useState("home");
  const [editingRoundIndex, setEditingRoundIndex] = useState(null);
  const [activeRoundId, setActiveRoundId] = useState(null);
  const [editingClubIndex, setEditingClubIndex] = useState(null);
  const [selectedRoundResultDate, setSelectedRoundResultDate] = useState(null);
  const [selectedRoundResultId, setSelectedRoundResultId] = useState(null);

  // クラブ計測入力
  const [club, setClub] = useState("DR");
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState("まっすぐ");
  const [miss, setMiss] = useState("");
  const [missType, setMissType] = useState("");

  // クラブ計測記録
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("clubRecords");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "clubRecords",
      JSON.stringify(records)
    );
  }, [records]);

  // ラウンド記録
  const [roundRecords, setRoundRecords] = useState(() => {
    const saved = localStorage.getItem("roundRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [roundDrafts, setRoundDrafts] = useState(() => {
    const savedDrafts = localStorage.getItem("roundDrafts");
    if (savedDrafts) return JSON.parse(savedDrafts);

    const legacyRounds = new Map();
    roundRecords.forEach((record) => {
      if (!record.roundId) return;
      const round = legacyRounds.get(record.roundId) || {
        recordedOn: record.recordedOn || getDateKey(),
        holes: [],
      };
      round.holes.push(Number(record.hole) || 0);
      legacyRounds.set(record.roundId, round);
    });

    return [...legacyRounds.entries()]
      .map(([roundId, round]) => {
        const savedHoles = [...new Set(round.holes)].filter((hole) => hole > 0);
        const nextHole = Math.max(0, ...savedHoles) + 1;
        return savedHoles.length > 0 && nextHole <= 18
          ? { ...createRoundDraft(roundId), recordedOn: round.recordedOn, hole: nextHole }
          : null;
      })
      .filter(Boolean);
  });

  useEffect(() => {
    localStorage.setItem(
      "roundRecords",
      JSON.stringify(roundRecords),
    );
  }, [roundRecords]);

  useEffect(() => {
    localStorage.setItem("roundDrafts", JSON.stringify(roundDrafts));
  }, [roundDrafts]);

  const updateRoundDraft = useCallback((draft) => {
    setRoundDrafts((current) => {
      const exists = current.some((item) => item.roundId === draft.roundId);
      return exists
        ? current.map((item) => item.roundId === draft.roundId ? draft : item)
        : [...current, draft];
    });
  }, []);

  const finishRoundDraft = useCallback((roundId) => {
    setRoundDrafts((current) => current.filter((draft) => draft.roundId !== roundId));
  }, []);

  // 9. エラー
  if (page === "error") {
    return <ErrorPage setPage={setPage} />;
  }

  // 0. トップ画面
  if (page === "home") {
    return <Home setPage={setPage} />;
  }

  // 1. クラブ別計測
  if (page === "club-menu") {
    return <ClubMenu setPage={setPage} />;
  }

  // 1-1. クラブ計測
  if (page === "measure") {
    return (
      <ClubMeasure
        club={club}
        setClub={setClub}
        distance={distance}
        setDistance={setDistance}
        direction={direction}
        setDirection={setDirection}
        miss={miss}
        setMiss={setMiss}
        missType={missType}
        setMissType={setMissType}
        records={records}
        setRecords={setRecords}
        setPage={setPage}
        editingIndex={editingClubIndex}
        onFinishEditing={() => setEditingClubIndex(null)}
      />
    );
  }

  if (page === "club-result") {
    return (
      <ClubResult
        records={records}
        setPage={setPage}
        onEditRecord={(index) => {
          const record = records[index];
          if (!record) return;
          setEditingClubIndex(index);
          setClub(record.club === "DW" ? "DR" : record.club);
          setDistance(record.distance ?? "");
          setDirection(record.direction === "←" || record.direction === "左" ? "左" : record.direction === "→" || record.direction === "右" ? "右" : "まっすぐ");
          setMiss(record.miss ?? "");
          setMissType(record.missType === "ネックシャンク" ? "シャンク" : record.missType ?? "");
          setPage("measure");
        }}
      />
    );
  }

  // 2. ラウンドモード
  if (page === "round-menu") {
    return (
      <RoundMenu
        onStartRound={() => {
          const newRoundId = globalThis.crypto?.randomUUID?.() ||
            `round-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          setActiveRoundId(newRoundId);
          updateRoundDraft(createRoundDraft(newRoundId));
          setSelectedRoundResultDate(null);
          setSelectedRoundResultId(null);
          setEditingRoundIndex(null);
          setPage("round-measure");
        }}
        roundDrafts={roundDrafts}
        roundRecords={roundRecords}
        onResumeRound={(draft) => {
          setActiveRoundId(draft.roundId);
          setEditingRoundIndex(null);
          setPage("round-measure");
        }}
        setPage={setPage}
      />
    );
  }
    // 2-1. ラウンド記録
  if (page === "round-measure") {
    return (
      <RoundMeasure
        setPage={setPage}
        roundRecords={roundRecords}
        setRoundRecords={setRoundRecords}
        editingIndex={editingRoundIndex}
        activeRoundId={activeRoundId}
        draft={roundDrafts.find((item) => item.roundId === activeRoundId) || null}
        onDraftChange={updateRoundDraft}
        onFinishRound={finishRoundDraft}
        onFinishEditing={() => setEditingRoundIndex(null)}
      />
    );
  }

  // 2-2. ラウンド結果
  if (page === "round-result") {
    return (
      <RoundResult
        roundRecords={roundRecords}
        setPage={setPage}
        selectedDate={selectedRoundResultDate}
        onSelectedDateChange={setSelectedRoundResultDate}
        selectedRoundId={selectedRoundResultId}
        onSelectedRoundChange={setSelectedRoundResultId}
        onEditRecord={(index) => {
          const record = roundRecords[index];
          setSelectedRoundResultDate(
            record?.recordedOn || null,
          );
          setSelectedRoundResultId(
            record?.roundId ? `round:${record.roundId}` :
              `legacy:${record?.recordedOn || "unknown"}`,
          );
          setActiveRoundId(record?.roundId || null);
          setEditingRoundIndex(index);
          setPage("round-measure");
        }}
      />
    );
  }

  if (page === "maintenance-menu") {
    return (
      <MaintenanceMenu
        records={records}
        roundRecords={roundRecords}
        setPage={setPage}
      />
    );
  }

  if (page === "round-records-edit") {
    return (
      <RoundRecordsEdit
        roundRecords={roundRecords}
        setRoundRecords={setRoundRecords}
        setPage={setPage}
      />
    );
  }

  if (page === "club-records-edit") {
    return (
      <ClubRecordsEdit
        records={records}
        setRecords={setRecords}
        setPage={setPage}
      />
    );
  }

  // 保険
  return <Home setPage={setPage} />;
}

export default App;
