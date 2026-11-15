function RoundMenu({ setPage, onStartRound }) {
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
