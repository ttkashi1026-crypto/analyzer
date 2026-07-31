import { useState } from "react";

const toDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const formatDate = (dateKey) => dateKey.replaceAll("-", "/");

function RoundResult({ roundRecords, setPage }) {
  const [copyMessage, setCopyMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(toDateKey);
  const recordsForDate = roundRecords.filter(
    (record) => (record.recordedOn || toDateKey()) === selectedDate,
  );

  const changeDate = (days) => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const nextDate = new Date(year, month - 1, day);
    nextDate.setDate(nextDate.getDate() + days);
    setSelectedDate(toDateKey(nextDate));
    setCopyMessage("");
  };

  const copyResults = async () => {
    const copiedAt = new Date();
    const copyDateTime = `${copiedAt.getFullYear()}/${String(
      copiedAt.getMonth() + 1,
    ).padStart(2, "0")}/${String(copiedAt.getDate()).padStart(2, "0")} ${String(
      copiedAt.getHours(),
    ).padStart(2, "0")}:${String(copiedAt.getMinutes()).padStart(2, "0")}`;
    const totalPar = recordsForDate.reduce(
      (total, record) => total + record.par,
      0,
    );
    const totalScore = recordsForDate.reduce(
      (total, record) => total + record.score,
      0,
    );

    const resultText = [
      "ラウンド結果",
      `記録日: ${formatDate(selectedDate)}`,
      `コピー日時: ${copyDateTime}`,
      ...recordsForDate.map((record) => {
        const penalty =
          record.dwPenalty +
          record.fwPenalty +
          record.ironPenalty +
          record.approachPenalty;

        return `${record.hole}H  PAR ${record.par}  SCORE ${record.score}  DW ${record.dwShot}(${record.dwMiss})  FW ${record.fwShot}(${record.fwMiss})  IR ${record.ironShot}(${record.ironMiss})  AP ${record.approachShot}(${record.approachMiss})  PT ${record.putt}  Pen ${penalty}`;
      }),
      `合計  PAR ${totalPar}  SCORE ${totalScore}  (${totalScore - totalPar >= 0 ? "+" : ""}${totalScore - totalPar})`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(resultText);
      setCopyMessage("コピーしました");
    } catch {
      setCopyMessage("コピーに失敗しました");
    }
  };

  return (
    <div className="container">
      <div className="screenTitle">
        2-2. ラウンド結果
      </div>

      <h1 className="title">📊 ラウンド結果</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <button
          aria-label="前日を表示"
          onClick={() => changeDate(-1)}
        >
          ←
        </button>
        <strong>{formatDate(selectedDate)}</strong>
        <button
          aria-label="翌日を表示"
          onClick={() => changeDate(1)}
        >
          →
        </button>
      </div>

      {recordsForDate.length === 0 ? (
        <p>ラウンドデータがありません。</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>H</th>
              <th>PAR</th>
              <th>SC</th>
              <th>DW</th>
              <th>FW</th>
              <th>IR</th>
              <th>AP</th>
              <th>PT</th>
              <th>Pen</th>
            </tr>
          </thead>

          <tbody>
            {recordsForDate.map((r, index) => {
              const penalty =
                r.dwPenalty +
                r.fwPenalty +
                r.ironPenalty +
                r.approachPenalty;

              return (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td>{r.hole}</td>
                  <td>{r.par}</td>
                  <td>{r.score}</td>

                  <td>
                    {r.dwShot}
                    ({r.dwMiss})
                  </td>

                  <td>
                    {r.fwShot}
                    ({r.fwMiss})
                  </td>

                  <td>
                    {r.ironShot}
                    ({r.ironMiss})
                  </td>

                  <td>
                    {r.approachShot}
                    ({r.approachMiss})
                  </td>

                  <td>{r.putt}</td>

                  <td>{penalty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {recordsForDate.length > 0 && (
        <>
          <button className="menuButton" onClick={copyResults}>
            結果をコピー
          </button>
          {copyMessage && (
            <p style={{ textAlign: "center" }}>{copyMessage}</p>
          )}
        </>
      )}

      <br />

      <button
        className="backButton"
        onClick={() => setPage("round-menu")}
      >
        戻る
      </button>
    </div>
  );
}

export default RoundResult;
