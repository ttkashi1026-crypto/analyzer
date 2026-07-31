function ClubMenu({ setPage }) {
  return (
    <div className="container">
      <h2>1 クラブ別計測</h2>

      <h1 className="title">⛳ クラブ別計測</h1>

      <button
        className="menuButton"
        onClick={() => setPage("measure")}
      >
        計測
      </button>

      <button
        className="menuButton"
        onClick={() => setPage("club-result")}
      >
        結果参照
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

export default ClubMenu;
