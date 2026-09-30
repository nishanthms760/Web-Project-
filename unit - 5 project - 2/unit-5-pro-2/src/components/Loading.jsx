function Loading({ message = 'Loading your diary...' }) {
  return (
    <div className="study-loading-state">
      <div className="loading-spinner-circle"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default Loading;
