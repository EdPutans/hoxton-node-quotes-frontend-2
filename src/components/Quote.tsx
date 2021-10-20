import React from 'react';
import { Reference } from "../api";
import "./index.css";

type Props = Reference & {
  handleClick?: () => void;
}

const Quote: React.FunctionComponent<Props> = ({ quote, handleClick }) => {
  return (
    <div className="quote-card" onClick={handleClick}>
        <p className="quote-text">{quote}</p>
    </div>
  );
};

export default Quote;
