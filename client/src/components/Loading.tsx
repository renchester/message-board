type LoadingProps = {
  message: string;
};

function Loading(props: LoadingProps) {
  const { message } = props;

  return (
    <div
      role="progressbar"
      aria-label="Loading spinner"
      aria-busy
      className="spinner"
    >
      <div className="spinner__wrapper">
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
        <div className="spinner__div" aria-hidden></div>
      </div>
      {message && <span className="spinner__message">{message}</span>}
    </div>
  );
}

export default Loading;
