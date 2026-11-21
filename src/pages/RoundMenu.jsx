function RoundMenu({ setPage, onStartRound, roundDrafts = [], roundRecords = [], onResumeRound }) {
  return (
    <div className="container">
      <div className="screenTitle">
        2. ラウンドモード
      </div>

      <h1 className="title">🏌️ ラウンドモード</h1>

      <button
        className="menuButton"
        onClick={onStartRound}
      >
        新しいラウンドを記録
      </button>

      {roundDrafts.length > 0 && (
        <section className="unfinishedRounds" aria-label="途中のラウンド">
          <h2>途中のラウンド</h2>
          {roundDrafts
            .slice()
            .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
            .map((draft) => {
              const savedHoleCount = new Set(
                roundRecords
                  .filter((record) => record.roundId === draft.roundId)
                  .map((record) => record.hole),
              ).size;
              const recordedDate = draft.recordedOn?.replaceAll("-", "/") || "日付不明";

              return (
                <article className="unfinishedRoundCard" key={draft.roundId}>
                  <div>
                    <strong>{recordedDate}</strong>
                    <span>
                      {savedHoleCount}ホール記録済み・{draft.hole}Hを入力中
                    </span>
                  </div>
                  <button
                    className="roundEditButton"
                    onClick={() => onResumeRound?.(draft)}
                  >
                    続きから再開
                  </button>
                </article>
              );
            })}
        </section>
      )}

      <button
        className="menuButton"
        onClick={() => setPage("round-result")}
      >
        ラウンド結果
      </button>

      <button
        className="backButton"
        onClick={() => setPage("home")}
      >
        戻る
      </button>
    </div>
  );
}

export default RoundMenu;
