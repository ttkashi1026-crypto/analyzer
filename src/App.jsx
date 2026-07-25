import ErrorPage from "./pages/ErrorPage";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./pages/Home";
import ClubMenu from "./pages/ClubMenu";
import ClubMeasure from "./pages/ClubMeasure";
import RoundMeasure from "./pages/RoundMeasure";
import RoundResult from "./pages/RoundResult";


function App() {
  const [page, setPage] = useState("home");


  // クラブ計測入力
  const [club, setClub] = useState("DW");
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState("まっすぐ");
  const [miss, setMiss] = useState("");



  // クラブ全記録
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("clubRecords");
    return saved ? JSON.parse(saved) : [];
  });



  // クラブ記録保存
  useEffect(() => {
    localStorage.setItem(
      "clubRecords",
      JSON.stringify(records)
    );
  }, [records]);





  // エラー画面
  if (page === "error") {
    return (
      <ErrorPage
        setPage={setPage}
      />
    );
  }





  // ホーム
  if (page === "home") {
    return (
      <Home
        setPage={setPage}
      />
    );
  }





  // クラブメニュー
  if (page === "club-menu") {
    return (
      <ClubMenu
        setPage={setPage}
      />
    );
  }





  // クラブ計測
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





  // ラウンド計測
  if (page === "round-measure") {
    return (
      <RoundMeasure
        setPage={setPage}
      />
    );
  }





  // ラウンド結果
  if (page === "round-result") {
    return (
      <RoundResult
        setPage={setPage}
      />
    );
  }





  // ラウンドメニュー
  if (page === "round-menu") {

    return (

      <div className="container">


        <div className="screenTitle">
          2. ラウンドモード
        </div>



        <h1 className="title">
          🏌️ ラウンドモード
        </h1>




        <button
          className="menuButton"
          onClick={() =>
            setPage("round-measure")
          }
        >
          計測
        </button>




        <button
          className="menuButton"
          onClick={() =>
            setPage("round-result")
          }
        >
          結果参照
        </button>




        <button
          className="backButton"
          onClick={() =>
            setPage("home")
          }
        >
          戻る
        </button>



      </div>

    );
  }





  // 保険
  return (
    <Home
      setPage={setPage}
    />
  );

}


export default App;