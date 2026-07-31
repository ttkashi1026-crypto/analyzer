function RoundRecordsEdit({ roundRecords, setRoundRecords, setPage }) {
  const deleteRecord = (targetIndex) => {
    if (!window.confirm("この記録を削除しますか？")) {
      return;
    }

    setRoundRecords(
      roundRecords.filter((_, index) => index !== targetIndex),
    );
  };

  return (
    <div className="container">
      <div className="screenTitle">3-1. ラウンド記録データ編集</div>

      <h1 className="title">ラウンド記録</h1>

      {roundRecords.length === 0 ? (
        <p>保存されているラウンド記録はありません。</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ minWidth: "780px", fontSize: "13px" }}>
            <thead>
              <tr>
                <th>日付</th>
                <th>H</th>
                <th>PAR</th>
                <th>SC</th>
                <th>DW</th>
                <th>FW</th>
                <th>IR</th>
                <th>AP</th>
                <th>PT</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>
              {roundRecords.map((record, index) => (
                <tr key={`${record.recordedOn || "legacy"}-${record.hole}-${index}`}>
                  <td>{record.recordedOn || "保存前"}</td>
                  <td>{record.hole}</td>
                  <td>{record.par}</td>
                  <td>{record.score}</td>
                  <td>{record.dwShot}</td>
                  <td>{record.fwShot}</td>
                  <td>{record.ironShot}</td>
                  <td>{record.approachShot}</td>
                  <td>{record.putt}</td>
                  <td>
                    <button
                      aria-label={`${record.hole}番ホールの記録を削除`}
                      onClick={() => deleteRecord(index)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
