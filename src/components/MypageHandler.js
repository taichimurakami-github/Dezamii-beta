import { useContext, useState } from "react";
import { updateUserData } from "../fn/db/updateHandler";

import { cmpConfig } from "./Mypage/config";
import { ShowMypageTop } from "./Mypage/ShowMyPageTop";
import { EditText } from "./Mypage/EditText";
import { AppRouteContext } from "../AppRoute";
import ErrorBoundary from "./ErrorBoundary";

import { EditMatchingAge } from "./Mypage/EditMatchingAge";
import { EditUserImage } from "./Mypage/EditUserImage";
import { validateAccountData } from "../fn/app/validateAccountData";

import "../styles/Mypage.scss";

export const MypageHandler = (props) => {
  const [viewState, setViewState] = useState(cmpConfig.state.view["001"]);
  const { eraceModal, showLoadingModal, showConfirmModal } =
    useContext(AppRouteContext);

  const handleUpdateAuthUserDoc = async (
    updateData,
    newModalStateData = null
  ) => {
    showLoadingModal();
    await updateUserData({ ...updateData, uid: props.nowUserDoc.uid });
    newModalStateData ? showConfirmModal(newModalStateData) : eraceModal();
  };

  const handleSubmitToDB = (data) => {
    (async () => {
      //loading 画面を表示
      showLoadingModal();

      let updateData;

      switch (viewState) {
        case cmpConfig.state.view["002"]:
          updateData = { uid: props.nowUserDoc.uid, photo: data };
          break;

        case cmpConfig.state.view["003"]:
          updateData = { uid: props.nowUserDoc.uid, name: data };
          break;

        case cmpConfig.state.view["004"]:
          updateData = { uid: props.nowUserDoc.uid, age: data };
          break;

        case cmpConfig.state.view["005"]:
          updateData = { uid: props.nowUserDoc.uid, profile: data };
          break;

        default:
          return;
      }

      //アップデートを実行
      await updateUserData(updateData);

      //loadingモーダルを消し、confirmModalを表示
      showConfirmModal({
        content: {
          title: "アカウントデータを更新しました。",
        },
      });

      //myPageTopに遷移
      setViewState(cmpConfig.state.view["001"]);
    })();
  };

  const handleView = () => {
    switch (viewState) {
      case cmpConfig.state.view["001"]:
        return (
          <ShowMypageTop
            handleViewState={setViewState}
            handleSubmit={handleSubmitToDB}
            handleExecUpdate={handleUpdateAuthUserDoc}
            nowUserDoc={props.nowUserDoc}
            signOut={props.signOut}
            chatRoomData={props.chatRoomData}
          />
        );

      case cmpConfig.state.view["002"]:
        return (
          <EditUserImage
            handleViewState={setViewState}
            handleSubmit={handleSubmitToDB}
            handleExecUpdate={handleUpdateAuthUserDoc}
            nowUserDoc={props.nowUserDoc}
          />
        );

      case cmpConfig.state.view["003"]:
        return (
          <EditText
            viewState={viewState}
            handleViewState={setViewState}
            handleSubmit={handleSubmitToDB}
            handleValidate={(str) => {
              return validateAccountData("string-01", str) && str.length <= 30;
            }}
            pattern=".*\S+.*"
            text={{
              placeholder: "お名前を30文字以内で入力",
            }}
            defaultValue={props.nowUserDoc.name}
          />
        );

      //年齢の編集：無効化
      // case cmpConfig.state.view["004"]:
      // return (
      // <EditText
      //   viewState={viewState}
      //   handleViewState={setViewState}
      //   handleSubmit={handleSubmitToDB}
      //   inputMode="select"
      //   defaultValue={props.nowUserDoc.age}
      // >
      //   <AgeOptions />
      // </EditText>
      // );

      case cmpConfig.state.view["005"]:
        return (
          <EditText
            viewState={viewState}
            handleViewState={setViewState}
            handleValidate={(str) => {
              return validateAccountData("string-01", str) && str.length <= 100;
            }}
            handleSubmit={handleSubmitToDB}
            inputMode="textarea"
            text={{
              placeholder: "プロフィールを100文字以内で入力",
            }}
            defaultValue={props.nowUserDoc.profile}
          />
        );

      case cmpConfig.state.view["011"]:
        return (
          <EditMatchingAge
            viewState={viewState}
            handleViewState={setViewState}
            defaultValue={{
              plus: props.nowUserDoc?.setting?.matching?.age?.diff?.plus,
              minus: props.nowUserDoc?.setting?.matching?.age?.diff?.minus,
            }}
          />
        );

      default:
        return undefined;
    }
  };

  return <ErrorBoundary>{handleView()}</ErrorBoundary>;
};
