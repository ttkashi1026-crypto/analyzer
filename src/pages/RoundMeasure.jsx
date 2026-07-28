import { useState } from "react";

function RoundMeasure({
  roundRecords,
  setRoundRecords,
  setPage,
}) {
  const [hole, setHole] = useState(1);
  const [par, setPar] = useState(4);

  const [dwShot, setDwShot] = useState(0);
  const [dwMiss, setDwMiss] = useState(0);
  const [dwPenalty, setDwPenalty] = useState(0);

  const [fwShot, setFwShot] = useState(0);
  const [fwMiss, setFwMiss] = useState(0);
  const [fwPenalty, setFwPenalty] = useState(0);

  const [ironShot, setIronShot] = useState(0);
  const [ironMiss, setIronMiss] = useState(0);
  const [ironPenalty, setIronPenalty] = useState(0);

  const [approachShot, setApproachShot] = useState(0);
  const [approachMiss, setApproachMiss] = useState(0);
  const [approachPenalty, setApproachPenalty] = useState(0);

  const [putt, setPutt] = useState(0);

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
        marginBottom: "8px",
      }}
    >
      <span>{label}</span>

      <div>
        <button
          onClick={() =>
            setValue(Math.max(0, value - 1))
          }
        >
          −
        </button>

        <span
          style={{
            display: "inline-block",
            width: "35px",
            textAlign: "center",
          }}
        >
          {value}
        </span>

        <button
          onClick={() => setValue(value + 1)}
        >
          ＋
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">

      <div className="screenTitle">
        2-1. ラウンド記録
      </div>

      <h1 className="title">
        🏌️ ラウンド記録
      </h1>
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

      <hr />

      <h3>DW</h3>

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

      <hr />

      <h3>FW / UT</h3>

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

      <hr />
            <h3>アイアン</h3>

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

      <hr />

      <h3>アプローチ</h3>

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

      <hr />

      <h3>パット</h3>

      <Counter
        label="打数"
        value={putt}
        setValue={setPutt}
      />

      <hr />

      <h2
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        スコア　{score}
      </h2>
            <br />

      <button
        className="menuButton"
        onClick={() => {
          const record = {
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

          setRoundRecords([
            ...roundRecords,
            record,
          ]);

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
        記録する
      </button>

      <br />
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

export default RoundMeasure;