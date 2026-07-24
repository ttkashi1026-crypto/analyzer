function ErrorPage({ setPage }) {
  return (
    <div className="container">
      <h2>9 エラー</h2>

      <h1 className="title">⚠️ エラー</h1>

      <p>この機能はまだ作成中です。</p>

      <button
        className="backButton"
        onClick={() => setPage("home")}
      >
        トップへ戻る
      </button>
    </div>
  );
}

export default ErrorPage;