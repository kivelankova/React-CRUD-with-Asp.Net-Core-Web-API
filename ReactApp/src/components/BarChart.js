import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

// import Select from 'react-select';
import Moment from './Moment';
import ShearForce from './ShearForce';
import ArrayBarResults from './ArrayBarResults ';
import ReactImagePicker from './ReactImagePicker';

import '../chart.css';
// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

const BarChart = () => {

  const [name, setName] = useState(""); // palkin nimi
  const [length, setLength] = useState(""); // palkin pituus L
  const [lengthA, setLengthA] = useState(""); // palkin pituus a
  const [lengthB, setLengthB] = useState(""); // palkin pituus b
  const [pointForce, setPointForce] = useState(""); // pistekuorma P
  const [load, setLoad] = useState(""); // tasainen kuorma q
  const [pointMoment, setPointMoment] = useState(""); // pistemomentti M
  let [momentti, setMomentti] = useState([]);
  let [leikkausvoima, setLeikkausvoima] = useState([]);
  const [forceType, setForceType] = useState("");
  const [maxMoment, setMaxMoment] = useState("");
  const [maxShearForce, setMaxShearForce] = useState("");
  // Kuormatyypin valinta kuvien perusteella. Haetaan kuvan numero, joka yhdistetään tässä filussa oikeaan kuormayhdistelmään
  const [forceTypeNumber, setForceTypeNumber] = useState("");

  // tähän rakennetaan data-muuttuja, joka viedään muistiin
  // alustetan arvoksi 0, jotta jokaisessa on koko ajan jokin arvo
  const [formData, setFormData] = useState({
    "nimi": "",
    "pituusL": "0",
    "pituusA": "0",
    "pituusB": "0",
    "kuormaTV": "0",
    "kuormaPK": "0",
    "kuormaPM": "0",
    "tyyppi": "",
    "maxM": "0",
    "maxV": "0"
  });

  const [force, setForce] = useState(""); // poista

  const options = [
    { label: 'Valitse kuormatyyppi', value: "" },
    { label: 'Tasainen viivakuorma', value: "TV" },
    { label: 'Pistekuorma', value: "P" }
  ];

  let pituus = 0;
  if (length != "") {
    pituus = Number(length)
  } else if (length == "") {
    pituus = Number(lengthA) + Number(lengthB);
  }


  const handleMomentChange = (newMoment) => {
    console.log("newMoment (handleMomentChange):", newMoment);
    setMomentti(newMoment);
  }

  const handleMaxMomentChange = (newMoment) => {
    console.log("newMoment (handleMaxMomentChange):", newMoment);
    setMaxMoment(newMoment);
  }

  const handleShearForceChange = (newShearForce) => {
    console.log("newShearForce (handleShearForceChange):", newShearForce);
    setLeikkausvoima(newShearForce);
  }

  const handleMaxShearForceChange = (newShearForce) => {
    console.log("newShearForce (handleMaxShearForceChange):", newShearForce);
    setMaxShearForce(newShearForce);
  }

  const handleForceTypeChange = (newForceType) => {
    console.log("newForceType.value (handleForceTypeChange):", newForceType.value);
    setForceTypeNumber(newForceType.value);
    if (newForceType.value == 0) {
      setFormData({ ...formData, tyyppi: "TV" });
      setForceType("TV");
      setPointForce("");
      setPointMoment("");
    } else if (newForceType.value == 1) {
      setFormData({ ...formData, tyyppi: "PK" });
      setForceType("PK");
      setLoad("");
      setPointMoment("");
    } else if (newForceType.value == 2) {
      setFormData({ ...formData, tyyppi: "PM" });
      setForceType("PM");
      setPointForce("");
      setLoad("");
    }


  }

  // Lisätään pituustiedot state-muuttujaan
  const onChangedLength1 = (event) => {
    setLength(event.target.value);
    setLengthA("");
    setLengthB("");
  }

  const onChangedLength2 = (event) => {
    setLengthA(event.target.value);
    setLength("");
  }

  const onChangedLength3 = (event) => {
    setLengthB(event.target.value);
  }

  /*
  const handleChange = (e) => {
    console.log("Kuormatyyppi valittu");
    setForceType(e.target.value);
  }
  */


  return (
    <div>
      {
        /*
            <div className="split left">
            <div className="centered">
        */
      }

      <h2>1-aukkoisen palkin voimasuureiden laskenta</h2>

      Palkin nimi [m]:
      <input type="text"
        placeholder='Nimi...'
        onChange={(e) => {
          setFormData({ ...formData, nimi: e.target.value });
        }}
      />
      <br />
      Kuormatyyppi:
      <select value={forceType} onChange={(e) => {
        setFormData({ ...formData, tyyppi: e.target.value });
        setForceType(e.target.value);
      }}>
        <option value={0} key={0}>--Valinta--</option>
        <option value={"TV"} key={1}>Tasainen viivakuorma</option>
        <option value={"PK"} key={2}>Pistekuorma</option>
        <option value={"PM"} key={3}>Pistemomentti</option>
      </select>
      <ReactImagePicker
        imageChange={handleForceTypeChange}
      />

      {
        forceType == "TV" ?
          <div>
            <label>
              Palkin pituus L [m]:
              <input type="text"
                placeholder='Pituus...'
                onChange={(e) => {
                  setFormData({ ...formData, pituusL: e.target.value });
                  setLength(e.target.value);
                }} />
            </label>
            <br />
            <label>
              Tasainen kuorma q [kN/m]:
              <input type="text"
                placeholder='Kuorma...'
                onChange={(e) => {
                  setFormData({ ...formData, kuormaTV: e.target.value });
                  setLoad(e.target.value);
                }} />
            </label>
          </div> :
          null
      }

      {
        forceType == "PK" ?
          <div>
            <label>
              Palkin osapituus a [m]:
              <input type="text"
                placeholder='Pituus...'
                onChange={(e) => {
                  setFormData({ ...formData, pituusA: e.target.value });
                  setLengthA(e.target.value);
                }} />
            </label>
            <br />
            <label>
              Palkin osapituus b [m]:
              <input type="text"
                placeholder='Pituus...'
                onChange={(e) => {
                  setFormData({ ...formData, pituusB: e.target.value });
                  setLengthB(e.target.value);
                }} />
            </label>
            <br />
            <label>
              Pistekuorma P [kN]:
              <input type="text"
                placeholder='Kuorma...'
                onChange={(e) => {
                  setFormData({ ...formData, kuormaPK: e.target.value });
                  setPointForce(e.target.value);
                }} />
            </label>
          </div> :
          null
      }

      {
        forceType == "PM" ?
          <div>
            <label>
              Palkin osapituus a [m]:
              <input type="text"
                placeholder='Pituus...'
                onChange={(e) => {
                  setFormData({ ...formData, pituusA: e.target.value });
                  setLengthA(e.target.value);
                }} />
            </label>
            <br />
            <label>
              Palkin osapituus b [m]:
              <input type="text"
                placeholder='Pituus...'
                onChange={(e) => {
                  setFormData({ ...formData, pituusB: e.target.value });
                  setLengthB(e.target.value);
                }} />
            </label>
            <br />
            <label>
              Pistemomentti M [kNm]:
              <input type="text"
                placeholder='Kuorma...'
                onChange={(e) => {
                  setFormData({ ...formData, kuormaPM: e.target.value });
                  setPointMoment(e.target.value);
                }} />
            </label>
          </div> :
          null
      }

      <Moment
        length={length}
        lengthA={lengthA}
        lengthB={lengthB}
        load={load}
        pointForce={pointForce}
        pointMoment={pointMoment}
        momentChange={handleMomentChange}
        maxMomentChange={handleMaxMomentChange}
        forceType={forceType}
        formData={formData}
        setFormData={setFormData}
      />

      <ShearForce
        length={length}
        lengthA={lengthA}
        lengthB={lengthB}
        load={load}
        pointForce={pointForce}
        pointMoment={pointMoment}
        shearChange={handleShearForceChange}
        maxShearChange={handleMaxShearForceChange}
        forceType={forceType}
        formData={formData}
        setFormData={setFormData}
      />

      <ArrayBarResults
        name={name}
        length={length}
        lengthA={lengthA}
        lengthB={lengthB}

        force={force}

        load={load}
        pointForce={pointForce}
        pointMoment={pointMoment}
        forceType={forceType}
        maxMoment={maxMoment}
        maxShearForce={maxShearForce}
        setName={setName}
        setLength={setLength}
        setForce={setForce}

        setLoad={setLoad}
        setPointForce={setPointForce}
        setPointMoment={setPointMoment}

        setForceType={setForceType}
        setMaxMoment={setMaxMoment}
        setMaxShearForce={setMaxShearForce}
        formData={formData}
        setFormData={setFormData}
      />
      {
        /*
                 </div>
                  </div>
                  <div className="split right">
                  <div className="centered">
            */
      }

      <div className="chartBox">
        <h2>Käyrät</h2>

        <Line
          data={{
            labels: [0,
              pituus / 20,
              2 * pituus / 20,
              3 * pituus / 20,
              4 * pituus / 20,
              5 * pituus / 20,
              6 * pituus / 20,
              7 * pituus / 20,
              8 * pituus / 20,
              9 * pituus / 20,
              10 * pituus / 20,
              11 * pituus / 20,
              12 * pituus / 20,
              13 * pituus / 20,
              14 * pituus / 20,
              15 * pituus / 20,
              16 * pituus / 20,
              17 * pituus / 20,
              18 * pituus / 20,
              19 * pituus / 20,
              pituus],
            datasets: [
              {
                label: 'Taivutusmomentti',
                data: momentti,
                backgroundColor: '#ffe5e5',
                borderColor: 'red',
                borderWidth: 1,
              },
            ],
          }
          }
          height={50}
          width={300}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },

          }}
        />

        <Line
          data={{
            labels: [0,
              pituus / 20,
              2 * pituus / 20,
              3 * pituus / 20,
              4 * pituus / 20,
              5 * pituus / 20,
              6 * pituus / 20,
              7 * pituus / 20,
              8 * pituus / 20,
              9 * pituus / 20,
              10 * pituus / 20,
              11 * pituus / 20,
              12 * pituus / 20,
              13 * pituus / 20,
              14 * pituus / 20,
              15 * pituus / 20,
              16 * pituus / 20,
              17 * pituus / 20,
              18 * pituus / 20,
              19 * pituus / 20,
              pituus],
            datasets: [
              {
                label: 'Leikkausvoima',
                data: leikkausvoima,
                backgroundColor: '#cce5ff',
                borderColor: 'blue',
                borderWidth: 1,
              },
            ],
          }
          }
          height={50}
          width={300}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },

          }}
        />
      </div>
    </div>


  )
}

export default BarChart
