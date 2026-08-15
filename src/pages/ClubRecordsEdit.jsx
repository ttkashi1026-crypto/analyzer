import { useState } from "react";

function ClubRecordsEdit({ records, setRecords, setPage }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const allSelected =
    records.length > 0 && selectedIndexes.length === records.length;

  const toggleRecord = (index) => {
    setSelectedIndexes((current) =>
      current.includes(index)
        ? current.filter((selectedIndex) => selectedIndex !== index)
        : [...current, index],
    );
  };

  const toggleAllRecords = () => {
    setSelectedIndexes(allSelected ? [] : records.map((_, index) => index));
  };

  const deleteSelectedRecords = () => {
    if (selectedIndexes.length === 0) {
      return;
    }

    if (!window.confirm(`選択した${selectedIndexes.length}件の記録を削除しますか？`)) {
      return;
    }

    setRecords(records.filter((_, index) => !selectedIndexes.includes(index)));
    setSelectedIndexes([]);
  };

  return (
    <div className="container">
      <div className="screenTitle">3-2. クラブ別計測データ編集</div>

      <h1 className="title">クラブ別計測記録</h1>

      {records.length === 0 ? (
        <p>保存されているクラブ別計測記録はありません。</p>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: "680px", fontSize: "13px" }}>
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
                  <th>日時</th>
                  <th>Club</th>
                  <th>Dist</th>
                  <th>Dir</th>
                  <th>左右ずれ幅</th>
                  <th>ミスの種類</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={`${record.datetime}-${index}`}>
                    <td>
                      <input
                        aria-label={`${record.datetime}の記録を選択`}
                        checked={selectedIndexes.includes(index)}
                        onChange={() => toggleRecord(index)}
                        type="checkbox"
                      />
                    </td>
                    <td>{record.datetime}</td>
                    <td>{record.club === "DW" ? "DR" : record.club}</td>
                    <td>{record.distance}</td>
                    <td>{record.direction}</td>
                    <td>{record.miss}</td>
                    <td>{record.missType}</td>
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

export default ClubRecordsEdit;
