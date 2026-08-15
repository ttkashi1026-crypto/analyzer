import { useEffect, useMemo, useState } from "react";

const toDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const formatDate = (dateKey) => dateKey.replaceAll("-", "/");

const getRecordDate = (record) => {
  if (record.recordedOn) return record.recordedOn;

  const [month, day] = record.datetime?.split(" ")[0]?.split("/") || [];
  return month && day
    ? `${new Date().getFullYear()}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    : null;
};

const isRecordForDate = (record, dateKey) => {
  if (record.recordedOn) {
    return record.recordedOn === dateKey;
  }

  const [, month, day] = dateKey.split("-");
  return record.datetime?.startsWith(`${month}/${day}`);
};

function ClubResult({ records, setPage }) {
  const availableDates = useMemo(
    () => [...new Set(records.map(getRecordDate).filter(Boolean))].sort(),
    [records],
  );
  const [selectedDate, setSelectedDate] = useState(
    () => availableDates.at(-1) || toDateKey(),
  );
  const recordsForDate = records.filter((record) =>
    isRecordForDate(record, selectedDate),
  );
  const selectedDateIndex = availableDates.indexOf(selectedDate);

  useEffect(() => {
    if (availableDates.length > 0 && selectedDateIndex === -1) {
      setSelectedDate(availableDates.at(-1));
    }
  }, [availableDates, selectedDateIndex]);

  const changeDate = (offset) => {
    const nextDate = availableDates[selectedDateIndex + offset];
    if (nextDate) setSelectedDate(nextDate);
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
        <button
          aria-label="前の記録日を表示"
          onClick={() => changeDate(-1)}
          disabled={selectedDateIndex <= 0}
        >
          ←
        </button>
        <strong>{formatDate(selectedDate)}</strong>
        <button
          aria-label="次の記録日を表示"
          onClick={() => changeDate(1)}
          disabled={
            selectedDateIndex === -1 ||
            selectedDateIndex >= availableDates.length - 1
          }
        >
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
              <th>左右ずれ幅</th>
              <th>ミスの種類</th>
            </tr>
          </thead>
          <tbody>
            {recordsForDate.map((record, index) => (
              <tr key={`${record.datetime}-${index}`}>
                <td>{record.datetime?.slice(-5)}</td>
                <td>{record.club === "DW" ? "DR" : record.club}</td>
                <td>{record.distance}</td>
                <td>{record.direction}</td>
                <td>{record.miss}</td>
                <td>{record.missType}</td>
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
