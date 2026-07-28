function RoundResult({ roundRecords, setPage }) {
  return (
    <div className="container">
      <div className="screenTitle">
        2-2. ラウンド結果
      </div>

      <h1 className="title">📊 ラウンド結果</h1>

      {roundRecords.length === 0 ? (
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
            {roundRecords.map((r, index) => {
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