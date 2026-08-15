import { useState } from "react";

function RoundRecordsEdit({ roundRecords, setRoundRecords, setPage }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const allSelected =
    roundRecords.length > 0 && selectedIndexes.length === roundRecords.length;

  const toggleRecord = (index) => {
    setSelectedIndexes((current) =>
      current.includes(index)
        ? current.filter((selectedIndex) => selectedIndex !== index)
        : [...current, index],
    );
  };

  const toggleAllRecords = () => {
    setSelectedIndexes(
      allSelected ? [] : roundRecords.map((_, index) => index),
    );
  };

  const deleteSelectedRecords = () => {
    if (selectedIndexes.length === 0) {
      return;
    }

    if (!window.confirm(`選択した${selectedIndexes.length}件の記録を削除しますか？`)) {
      return;
    }

    setRoundRecords(
      roundRecords.filter((_, index) => !selectedIndexes.includes(index)),
    );
    setSelectedIndexes([]);
  };

  return (
    <div className="container">
      <div className="screenTitle">3-1. ラウンド記録データ編集</div>

      <h1 className="title">ラウンド記録</h1>

      {roundRecords.length === 0 ? (
        <p>保存されているラウンド記録はありません。</p>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: "820px", fontSize: "13px" }}>
              <thead>
                <tr>
                  <th>
                    <input
                      aria-label="すべての記録を選択"
                      checked={allSelected}
                      onChange={toggleAllRecords}
                      type="checkbox"
                    />
                  </th>
                  <th>日付</th>
                  <th>H</th>
                  <th>PAR</th>
                  <th>SC</th>
                  <th>DR</th>
                  <th>FW</th>
                  <th>IR</th>
                  <th>AP</th>
                  <th>PT</th>
                </tr>
              </thead>
              <tbody>
                {roundRecords.map((record, index) => (
                  <tr key={`${record.recordedOn || "legacy"}-${record.hole}-${index}`}>
                    <td>
                      <input
                        aria-label={`${record.hole}番ホールの記録を選択`}
                        checked={selectedIndexes.includes(index)}
                        onChange={() => toggleRecord(index)}
                        type="checkbox"
                      />
                    </td>
                    <td>{record.recordedOn || "保存前"}</td>
                    <td>{record.hole}</td>
                    <td>{record.par}</td>
                    <td>{record.score}</td>
                    <td>{record.dwShot}</td>
                    <td>{record.fwShot}</td>
                    <td>{record.ironShot}</td>
                    <td>{record.approachShot}</td>
                    <td>{record.putt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="menuButton"
            disabled={selectedIndexes.length === 0}
            onClick={deleteSelectedRecords}
          >
            選択した記録を削除（{selectedIndexes.length}件）
          </button>
        </>
      )}

      <button
        className="backButton"
        onClick={() => setPage("maintenance-menu")}
      >
        戻る
      </button>
    </div>
  );
}

export default RoundRecordsEdit;
