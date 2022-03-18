import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  render() {
    return (
      <>
        {this.props.isOpen && (
          <div className="overlay">
            <div className="modal-window">
              <div className="modal-header">
                Вы уверены, что хотите удалить пользователя?
              </div>
              <div className="modal-buttons">
                <button className="confirm-button" onClick={this.props.confirm}>
                  Да
                </button>
                <button className="cancel-button" onClick={this.props.cancel}>
                  Нет
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Modal;
