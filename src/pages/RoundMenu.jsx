function ClubMeasure({
  clubs,
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
          <option key={c}>{c}</option>
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

      <p>選択：{direction}</p>

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

          setRecords([...records, newRecord]);

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
          <p>{index + 1}球目</p>
          <p>クラブ：{r.club}</p>
          <p>飛距離：{r.distance}y</p>
          <p>方向：{r.direction}</p>
          <p>ずれ幅：{r.miss}y</p>
        </div>
      ))}

      <br />

      <button onClick={() => setPage("club-menu")}>
        戻る
      </button>
    </div>
  );
}

export default ClubMeasure;