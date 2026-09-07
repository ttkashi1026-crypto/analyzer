import { useState } from "react";
import { exportRecordsToExcel } from "../utils/excelExport";

function MaintenanceMenu({ records, roundRecords, setPage }) {
  const [exportMessage, setExportMessage] = useState("");

  const exportToExcel = async () => {
    setExportMessage("");

    try {
      const result = await exportRecordsToExcel(records, roundRecords);
      setExportMessage(
        result === "saved"
          ? "Excelファイルを保存しました。"
          : "Excelファイルをダウンロードしました。ダウンロード先からOneDriveへ移動してください。",
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        setExportMessage("Excelファイルの出力に失敗しました。もう一度お試しください。");
      }
    }
  };

  return (
    <div className="container">
      <div className="screenTitle">3. メンテナンス</div>

      <h1 className="title">メンテナンス</h1>

      <button
        className="menuButton"
        onClick={() => setPage("club-records-edit")}
      >
        クラブ別計測データ編集
      </button>

      <button
        className="menuButton"
        onClick={() => setPage("round-records-edit")}
      >
        ラウンド記録データ編集
      </button>

      <button
        className="menuButton"
        disabled={records.length === 0 && roundRecords.length === 0}
        onClick={exportToExcel}
      >
        Excel出力
      </button>

      <p className="exportHint">
        保存先の選択画面でOneDriveを選ぶと、クラブ計測・ラウンド記録を別シートで保存できます。
      </p>
      {exportMessage && <p className="exportMessage" role="status">{exportMessage}</p>}

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
