import { useState } from "react";

function RoundMeasure({ setPage }) {
  const [hole, setHole] = useState(1);
  const [par, setPar] = useState(4);

  const [dwCount, setDwCount] = useState(0);
  const [dwMiss, setDwMiss] = useState(0);

  const [fwCount, setFwCount] = useState(0);
  const [fwMiss, setFwMiss] = useState(0);

  const [ironCount, setIronCount] = useState(0);
  const [ironMiss, setIronMiss] = useState(0);

  const [approachCount, setApproachCount] = useState(0);
  const [approachMiss, setApproachMiss] = useState(0);

  const [putt, setPutt] = useState(2);

  const add = (value, setter) => setter(value + 1);

  const sub = (value, setter, min = 0) => {
    if (value > min) setter(value - 1);
  };

  const saveRecord = () => {
    const score =
      dwCount +
      fwCount +
      ironCount +
      approachCount +
      putt;

    const record = {
      hole,
      par,
      score,
      dwCount,
      dwMiss,
      fwCount,
      fwMiss,
      ironCount,
      ironMiss,
      approachCount,
      approachMiss,
      putt,
    };

    const saved =
      JSON.parse(localStorage.getItem("roundRecords")) || [];

    saved.push(record);

    localStorage.setItem(
      "roundRecords",
      JSON.stringify(saved)
    );

    alert("記録しました");
  };

  const Counter = ({
    title,
    count,
    setCount,
    miss,
    setMiss,
  }) => (
    <div className="card">
      <h3>{title}</h3>

      <div className="counterRow">
        <span>打数</span>

        <button
          onClick={() => sub(count, setCount)}
        >
          −
        </button>

        <span>{count}</span>

        <button
          onClick={() => add(count, setCount)}
        >
          ＋
        </button>
      </div>

      <div className="counterRow">
        <span>ミス</span>

        <button
          onClick={() => sub(miss, setMiss)}
        >
          −
        </button>

        <span>{miss}</span>

        <button
          onClick={() => add(miss, setMiss)}
        >
          ＋
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">
        🏌️ ラウンド計測
      </h1>

      <div className="card">
        <div className="counterRow">
          <span>Hole</span>

          <button
            onClick={() =>
              sub(hole, setHole, 1)
            }
          >
            −
          </button>

          <span>{hole}</span>

          <button
            onClick={() =>
              hole < 18 &&
              setHole(hole + 1)
            }
          >
            ＋
          </button>
        </div>

        <div className="counterRow">
          <span>PAR</span>

          <button
            onClick={() =>
              sub(par, setPar, 3)
            }
          >
            −
          </button>

          <span>{par}</span>

          <button
            onClick={() =>
              par < 5 &&
              setPar(par + 1)
            }
          >
            ＋
          </button>
        </div>
      </div>

      <Counter
        title="DW"
        count={dwCount}
        setCount={setDwCount}
        miss={dwMiss}
        setMiss={setDwMiss}
      />

      <Counter
        title="FW / UT"
        count={fwCount}
        setCount={setFwCount}
        miss={fwMiss}
        setMiss={setFwMiss}
      />
            <Counter
        title="アイアン"
        count={ironCount}
        setCount={setIronCount}
        miss={ironMiss}
        setMiss={setIronMiss}
      />

      <Counter
        title="アプローチ"
        count={approachCount}
        setCount={setApproachCount}
        miss={approachMiss}
        setMiss={setApproachMiss}
      />

      <div className="card">
        <h3>パット</h3>

        <div className="counterRow">
          <button
            onClick={() =>
              sub(putt, setPutt)
            }
          >
            −
          </button>

          <span>{putt}</span>

          <button
            onClick={() =>
              add(putt, setPutt)
            }
          >
            ＋
          </button>
        </div>
      </div>


      <div className="card">
        <h3>
          Score
        </h3>

        <h2>
          {
            dwCount +
            fwCount +
            ironCount +
            approachCount +
            putt
          }
          打
        </h2>
      </div>


      <button
        className="menuButton"
        onClick={saveRecord}
      >
        記録する
      </button>


      <button
        className="backButton"
        onClick={() =>
          setPage("round-menu")
        }
      >
        戻る
      </button>

    </div>
  );
}

export default RoundMeasure;