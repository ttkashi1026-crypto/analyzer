function ClubMeasure({
  club,
  setClub,
  distance,
  setDistance,
  direction,
  setDirection,
  miss,
  setMiss,
  records,
  setRecords,
  setPage,
}) {
  const saveRecord = () => {
    const now = new Date();

    const date =
      String(now.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(now.getDate()).padStart(2, "0");

    const time =
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0");

    const dir =
      direction === "左"
        ? "←"
        : direction === "右"
        ? "→"
        : "●";

    const newRecord = {
      recordedOn: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate(),
      ).padStart(2, "0")}`,
      datetime: `${date} ${time}`,
      club,
      distance,
      direction: dir,
      miss,
    };

    // 新しい記録を先頭へ追加
    setRecords([newRecord, ...records]);

    // 入力クリア
    setDistance("");
    setMiss("");
  };

  return (
    <div className="container">
      <div className="screenTitle">
        1-1. クラブ計測
      </div>

      <h1 className="title">⛳ 計測</h1>

      <h3>クラブ</h3>

      <div className="directionArea">
        <button
          className={`directionButton ${club === "DW" ? "active" : ""}`}
          onClick={() => setClub("DW")}
        >
          DW
        </button>

        <button
          className={`directionButton ${club === "FW" ? "active" : ""}`}
          onClick={() => setClub("FW")}
        >
          FW
        </button>

        <button
          className={`directionButton ${club === "UT" ? "active" : ""}`}
          onClick={() => setClub("UT")}
        >
          UT
        </button>
      </div>

      <div className="directionArea">
        <button
          className={`directionButton ${club === "7I" ? "active" : ""}`}
          onClick={() => setClub("7I")}
        >
          7I
        </button>

        <button
          className={`directionButton ${club === "PW" ? "active" : ""}`}
          onClick={() => setClub("PW")}
        >
          PW
        </button>
      </div>

      <h3>飛距離（ヤード）</h3>

      <input
        className="inputBox"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />

      <h3>方向</h3>

      <div className="directionArea">
        <button
          className={`directionButton ${
            direction === "左" ? "active" : ""
          }`}
          onClick={() => setDirection("左")}
        >
          ←
        </button>

        <button
          className={`directionButton ${
            direction === "まっすぐ" ? "active" : ""
          }`}
          onClick={() => setDirection("まっすぐ")}
        >
          ●
        </button>

        <button
          className={`directionButton ${
            direction === "右" ? "active" : ""
          }`}
          onClick={() => setDirection("右")}
        >
          →
        </button>
      </div>

      <h3>ずれ幅（ヤード）</h3>

      <input
        className="inputBox"
        type="number"
        value={miss}
        onChange={(e) => setMiss(e.target.value)}
      />

      <br />

      <button
        className="menuButton"
        onClick={saveRecord}
      >
        記録する
      </button>

      <br />
      <br />

      <h3>最新5件</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid #ccc",
            }}
          >
            <th>日時</th>
            <th>Club</th>
            <th>Dist</th>
            <th>Dir</th>
            <th>Miss</th>
          </tr>
        </thead>

        <tbody>
          {records.slice(0, 5).map((r, index) => (
            <tr
              key={index}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <td>{r.datetime}</td>
              <td>{r.club}</td>
              <td>{r.distance}</td>
              <td>{r.direction}</td>
              <td>{r.miss}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        className="backButton"
        onClick={() => setPage("club-menu")}
      >
        戻る
      </button>
    </div>
  );
}

export default ClubMeasure;
