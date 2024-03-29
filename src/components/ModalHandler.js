import { appConfig } from "../app.config";
import { useContext } from "react";

//modal import
import { LoadingModal } from "./Modal/LoadingModal";
import { ConfirmModal } from "./Modal/ConfirmModal";
import { ErrorModal } from "./Modal/ErrorModal";
import { AppRouteContext } from "../AppRoute";

//style import
import "../styles/Modal.scss";

export const ModalHandler = () => {
  const { modalState, eraceModal } = useContext(AppRouteContext);

  const handleClose = () => modalState.closable && eraceModal();

  const handleModal = () => {
    switch (modalState.type) {
      case appConfig.components.modal.type["001"]:
        return <LoadingModal />;

      case appConfig.components.modal.type["002"]:
        return (
          <ConfirmModal
            handleClose={handleClose}
            title={modalState?.content?.title}
            text={modalState?.content?.text}
            options={modalState?.options}
            key={"APP_COMPONENT_CONFIRM_MODAL"}
          >
            {modalState?.children}
          </ConfirmModal>
        );
      case appConfig.components.modal.type["003"]:
        return (
          <ErrorModal
            handleClose={handleClose}
            title={modalState?.content?.title}
            text={modalState?.content?.text}
            options={modalState?.options}
            key={"APP_COMPONENT_ERROR_MODAL"}
          >
            {modalState?.children}
          </ErrorModal>
        );

      default:
        return undefined;
    }
  };

  return (
    <>
      <div
        className={`modal-wrapper ${modalState.display && "active"}`}
        onClick={handleClose}
      >
        {modalState.display && handleModal()}
      </div>
    </>
  );
};
