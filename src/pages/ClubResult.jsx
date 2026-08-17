import { useEffect, useMemo, useState } from "react";
import {
  formatAverage,
  formatDeviation,
  getDeviationColorClass,
  toFiniteNumber,
} from "../utils/clubRecordDisplay";

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
  const clubSummaries = useMemo(() => {
    const summaries = new Map();

    recordsForDate.forEach((record) => {
      const club = record.club === "DW" ? "DR" : record.club;
      const summary = summaries.get(club) || {
        club,
        shotCount: 0,
        distances: [],
        deviations: [],
        missCount: 0,
      };
      const distance = toFiniteNumber(record.distance);
      const deviation = toFiniteNumber(record.miss);

      summary.shotCount += 1;
      if (distance !== null) summary.distances.push(distance);
      summary.deviations.push(deviation ?? 0);
      if (record.missType) summary.missCount += 1;
      summaries.set(club, summary);
    });

    const average = (values) =>
      values.length === 0
        ? null
        : values.reduce((total, value) => total + value, 0) / values.length;
    const clubOrder = ["DR", "FW", "UT", "7I", "PW"];

    return [...summaries.values()]
      .map((summary) => ({
        ...summary,
        averageDistance: average(summary.distances),
        averageDeviation: average(summary.deviations),
        missRate: (summary.missCount / summary.shotCount) * 100,
      }))
      .sort((a, b) => {
        const aIndex = clubOrder.indexOf(a.club);
        const bIndex = clubOrder.indexOf(b.club);
        return (aIndex === -1 ? clubOrder.length : aIndex) -
          (bIndex === -1 ? clubOrder.length : bIndex);
      });
  }, [recordsForDate]);
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
        <>
          <h2 className="resultSectionTitle">クラブ別集計</h2>
          <table className="clubSummaryTable">
            <thead>
              <tr>
                <th>Club</th>
                <th>平均飛距離</th>
                <th>平均ずれ幅</th>
                <th>ミス率</th>
              </tr>
            </thead>
            <tbody>
              {clubSummaries.map((summary) => (
                <tr key={summary.club}>
                  <td>{summary.club}</td>
                  <td>
                    {formatAverage(summary.averageDistance)}
                    {summary.averageDistance !== null && "y"}
                  </td>
                  <td className={getDeviationColorClass(summary.averageDeviation)}>
                    {formatAverage(summary.averageDeviation)}
                    {summary.averageDeviation !== null && "y"}
                  </td>
                  <td>{summary.missRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="resultSectionTitle">計測記録</h2>
          <div className="tableWrap">
            <table className="clubResultDetailTable">
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
                    <td className={getDeviationColorClass(record.miss)}>
                      {formatDeviation(record.miss)}
                    </td>
                    <td>{record.missType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
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
