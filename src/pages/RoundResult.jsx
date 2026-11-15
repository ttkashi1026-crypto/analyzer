import { useCallback, useEffect, useMemo, useState } from "react";

const toDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const formatDate = (dateKey) => dateKey.replaceAll("-", "/");
const EMPTY_ROUNDS = [];

const clubDefinitions = [
  { label: "DR", shotKey: "dwShot", missKey: "dwMiss" },
  { label: "FW", shotKey: "fwShot", missKey: "fwMiss" },
  { label: "UT", shotKey: "utShot", missKey: "utMiss" },
  { label: "アイアン", shotKey: "ironShot", missKey: "ironMiss" },
  { label: "アプローチ", shotKey: "approachShot", missKey: "approachMiss" },
];

const getClubStats = (records) =>
  clubDefinitions.map(({ label, shotKey, missKey }) => {
    const shots = records.reduce(
      (total, record) => total + (Number(record[shotKey]) || 0),
      0,
    );
    const misses = records.reduce(
      (total, record) => total + (Number(record[missKey]) || 0),
      0,
    );
    const successes = Math.max(0, shots - misses);

    return {
      label,
      shots,
      successes,
      rate: shots > 0 ? Math.round((successes / shots) * 100) : null,
    };
  });

function RoundResult({
  roundRecords,
  setPage,
  selectedDate,
  onSelectedDateChange,
  selectedRoundId,
  onSelectedRoundChange,
  onEditRecord,
}) {
  const [copyMessage, setCopyMessage] = useState("");
  const [internalSelectedRoundId, setInternalSelectedRoundId] = useState(null);
  const roundGroupsByDate = useMemo(() => {
    const groups = new Map();
    roundRecords.forEach((record, originalIndex) => {
      const date = record.recordedOn || toDateKey();
      const groupId = record.roundId
        ? `round:${record.roundId}`
        : `legacy:${date}`;
      const group = groups.get(groupId) || {
        id: groupId,
        date,
        firstIndex: originalIndex,
        recordEntries: [],
      };
      group.recordEntries.push({ record, originalIndex });
      groups.set(groupId, group);
    });
    const byDate = new Map();
    [...groups.values()].sort((a, b) => a.firstIndex - b.firstIndex)
      .forEach((group) => {
        const dateGroups = byDate.get(group.date) || [];
        dateGroups.push({ ...group, roundNumber: dateGroups.length + 1 });
        byDate.set(group.date, dateGroups);
      });
    return byDate;
  }, [roundRecords]);
  const availableDates = useMemo(
    () => [...roundGroupsByDate.keys()].sort(),
    [roundGroupsByDate],
  );
  const [internalSelectedDate, setInternalSelectedDate] = useState(
    () => availableDates.at(-1) || toDateKey(),
  );
  const currentSelectedDate = selectedDate ?? internalSelectedDate;
  const setSelectedDate = useCallback((date) => {
    setInternalSelectedDate(date);
    onSelectedDateChange?.(date);
  }, [onSelectedDateChange]);
  const roundsForDate = roundGroupsByDate.get(currentSelectedDate) || EMPTY_ROUNDS;
  const currentSelectedRoundId = selectedRoundId ?? internalSelectedRoundId;
  const selectedRound = roundsForDate.find((round) => round.id === currentSelectedRoundId);
  const setSelectedRound = useCallback((roundId) => {
    setInternalSelectedRoundId(roundId);
    onSelectedRoundChange?.(roundId);
    setCopyMessage("");
  }, [onSelectedRoundChange]);
  const recordsForDate = selectedRound?.recordEntries.map(({ record }) => record) || [];
  const recordEntriesForDate = selectedRound?.recordEntries || [];
  const grossScore = recordsForDate.reduce(
    (total, record) => total + (Number(record.score) || 0),
    0,
  );
  const clubStats = getClubStats(recordsForDate);
  const selectedDateIndex = availableDates.indexOf(currentSelectedDate);
  const selectedRoundIndex = roundsForDate.findIndex((round) => round.id === currentSelectedRoundId);

  useEffect(() => {
    if (availableDates.length > 0 && selectedDateIndex === -1) {
      setSelectedDate(availableDates.at(-1));
    }
  }, [availableDates, selectedDateIndex, setSelectedDate]);

  useEffect(() => {
    if (roundsForDate.length > 0 && selectedRoundIndex === -1) {
      setSelectedRound(roundsForDate.at(-1).id);
    }
  }, [roundsForDate, selectedRoundIndex, currentSelectedDate, setSelectedRound]);

  const changeDate = (offset) => {
    const nextDate = availableDates[selectedDateIndex + offset];
    if (nextDate) {
      setSelectedDate(nextDate);
      const nextDateRounds = roundGroupsByDate.get(nextDate) || [];
      setSelectedRound(nextDateRounds.at(-1)?.id || null);
    }
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

    const resultText = [
      "ラウンド結果",
      `記録日: ${formatDate(currentSelectedDate)}`,
      `ラウンド: ${selectedRound?.roundNumber || 1}ラウンド目`,
      `コピー日時: ${copyDateTime}`,
      `グロススコア: ${grossScore}`,
      "クラブ別成功率",
      ...clubStats.map(
        ({ label, successes, shots, rate }) =>
          `${label}: ${rate === null ? "—" : `${rate}%`} (${successes}/${shots})`,
      ),
      ...recordsForDate.map((record) => {
        const penalty =
          record.dwPenalty +
          record.fwPenalty +
          (Number(record.utPenalty) || 0) +
          record.ironPenalty +
          record.approachPenalty;

        return `${record.hole}H  PAR ${record.par}  SCORE ${record.score}  DR ${record.dwShot}(${record.dwMiss})  FW ${record.fwShot}(${record.fwMiss})  UT ${record.utShot || 0}(${record.utMiss || 0})  IR ${record.ironShot}(${record.ironMiss})  AP ${record.approachShot}(${record.approachMiss})  PT ${record.putt}  Pen ${penalty}`;
      }),
      `合計  PAR ${totalPar}  SCORE ${grossScore}  (${grossScore - totalPar >= 0 ? "+" : ""}${grossScore - totalPar})`,
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
          aria-label="前の記録日を表示"
          onClick={() => changeDate(-1)}
          disabled={selectedDateIndex <= 0}
        >
          ←
        </button>
        <strong>{formatDate(currentSelectedDate)}</strong>
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

      {roundsForDate.length > 1 && (
        <div className="roundChoice" role="group" aria-label="ラウンド選択">
          {roundsForDate.map((round) => (
            <button
              key={round.id}
              className={`roundChoiceButton ${round.id === currentSelectedRoundId ? "active" : ""}`}
              aria-pressed={round.id === currentSelectedRoundId}
              onClick={() => setSelectedRound(round.id)}
            >
              {round.roundNumber}ラウンド目
            </button>
          ))}
        </div>
      )}

      {recordsForDate.length === 0 ? (
        <p>ラウンドデータがありません。</p>
      ) : (
        <>
          <section className="roundSummary" aria-label="ラウンド集計">
            <div className="grossScoreCard">
              <span>グロススコア</span>
              <strong>{grossScore}</strong>
            </div>

            <div className="clubSuccessSummary">
              <h2>クラブ別成功率</h2>
              <div className="clubSuccessGrid">
                {clubStats.map(({ label, successes, shots, rate }) => (
                  <div className="clubSuccessCard" key={label}>
                    <span>{label}</span>
                    <strong>{rate === null ? "—" : `${rate}%`}</strong>
                    <small>
                      {successes} / {shots}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </section>

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
              <th>DR</th>
              <th>FW</th>
              <th>UT</th>
              <th>IR</th>
              <th>AP</th>
              <th>PT</th>
              <th>Pen</th>
              <th>修正</th>
            </tr>
          </thead>

          <tbody>
            {recordEntriesForDate.map(({ record: r, originalIndex }) => {
              const penalty =
                r.dwPenalty +
                r.fwPenalty +
                (Number(r.utPenalty) || 0) +
                r.ironPenalty +
                r.approachPenalty;

              return (
                <tr
                  key={`${currentSelectedDate}-${r.hole}-${originalIndex}`}
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
                    {r.utShot || 0}
                    ({r.utMiss || 0})
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
                  <td>
                    <button
                      className="roundEditButton"
                      aria-label={`${r.hole}番ホールの記録を修正`}
                      onClick={() => onEditRecord(originalIndex)}
                    >
                      編集
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </>
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
