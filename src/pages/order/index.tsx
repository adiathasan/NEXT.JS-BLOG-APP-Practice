import { FormEvent, useState } from "react";
import _ from "lodash";
import styles from "./sortable.module.scss";
const sortable = () => {
  const [input, setInput] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const breakedInput: string[] = input.split(/\r|\n/);

    // cleanig the data

    let cleanedData: string[] = breakedInput.filter((inp) => inp !== "");

    const isInputLengthOk: boolean = cleanedData.length >= 5;
    const startPosFill: number = cleanedData.length + 1;
    const endPosFill: number = 5 - cleanedData.length;

    cleanedData = isInputLengthOk
      ? [...cleanedData]
      : [...cleanedData, ...Array(4).fill("", startPosFill, endPosFill)];

    // filling the cleaned data

    const addressPositioning = cleanedData.length - 2;

    setName(_.head(cleanedData) || "");
    setPhone(_.nth(cleanedData, 1) || "");
    setAddress(cleanedData.slice(2, addressPositioning).join(" ") || "");
    setAmount(_.nth(cleanedData, -2) || "");
    setMessage(_.nth(cleanedData, -1) || "");
  };

  const handleUp = (e) => {
    e.preventDefault();

    // location finding

    const currentInput: HTMLInputElement =
      e.target.parentElement.parentElement.firstChild;

    const upperInput: HTMLInputElement =
      e.target.parentElement.parentElement.previousSibling.firstChild;

    // swipe logic

    switch (upperInput.id) {
      case "name":
        setName(currentInput.value);
        setPhone(upperInput.value);
        break;

      case "phone":
        setPhone(currentInput.value);
        setAddress(upperInput.value);
        break;

      case "address":
        setAddress(currentInput.value);
        setAmount(upperInput.value);
        break;

      case "amount":
        setAmount(currentInput.value);
        setMessage(upperInput.value);
        break;

      default:
        break;
    }
  };

  const handleDown = (e) => {
    e.preventDefault();

    // location finding

    const currentInput: HTMLInputElement =
      e.target.parentElement.parentElement.firstChild;

    const lowerInput: HTMLInputElement =
      e.target.parentElement.parentElement.nextSibling.firstChild;

    // swipe logic

    switch (lowerInput.id) {
      case "phone":
        setPhone(currentInput.value);
        setName(lowerInput.value);
        break;

      case "address":
        setAddress(currentInput.value);
        setPhone(lowerInput.value);
        break;

      case "amount":
        setAmount(currentInput.value);
        setAddress(lowerInput.value);
        break;

      case "message":
        setMessage(currentInput.value);
        setAmount(lowerInput.value);
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          id="mian"
          value={input}
          onChange={(e) => setInput(e.target.value)}></textarea>
        <button type="submit">Auto Fill</button>
      </form>
      <form>
        <div>
          <input
            type="text"
            value={name}
            placeholder="name here"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={phone}
            placeholder="phone here"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={address}
            placeholder="address here"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={amount}
            placeholder="amount here"
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>Down</button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={message}
            placeholder="message here"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="swipe">
            <button onClick={handleUp}>up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default sortable;
