function MaintenanceMenu({ setPage }) {
  return (
    <div className="container">
      <div className="screenTitle">3. メンテナンス</div>

      <h1 className="title">メンテナンス</h1>

      <button
        className="menuButton"
        onClick={() => setPage("round-records-edit")}
      >
        ラウンド記録データ編集
      </button>

      <button
        className="menuButton"
        onClick={() => setPage("club-records-edit")}
      >
        クラブ別計測データ編集
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

export default MaintenanceMenu;
