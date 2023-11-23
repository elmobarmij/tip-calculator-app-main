import "./index.css";
import logo from "./images/logo.svg";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [percentage, setPercentage] = useState("");
  const [numPeople, setNumPeople] = useState(0);

  let tipAmount = percentage / numPeople;
  let totalAmount = (bill + percentage) / numPeople;

  function handleClick(e) {
    setPercentage(Number(e.target.value.slice(1)));
  }

  function handleReset() {
    setBill(0);
    setPercentage("");
    setNumPeople(0);
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="card">
        <Bill
          bill={bill}
          setBill={setBill}
          numPeople={numPeople}
          setNumPeople={setNumPeople}
          percentage={percentage}
          setPercentage={setPercentage}
          onSelectPercentage={handleClick}
          onReset={handleReset}
        />
        <Result
          bill={bill}
          tipAmount={tipAmount}
          totalAmount={totalAmount}
          numPeople={numPeople}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

function Bill({
  bill,
  setBill,
  numPeople,
  setNumPeople,
  onSelectPercentage,
  percentage,
  setPercentage,
}) {
  return (
    <div className="bill">
      <div className="bill-info separator">
        <label>Bill</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </div>
      <div className="tip-info separator">
        <label>Select Tip %</label>
        <div className="inputs" value={percentage}>
          <input type="text" value="$5" readOnly onClick={onSelectPercentage} />
          <input
            type="text"
            value="$10"
            readOnly
            onClick={onSelectPercentage}
          />
          <input
            type="text"
            value="$15"
            readOnly
            onClick={onSelectPercentage}
          />
          <input
            type="text"
            value="$25"
            readOnly
            onClick={onSelectPercentage}
          />
          <input
            type="text"
            value="$50"
            readOnly
            onClick={onSelectPercentage}
          />
          <input
            className="special"
            type="text"
            placeholder="Custom"
            onChange={(e) => {
              setPercentage(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="people-info separator">
        <span className="number">
          <label>Number of Peaple</label>
          <span
            className="message"
            style={numPeople === 0 ? { display: "block" } : { display: "none" }}
          >
            Can't be zero
          </span>
        </span>
        <input
          style={numPeople === 0 ? { outline: "2px solid #ff0000d9" } : {}}
          type="text"
          value={numPeople}
          onChange={(e) => {
            if (!bill || !percentage) return;
            setNumPeople(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

function Result({ tipAmount, totalAmount, numPeople, onReset }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="result">
      <div className="separator tip-result">
        <div className="parent">
          <label>Tip Amount</label>
          <span>/ person</span>
        </div>
        <input
          type="text"
          value={numPeople > 0 ? `${USDollar.format(tipAmount)}` : "$0.00"}
          readOnly
        />
      </div>

      <div className="total-result">
        <div className="parent">
          <label> Total</label>
          <span>/ person</span>
        </div>
        <input
          type="text"
          value={numPeople > 0 ? `${USDollar.format(totalAmount)}` : "$0.00"}
          readOnly
        />
      </div>

      <button onClick={onReset}>Reset</button>
    </div>
  );
}
