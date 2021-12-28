export const ConfirmModal = (props) => {
  return (
    <div
      className={`modal-container white confirm ${
        props?.className?.wrapper ? props.className.wrapper : ""
      }`}
    >
      <h3 className="title">{props?.title}</h3>
      {props?.text.map((val) => {
        return <p className="text">{val}</p>;
      })}
      {props?.children}
      {props?.children ? undefined : (
        <button className="btn-gray btn-close">閉じる</button>
      )}
    </div>
  );
};
