import { useEffect, useState } from "react";
import { appConfig } from "../app.config";

import "../styles/usersList.scss";

//import components
import { ShowFoundUsersList } from "./FindUsers/ShowFoundUsersList";
import { ShowUserProfile } from "./FindUsers/ShowUserProfile";
import { ShowRequestForm } from "./FindUsers/ShowRequestForm";

//import firebase fn
import { getAllUserDocs } from "../fn/db/firestore.handler";
import { sendRequest } from "../fn/db/requestHandler";

//import config
import cmpConfig from "./FindUsers/config";

export const FindUserHandler = (props) => {
  const [selectedUserState, setSelectedUserState] = useState(null);
  const [viewState, setViewState] = useState(cmpConfig.state.view["001"]);

  const fetchAndRenewAllUserDocs = async () => {
    console.log("handle fetch");

    //モーダルを表示
    props.handleModalState({
      display: true,
      closable: false,
      type: appConfig.components.modal.type["001"],
    });

    //すべてのユーザーデータを取得し、App.allUserDocsStateを変更
    const fetchResult = await getAllUserDocs();
    props.handleAllUserDocsState(fetchResult);

    //モーダルを消去
    props.handleModalState({ display: false });

    return true;
  };

  /**
   * sendRequest
   */
  const handleSendRequest = () => {
    const senderUid = props.user.uid;
    const receiverUid = selectedUserState.uid;

    console.log(senderUid, receiverUid);

    (async () => {
      await sendRequest(senderUid, receiverUid);
      setViewState(cmpConfig.state.view["001"]);
    })();
  };

  useEffect(() => {
    // viewStateが初期値に戻ったら、selectedUserStateを初期化
    if (viewState === cmpConfig.state.view["001"]) setSelectedUserState(null);
  }, [viewState]);

  const handleView = () => {
    switch (viewState) {
      case cmpConfig.state.view["001"]:
        return (
          <ShowFoundUsersList
            allUserDocs={props.allUserDocs}
            nowUserDoc={props.user}
            handleSelectedUser={setSelectedUserState}
            handleViewState={setViewState}
            handleFetchAndRenewAllUserDocs={fetchAndRenewAllUserDocs}
          />
        );

      case cmpConfig.state.view["002"]:
        return (
          <ShowUserProfile
            nowUserDoc={props.user}
            targetUserDoc={selectedUserState}
            handleViewState={setViewState}
          />
        );

      case cmpConfig.state.view["003"]:
        return (
          <ShowRequestForm
            targetUserDoc={selectedUserState}
            handleRequest={handleSendRequest}
            handleViewState={setViewState}
          />
        );

      default:
        return undefined;
    }
  };

  return <>{handleView()}</>;
};
