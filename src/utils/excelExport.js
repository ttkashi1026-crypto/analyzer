const getFileDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const createSheet = (XLSX, headers, rows, columnWidths) => {
  const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  sheet["!cols"] = columnWidths.map((width) => ({ wch: width }));
  sheet["!autofilter"] = {
    ref: XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: Math.max(rows.length, 1), c: headers.length - 1 },
    }),
  };
  return sheet;
};

const createWorkbook = (XLSX, records, roundRecords) => {
  const workbook = XLSX.utils.book_new();

  const clubSheet = createSheet(
    XLSX,
    ["記録日", "日時", "クラブ", "飛距離", "方向", "左右ずれ幅", "ミスの種類"],
    records.map((record) => [
      record.recordedOn ?? "",
      record.datetime ?? "",
      record.club === "DW" ? "DR" : (record.club ?? ""),
      record.distance ?? "",
      record.direction ?? "",
      record.miss ?? "",
      record.missType === "ネックシャンク" ? "シャンク" : (record.missType ?? ""),
    ]),
    [12, 16, 10, 10, 10, 14, 16],
  );
  XLSX.utils.book_append_sheet(workbook, clubSheet, "クラブ計測");

  const roundSheet = createSheet(
    XLSX,
    [
      "記録日",
      "ホール",
      "パー",
      "スコア",
      "DR打数",
      "DRミス",
      "DRペナルティ",
      "FW打数",
      "FWミス",
      "FWペナルティ",
      "UT打数",
      "UTミス",
      "UTペナルティ",
      "アイアン打数",
      "アイアンミス",
      "アイアンペナルティ",
      "アプローチ打数",
      "アプローチミス",
      "アプローチペナルティ",
      "パット数",
    ],
    roundRecords.map((record) => [
      record.recordedOn ?? "",
      record.hole ?? "",
      record.par ?? "",
      record.score ?? "",
      record.dwShot ?? "",
      record.dwMiss ?? "",
      record.dwPenalty ?? "",
      record.fwShot ?? "",
      record.fwMiss ?? "",
      record.fwPenalty ?? "",
      record.utShot ?? "",
      record.utMiss ?? "",
      record.utPenalty ?? "",
      record.ironShot ?? "",
      record.ironMiss ?? "",
      record.ironPenalty ?? "",
      record.approachShot ?? "",
      record.approachMiss ?? "",
      record.approachPenalty ?? "",
      record.putt ?? "",
    ]),
    [12, 8, 8, 10, 10, 10, 14, 10, 10, 14, 10, 10, 14, 14, 14, 18, 16, 16, 20, 10],
  );
  XLSX.utils.book_append_sheet(workbook, roundSheet, "ラウンド記録");

  return workbook;
};

export const exportRecordsToExcel = async (records, roundRecords) => {
  const XLSX = await import("xlsx");
  const workbook = createWorkbook(XLSX, records, roundRecords);
  const fileName = `golf-practice_${getFileDate()}.xlsx`;
  const workbookData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([workbookData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if ("showSaveFilePicker" in window) {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: "Excel ファイル",
          accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          },
        },
      ],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(file);
    await writable.close();
    return "saved";
  }

  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return "downloaded";
};
