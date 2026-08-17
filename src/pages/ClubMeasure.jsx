import { useState } from "react";
import {
  formatDeviation,
  getDeviationColorClass,
} from "../utils/clubRecordDisplay";

function ClubMeasure({
  club,
  setClub,
  distance,
  setDistance,
  direction,
  setDirection,
  miss,
  setMiss,
  missType,
  setMissType,
  records,
  setRecords,
  setPage,
}) {
  const [hiddenRecords, setHiddenRecords] = useState(() => new Set());
  const [copyMessage, setCopyMessage] = useState("");
  const clubs = ["DR", "FW", "UT", "7I", "PW"];
  const missTypes = ["トップ", "ダフリ", "トゥシャンク", "シャンク"];
  const directions = ["左", "まっすぐ", "右"];
  const displayClub = (clubName) => (clubName === "DW" ? "DR" : clubName);
  const displayMissType = (type) => (type === "ネックシャンク" ? "シャンク" : type);
  const recentRecords = records
    .filter((record) => !hiddenRecords.has(record))
    .slice(0, 5);

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
        missType,
      },
      ...records,
    ]);
    setDistance("");
    setMiss("");
    setMissType("");
    setCopyMessage("");
  };

  const hideDisplayedRecords = () => {
    setHiddenRecords(new Set(records));
    setCopyMessage("");
  };

  const copyRecentRecords = async () => {
    const text = [
      "日時\tClub\t距離\t方向\t左右ずれ幅\tミスの種類",
      ...recentRecords.map((record) =>
        [
          record.datetime,
          displayClub(record.club),
          record.distance,
          record.direction,
          record.miss === "" || record.miss == null ? 0 : record.miss,
          displayMissType(record.missType) ?? "",
        ].join("\t"),
      ),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("コピーしました");
    } catch {
      setCopyMessage("コピーに失敗しました");
    }
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
          <span className="compactLabel">左右ずれ幅</span>
          <input
            className="inputBox"
            type="number"
            inputMode="numeric"
            value={miss}
            onChange={(e) => setMiss(e.target.value)}
            aria-label="左右ずれ幅"
          />
        </label>

        <div className="compactField missTypeField">
          <span className="compactLabel">ミスの種類</span>
          <div className="missTypeButtons" role="group" aria-label="ミスの種類">
            {missTypes.map((value) => (
              <button
                key={value}
                className={`directionButton ${missType === value ? "active" : ""}`}
                onClick={() => setMissType(missType === value ? "" : value)}
                aria-pressed={missType === value}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button className="menuButton saveButton" onClick={saveRecord}>
          記録する
        </button>
      </section>

      <section className="recentRecords">
        <div className="recentRecordsHeader">
          <h3>最新記録</h3>
          <button
            className="recentRecordsToggle"
            onClick={hideDisplayedRecords}
            disabled={recentRecords.length === 0}
          >
            画面表示から消す
          </button>
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>距離</th>
                <th>方向</th>
                <th>左右ずれ幅</th>
                <th>ミスの種類</th>
              </tr>
            </thead>
            <tbody>
              {recentRecords.map((record, index) => (
                <tr key={`${record.datetime}-${index}`}>
                  <td>{displayClub(record.club)}</td>
                  <td>{record.distance}</td>
                  <td>{record.direction}</td>
                  <td className={getDeviationColorClass(record.miss)}>
                    {formatDeviation(record.miss)}
                  </td>
                  <td>{displayMissType(record.missType)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="copyRecentRecordsButton"
          onClick={copyRecentRecords}
          disabled={recentRecords.length === 0}
        >
          画面表示内容をコピー
        </button>
        {copyMessage && <span className="copyMessage">{copyMessage}</span>}
      </section>

      <button className="backButton" onClick={() => setPage("club-menu")}>
        戻る
      </button>
    </div>
  );
}

export default ClubMeasure;
