import { useState } from "react";

const getDateKey = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
};

function RoundMeasure({
  roundRecords,
  setRoundRecords,
  setPage,
  editingIndex = null,
  onFinishEditing,
}) {
  const editingRecord =
    editingIndex === null ? null : roundRecords[editingIndex];
  const initialValue = (key, fallback = 0) =>
    Number(editingRecord?.[key] ?? fallback);

  const [hole, setHole] = useState(() => initialValue("hole", 1));
  const [par, setPar] = useState(() => initialValue("par", 4));

  const [dwShot, setDwShot] = useState(() => initialValue("dwShot"));
  const [dwMiss, setDwMiss] = useState(() => initialValue("dwMiss"));
  const [dwPenalty, setDwPenalty] = useState(() => initialValue("dwPenalty"));

  const [fwShot, setFwShot] = useState(() => initialValue("fwShot"));
  const [fwMiss, setFwMiss] = useState(() => initialValue("fwMiss"));
  const [fwPenalty, setFwPenalty] = useState(() => initialValue("fwPenalty"));

  const [ironShot, setIronShot] = useState(() => initialValue("ironShot"));
  const [ironMiss, setIronMiss] = useState(() => initialValue("ironMiss"));
  const [ironPenalty, setIronPenalty] = useState(() => initialValue("ironPenalty"));

  const [approachShot, setApproachShot] = useState(() => initialValue("approachShot"));
  const [approachMiss, setApproachMiss] = useState(() => initialValue("approachMiss"));
  const [approachPenalty, setApproachPenalty] = useState(() => initialValue("approachPenalty"));

  const [putt, setPutt] = useState(() => initialValue("putt"));

  const score =
    dwShot +
    fwShot +
    ironShot +
    approachShot +
    putt +
    dwPenalty +
    fwPenalty +
    ironPenalty +
    approachPenalty;

  const Counter = ({ label, value, setValue }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {label}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() =>
            setValue(Math.max(0, value - 1))
          }
          style={{
            width: "48px",
            height: "48px",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          −
        </button>

        <div
          style={{
            width: "56px",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          {value}
        </div>

        <button
          onClick={() => setValue(value + 1)}
          style={{
            width: "48px",
            height: "48px",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          ＋
        </button>
      </div>
    </div>
  );

  return (
    <div className="container roundMeasure">
      <div className="screenTitle">
        {editingRecord ? "2-1. ラウンド記録修正" : "2-1. ラウンド記録"}
      </div>

      <h1 className="title">
        {editingRecord ? `✏️ ${hole}Hの記録修正` : "🏌️ ラウンド記録"}
      </h1>

      <div className="card">
        <Counter
          label="Hole"
          value={hole}
          setValue={(v) =>
            setHole(Math.min(18, Math.max(1, v)))
          }
        />

        <Counter
          label="PAR"
          value={par}
          setValue={(v) =>
            setPar(Math.min(5, Math.max(3, v)))
          }
        />
      </div>

      <div className="card">
        <h3>🏌️ DW</h3>

        <Counter
          label="打数"
          value={dwShot}
          setValue={setDwShot}
        />

        <Counter
          label="ミス"
          value={dwMiss}
          setValue={setDwMiss}
        />

        <Counter
          label="ペナルティ"
          value={dwPenalty}
          setValue={setDwPenalty}
        />
      </div>

      <div className="card">
        <h3>🏌️ FW / UT</h3>

        <Counter
          label="打数"
          value={fwShot}
          setValue={setFwShot}
        />

        <Counter
          label="ミス"
          value={fwMiss}
          setValue={setFwMiss}
        />

        <Counter
          label="ペナルティ"
          value={fwPenalty}
          setValue={setFwPenalty}
        />
      </div>
            <div className="card">
        <h3>🏌️ アイアン</h3>

        <Counter
          label="打数"
          value={ironShot}
          setValue={setIronShot}
        />

        <Counter
          label="ミス"
          value={ironMiss}
          setValue={setIronMiss}
        />

        <Counter
          label="ペナルティ"
          value={ironPenalty}
          setValue={setIronPenalty}
        />
      </div>

      <div className="card">
        <h3>🏌️ アプローチ</h3>

        <Counter
          label="打数"
          value={approachShot}
          setValue={setApproachShot}
        />

        <Counter
          label="ミス"
          value={approachMiss}
          setValue={setApproachMiss}
        />

        <Counter
          label="ペナルティ"
          value={approachPenalty}
          setValue={setApproachPenalty}
        />
      </div>

      <div className="card">
        <h3>⛳ パット</h3>

        <Counter
          label="打数"
          value={putt}
          setValue={setPutt}
        />
      </div>

      <div
        className="card"
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            color: "#666",
          }}
        >
          現在スコア
        </div>

        <div
          style={{
            fontSize: "46px",
            fontWeight: "bold",
            color: "#2e7d32",
            marginTop: "8px",
          }}
        >
          {score}
        </div>
      </div>

      <button
        className="menuButton"
        onClick={() => {
          const record = {
            recordedOn: editingRecord?.recordedOn || getDateKey(),
            hole,
            par,
            score,
            dwShot,
            dwMiss,
            dwPenalty,
            fwShot,
            fwMiss,
            fwPenalty,
            ironShot,
            ironMiss,
            ironPenalty,
            approachShot,
            approachMiss,
            approachPenalty,
            putt,
          };

          if (editingRecord) {
            setRoundRecords(
              roundRecords.map((current, index) =>
                index === editingIndex ? record : current,
              ),
            );
            onFinishEditing?.();
            setPage("round-result");
            return;
          }

          setRoundRecords([...roundRecords, record]);

          if (hole >= 18) {
            setPage("round-result");
            return;
          }

          setHole(hole + 1);

          setPar(4);

          setDwShot(0);
          setDwMiss(0);
          setDwPenalty(0);

          setFwShot(0);
          setFwMiss(0);
          setFwPenalty(0);

          setIronShot(0);
          setIronMiss(0);
          setIronPenalty(0);

          setApproachShot(0);
          setApproachMiss(0);
          setApproachPenalty(0);

          setPutt(0);
        }}
      >
        {editingRecord ? "変更を保存" : "記録する"}
      </button>

      <button
        className="backButton"
        onClick={() => {
          if (editingRecord) {
            onFinishEditing?.();
            setPage("round-result");
            return;
          }
          setPage("round-menu");
        }}
      >
        {editingRecord ? "キャンセル" : "戻る"}
      </button>
    </div>
  );
}

export default RoundMeasure;
