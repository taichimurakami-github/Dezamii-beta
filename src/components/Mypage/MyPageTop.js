import { Header } from "../UI/Header";
import { cmpConfig } from "./config";
import { ListMenu } from "../UI/Menu";
import { AppRouteContext } from "../../AppRoute";
import { useContext } from "react";
import { ModalConfirmButton } from "../UI/Button";

export const MypageTop = (props) => {
  const { eraceModal, showConfirmModal, signOutFromApp } =
    useContext(AppRouteContext);

  const handleDeleteAccount = (e) => {
    console.log("deleted!");
    signOutFromApp();
  };

  const confirmDeleteAccount = () => {
    showConfirmModal({
      closable: false,
      content: {
        title: "アカウントを削除しますか？",
        text: ["この操作は取り消せません。", "本当に実行しますか？"],
      },
      children: (
        <ModalConfirmButton
          callback={{
            yes: handleDeleteAccount,
            no: eraceModal,
          }}
        />
      ),
    });
  };

  return (
    <>
      <Header title="マイページ" backable={false} />

      <ul className="mypage-top-wrapper">
        <img className="user-icon" src={props.user?.photo}></img>

        <ListMenu
          id={cmpConfig.state.view["003"]}
          handleClick={() => props.handleViewState(cmpConfig.state.view["003"])}
          title="お名前を編集："
          content={props.user?.name}
        />

        <ListMenu
          id={cmpConfig.state.view["004"]}
          handleClick={() => props.handleViewState(cmpConfig.state.view["004"])}
          title="年齢を編集："
          content={props.user?.age}
        />

        <ListMenu
          id={cmpConfig.state.view["005"]}
          handleClick={() => props.handleViewState(cmpConfig.state.view["005"])}
          title="プロフィールを編集："
          content={props.user?.profile}
        />

        {/* <ListMenu
          id={cmpConfig.state.view["006"]}
          handleClick={() =>
            props.handleViewState(cmpConfig.state.view["005"])
          }
          title="出身地を編集："
          content={
            props.user?.hometown.prefecture + " " + props.user?.hometown.city
          }
        />

        <ListMenu
          id={cmpConfig.state.view["007"]}
          handleClick={() =>
            props.handleViewState(cmpConfig.state.view["005"])
          }
          title="出身大学を編集："
          content={props.user?.history?.university}
        /> */}

        <ListMenu
          id="EDIT_ACCOUNT_LOCATION"
          handleClick={() => props.handleViewState(cmpConfig.state.view["005"])}
          title="位置情報を設定"
        />

        <ListMenu
          id={cmpConfig.state.view["010"]}
          handleClick={() => props.handleViewState(cmpConfig.state.view["005"])}
          title="チケットを追加"
        />
        <ListMenu
          id="DELETE_ACCOUNT"
          handleClick={confirmDeleteAccount}
          title="アカウントを削除"
        />
      </ul>
      <button className="btn-gray" handleOnClick={signOutFromApp}>
        ログアウトする
      </button>
    </>
  );
};
