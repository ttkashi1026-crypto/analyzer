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
  const clubs = ["DW", "FW", "UT", "7I", "PW"];
  const directions = ["左", "まっすぐ", "右"];

  const saveRecord = () => {
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(
      now.getDate(),
    ).padStart(2, "0")}`;
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;

    const directionLabel = direction === "左" ? "←" : direction === "右" ? "→" : "●";

    setRecords([
      {
        recordedOn: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
          now.getDate(),
        ).padStart(2, "0")}`,
        datetime: `${date} ${time}`,
        club,
        distance,
        direction: directionLabel,
        miss,
      },
      ...records,
    ]);
    setDistance("");
    setMiss("");
  };

  return (
    <div className="container clubMeasure">
      <div className="screenTitle">1-1. クラブ別計測</div>
      <h1 className="title">クラブ計測</h1>

      <section className="clubSelector" aria-label="クラブ選択">
        <span className="compactLabel">クラブ</span>
        <div className="clubButtons">
          {clubs.map((clubName) => (
            <button
              key={clubName}
              className={`directionButton ${club === clubName ? "active" : ""}`}
              onClick={() => setClub(clubName)}
            >
              {clubName}
            </button>
          ))}
        </div>
      </section>

      <section className="measurementRow" aria-label="ショット記録">
        <label className="compactField numericField">
          <span className="compactLabel">飛距離</span>
          <input
            className="inputBox"
            type="number"
            inputMode="numeric"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            aria-label="飛距離"
          />
        </label>

        <div className="compactField directionField">
          <span className="compactLabel">方向</span>
          <div className="directionButtons" role="group" aria-label="方向">
            {directions.map((value) => (
              <button
                key={value}
                className={`directionButton ${direction === value ? "active" : ""}`}
                onClick={() => setDirection(value)}
                aria-label={value}
              >
                {value === "左" ? "←" : value === "右" ? "→" : "●"}
              </button>
            ))}
          </div>
        </div>

        <label className="compactField numericField">
          <span className="compactLabel">ミス量</span>
          <input
            className="inputBox"
            type="number"
            inputMode="numeric"
            value={miss}
            onChange={(e) => setMiss(e.target.value)}
            aria-label="ミス量"
          />
        </label>

        <button className="menuButton saveButton" onClick={saveRecord}>
          記録する
        </button>
      </section>

      <section className="recentRecords">
        <h3>最新記録</h3>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>日時</th>
                <th>Club</th>
                <th>距離</th>
                <th>方向</th>
                <th>ミス</th>
              </tr>
            </thead>
            <tbody>
              {records.slice(0, 5).map((record, index) => (
                <tr key={`${record.datetime}-${index}`}>
                  <td>{record.datetime}</td>
                  <td>{record.club}</td>
                  <td>{record.distance}</td>
                  <td>{record.direction}</td>
                  <td>{record.miss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <button className="backButton" onClick={() => setPage("club-menu")}>
        戻る
      </button>
    </div>
  );
}

export default ClubMeasure;
