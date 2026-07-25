import { useEffect, useState } from "react";

function RoundResult({ setPage }) {

  const [records, setRecords] = useState([]);


  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("roundRecords")
      ) || [];

    setRecords(saved);

  }, []);



  const totalScore = records.reduce(
    (sum, item) =>
      sum + item.score,
    0
  );


  const totalPutt = records.reduce(
    (sum, item) =>
      sum + item.putt,
    0
  );



  return (

    <div className="container">

      <h1 className="title">
        📊 ラウンド結果
      </h1>


      <div className="card">

        <h2>
          合計 {totalScore} 打
        </h2>

        <p>
          パット合計：{totalPutt} 回
        </p>

      </div>



      {
        records.length === 0 ? (

          <div className="card">
            記録がありません
          </div>

        ) : (

          records.map(
            (r,index)=>(

              <div
                className="card"
                key={index}
              >

                <h3>
                  {r.hole}番 PAR{r.par}
                 　 {r.score}打
                </h3>


                <p>
                  DW：
                  {r.dwCount}打
                  （ミス{r.dwMiss}）
                </p>


                <p>
                  FW/UT：
                  {r.fwCount}打
                  （ミス{r.fwMiss}）
                </p>


                <p>
                  アイアン：
                  {r.ironCount}打
                  （ミス{r.ironMiss}）
                </p>


                <p>
                  アプローチ：
                  {r.approachCount}打
                  （ミス{r.approachMiss}）
                </p>


                <p>
                  パット：
                  {r.putt}
                </p>


              </div>

            )
          )

        )
      }



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


export default RoundResult;