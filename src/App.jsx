import ErrorPage from "./pages/ErrorPage";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./pages/Home";
import ClubMenu from "./pages/ClubMenu";
import ClubMeasure from "./pages/ClubMeasure";

function App() {
  const [page, setPage] = useState("home");

  // 計測入力
  const [club, setClub] = useState("DW");
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState("まっすぐ");
  const [miss, setMiss] = useState("");

  // 全記録（LocalStorageから読み込み）
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("clubRecords");
    return saved ? JSON.parse(saved) : [];
  });

  // recordsが変わるたびに保存
  useEffect(() => {
    localStorage.setItem(
      "clubRecords",
      JSON.stringify(records)
    );
  }, [records]);

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
        records={records}
        setRecords={setRecords}
        setPage={setPage}
      />
    );
  }

  // 2. ラウンドモード
  if (page === "round-menu") {
    return (
      <div className="container">
        <div className="screenTitle">
          2. ラウンドモード
        </div>

        <h1 className="title">🏌️ ラウンドモード</h1>

        <button
          className="menuButton"
          onClick={() => setPage("error")}
        >
          計測
        </button>

        <button
          className="menuButton"
          onClick={() => setPage("error")}
        >
          結果参照
        </button>

        <button
          className="backButton"
          onClick={() => setPage("home")}
        >
          戻る
        </button>
      </div>
    );
  }

  // 保険
  return <Home setPage={setPage} />;
}

export default App;