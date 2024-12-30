const TabButton = ({ title, index, isActive, setIsActive }) => {
  return (
    <button
      onClick={setIsActive}
      className={`tab-button${isActive ? " tab-button-active" : ""}`}
    >
      {title}
    </button>
  );
};

export default TabButton;
