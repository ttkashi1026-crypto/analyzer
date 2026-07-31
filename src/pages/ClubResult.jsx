import { useState } from "react";

const toDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const formatDate = (dateKey) => dateKey.replaceAll("-", "/");

const isRecordForDate = (record, dateKey) => {
  if (record.recordedOn) {
    return record.recordedOn === dateKey;
  }

  const [, month, day] = dateKey.split("-");
  return record.datetime?.startsWith(`${month}/${day}`);
};

function ClubResult({ records, setPage }) {
  const [selectedDate, setSelectedDate] = useState(toDateKey);
  const recordsForDate = records.filter((record) =>
    isRecordForDate(record, selectedDate),
  );

  const changeDate = (days) => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const nextDate = new Date(year, month - 1, day);
    nextDate.setDate(nextDate.getDate() + days);
    setSelectedDate(toDateKey(nextDate));
  };

  return (
    <div className="container">
      <div className="screenTitle">1-2. クラブ別計測結果</div>

      <h1 className="title">クラブ別計測結果</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <button aria-label="前日を表示" onClick={() => changeDate(-1)}>
          ←
        </button>
        <strong>{formatDate(selectedDate)}</strong>
        <button aria-label="翌日を表示" onClick={() => changeDate(1)}>
          →
        </button>
      </div>

      {recordsForDate.length === 0 ? (
        <p>この日の計測記録はありません。</p>
      ) : (
        <table style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>時間</th>
              <th>Club</th>
              <th>Dist</th>
              <th>Dir</th>
              <th>Miss</th>
            </tr>
          </thead>
          <tbody>
            {recordsForDate.map((record, index) => (
              <tr key={`${record.datetime}-${index}`}>
                <td>{record.datetime?.slice(-5)}</td>
                <td>{record.club}</td>
                <td>{record.distance}</td>
                <td>{record.direction}</td>
                <td>{record.miss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="backButton"
        onClick={() => setPage("club-menu")}
      >
        戻る
      </button>
    </div>
  );
}

export default ClubResult;
