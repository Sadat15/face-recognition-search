function Rank({ currentUser }) {
  if (currentUser) {
    const message = `Welcome ${currentUser.name}. Your current rank is...
    ${currentUser.info.entries}`;
    return (
      <div>
        <div className="white f3 center">{message}</div>
        <div className="white f1 center"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="white f3 center">Enter any image!</div>
    </div>
  );
}

export default Rank;
