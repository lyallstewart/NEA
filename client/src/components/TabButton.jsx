const TabButton = ({ title, icon, index, isActive, setIsActive }) => {
  return (
    <button
      onClick={setIsActive}
      className={`tab-button${isActive ? " tab-button-active" : ""}`}
    >
      {icon && icon}
      {title}
    </button>
  );
};

export default TabButton;
