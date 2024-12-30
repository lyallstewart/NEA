import "../assets/css/header.css";

const Header = ({ title, children }) => {
  return (
    <header>
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default Header;
