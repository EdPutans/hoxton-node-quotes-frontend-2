import React from 'react';
import useFetchQuote from "../api";
import "./index.css";

export type Props = { id: number, handleClose: () => void };

const QuoteModal: React.FunctionComponent<Props> = ({ id, handleClose }) => {
  const { state } = useFetchQuote('single', { id });

  if(!state ) return null;

  const { person, quote } = state;

  return (
    <div className='quote-modal' onClick={handleClose}>
      <div className="quote-modal-content">
        <img alt='quotee' className="quote-photo" src={person.image_url} />
        <div>
          <p className="quote-text">{quote}</p>
          <p className="quote-person"> -{person.first_name} <b>{person.last_name}</b>, {person.age}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
