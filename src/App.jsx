import { useState } from "react";
import "./App.css";

const clubs = [
  "ドライバー",
  "FW",
  "UT",
  "アイアン",
  "アプローチ",
  "パター",
];

function App() {
  const [page, setPage] = useState("home");

  // 計測入力
  const [club, setClub] = useState("ドライバー");
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState("まっすぐ");
  const [miss, setMiss] = useState("");

  // 記録一覧
  const [records, setRecords] = useState([]);


  // エラー画面
  if (page === "error") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>⚠️ エラー</h1>
        <p>この機能はまだ作成中です。</p>

        <button onClick={() => setPage("home")}>
          トップへ戻る
        </button>
      </div>
    );
  }


  // クラブ別計測メニュー
  if (page === "club-menu") {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>⛳ クラブ別計測</h1>

        <button
          style={{ width: "250px", padding: "15px" }}
          onClick={() => setPage("measure")}
        >
          計測
        </button>

        <br /><br />

        <button
          style={{ width: "250px", padding: "15px" }}
          onClick={() => setPage("error")}
        >
          結果参照
        </button>

        <br /><br />

        <button onClick={() => setPage("home")}>
          戻る
        </button>
      </div>
    );
  }


  // クラブ計測画面
  if (page === "measure") {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          textAlign: "center",
        }}
      >

        <h1>⛳ 計測</h1>


        <h3>クラブ</h3>

        <select
          value={club}
          onChange={(e) => setClub(e.target.value)}
        >
          {clubs.map((c) => (
            <option key={c}>
              {c}
            </option>
          ))}
        </select>


        <h3>飛距離（ヤード）</h3>

        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="例：160"
        />


        <h3>方向</h3>

        <button onClick={() => setDirection("左")}>
          左
        </button>

        <button onClick={() => setDirection("まっすぐ")}>
          まっすぐ
        </button>

        <button onClick={() => setDirection("右")}>
          右
        </button>


        <p>
          選択：{direction}
        </p>


        <h3>ずれ幅（ヤード）</h3>

        <input
          type="number"
          value={miss}
          onChange={(e) => setMiss(e.target.value)}
          placeholder="例：15"
        />


        <br /><br />


        <button
          onClick={() => {
            const newRecord = {
              club,
              distance,
              direction,
              miss,
            };

            setRecords([
              ...records,
              newRecord,
            ]);

            setDistance("");
            setMiss("");
          }}
        >
          記録する
        </button>


        <h2>記録結果</h2>

        {records.map((r, index) => (
          <div key={index}>
            <hr />

            <p>
              {index + 1}球目
            </p>

            <p>
              クラブ：{r.club}
            </p>

            <p>
              飛距離：{r.distance}y
            </p>

            <p>
              方向：{r.direction}
            </p>

            <p>
              ずれ幅：{r.miss}y
            </p>
          </div>
        ))}


        <br />

        <button onClick={() => setPage("club-menu")}>
          戻る
        </button>

      </div>
    );
  }


  // ラウンドモード記録
  if (page === "round-menu") {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>🏌️ ラウンドモード記録</h1>

        <button
          style={{ width: "250px", padding: "15px" }}
          onClick={() => setPage("error")}
        >
          計測
        </button>

        <br /><br />

        <button
          style={{ width: "250px", padding: "15px" }}
          onClick={() => setPage("error")}
        >
          結果参照
        </button>

        <br /><br />

        <button onClick={() => setPage("home")}>
          戻る
        </button>
      </div>
    );
  }


  // トップ画面
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >

      <h1>⛳ ゴルフ分析アプリ</h1>


      <button
        style={{
          width: "250px",
          padding: "15px",
        }}
        onClick={() => setPage("club-menu")}
      >
        クラブ別計測
      </button>


      <br /><br />


      <button
        style={{
          width: "250px",
          padding: "15px",
        }}
        onClick={() => setPage("round-menu")}
      >
        ラウンドモード記録
      </button>

    </div>
  );
}

export default App;