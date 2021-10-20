import useFetchQuote from "../api";
import Quote from "../components/Quote";
import QuoteModal from "../components/QuoteModal";
import React from 'react'


const QuotePage: React.FunctionComponent<{ type: 'random' | 'all' }> = ({ type }) => {
  const { state, fetchState } = useFetchQuote(type);
  const [openQuote, setOpenQuote] = React.useState<null | number>(null);

  const handleCloseQuote = React.useCallback(() => setOpenQuote(null), [setOpenQuote])
  const getHandleOpenQuote = React.useCallback((quote) => () => setOpenQuote(quote.id), [setOpenQuote])

  const RenderQuote = React.useCallback((quote) => 
    <Quote key={quote.id} {...quote} handleClick={getHandleOpenQuote(quote)} />,
  [getHandleOpenQuote])

  if(!state) return null;

  return (
    <>
      {Array.isArray(state) ? state.map(RenderQuote) : RenderQuote(state)}
      {openQuote ? <QuoteModal handleClose={handleCloseQuote} id={openQuote} /> : null}
      {type ==='random' &&
        <button onClick={fetchState} className="refetch-button">
          Get another quote!
        </button>
      }
    </>
  );
};

export default QuotePage;
