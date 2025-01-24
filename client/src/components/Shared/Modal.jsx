import "../../assets/css/modal.css";

const Modal = ({ width, height }) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-inner-wrapper">
        <div style={style} className="modal-content"></div>
      </div>
    </div>
  );
};

export default Modal;
