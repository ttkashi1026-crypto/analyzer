function Home({ setPage }) {
  return (
    <div className="container">
      <h2>0 トップ画面</h2>

      <h1 className="title">⛳ ゴルフ分析アプリ</h1>

      <button
        className="menuButton"
        onClick={() => setPage("club-menu")}
      >
        クラブ別計測
      </button>

      <button
        className="menuButton"
        onClick={() => setPage("round-menu")}
      >
        ラウンドモード記録
      </button>
    </div>
  );
}

export default Home;