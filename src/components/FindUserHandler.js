import { useEffect, useState } from "react";
import { appConfig } from "../app.config";

import "../styles/usersList.scss";

//import components
import { Header } from "./UI/Header";
import { ShowUsersList } from "./FindUsers/ShowUsersList";
import { ShowUserProfile } from "./FindUsers/ShowUserProfile";
import { ShowRequestForm } from "./FindUsers/ShowRequestForm";

//import firebase fn
import { getAllUserDocs } from "../fn/db/firestore.handler";


//import config
import cmpConfig from "./FindUsers/config";



export const FindUserHandler = (props) => {

  const [selectedUserState, setSelectedUserState] = useState(null);
  const [viewState, setViewState] = useState(cmpConfig.state.view["001"]);

  const fetchAndRenewAllUserDocs = async () => {

    //モーダルを表示
    props.handleModalState({
      display: true,
      closable: false,
      type: appConfig.components.modal.type["001"]
    });

    //すべてのユーザーデータを取得し、App.allUserDocsStateを変更
    props.handleAllUserDocsState(await getAllUserDocs());

    //モーダルを消去
    props.handleModalState({ display: false });

  }

  useEffect(() => {
    // AllUserDocsが空だったらfetchを実行
    if (props.allUserDocs.length === 0) fetchAndRenewAllUserDocs();

    // viewStateが初期値に戻ったら、selectedUserStateを初期化
    if (viewState === cmpConfig.state.view["001"]) setSelectedUserState(null);

  }, [viewState]);


  const handleView = () => {
    switch (viewState) {
      case cmpConfig.state.view["001"]:
        return <ShowUsersList
          allUserDocs={props.allUserDocs}
          nowUserDoc={props.user}
          handleSelectedUser={setSelectedUserState}
          handleViewState={setViewState}
        />;

      case cmpConfig.state.view["002"]:
        return <ShowUserProfile
          user={selectedUserState}
          handleViewState={setViewState}
        />;

      case cmpConfig.state.view["003"]:
        return <ShowRequestForm
          user={selectedUserState}
          handleViewState={setViewState}
        />;

      default:
        return undefined;
    }
  }

  return (
    <>
      {handleView()}
    </>
  )
}