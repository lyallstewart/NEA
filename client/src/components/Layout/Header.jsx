import "../../assets/css/header.css";

const Header = ({ title, children }) => {
  return (
    <header>
      <div className={"header-title"}>
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  );
};

export default Header;
