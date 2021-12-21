import { Header } from "./UI/Header";
import { useEffect, useState } from "react"

import { ShowFriendList } from "./Friend/ShowFriendList";
import { ShowChatRoom } from "./Friend/ShowChatRoom";

import cmpConfig from "./Friend/config";
import { ShowUserProfileOnRequestReceived } from "./Friend/ShowUserProfileOnRequestReceived";
import { ShowUserProfileOnRequestSent } from "./Friend/ShowUserProfileOnRequestSent";
import { registerChatroom, registerRequest, registerUpdateHookForChatroom } from "../fn/db/firestore.handler";

export const FriendHandler = (props) => {

  const [viewState, setViewState] = useState(cmpConfig.state.view["001"]);
  const [selectedUserDocState, setSelectedUserDocState] = useState(null);
  const [chatRoomDataState, setChatRoomDataState] = useState(null);

  // chatRoomを監視するHookを起動
  // AuthState上にunsubscribe()を保存
  useEffect(() => {
    console.log("CCCCCCCCCCCCCC");
    // chatRoomDataState === null && setChatRoomDataState &&
    // props.handleAuthState({
    //   ...props.authState,
    //   onSnapshot_unsubscribe: [
    //     ...props.authState.onSnapshot_unsubscribe,
    //     registerUpdateHookForChatroom(
    //       props.nowUserDoc.friend.map(val => val.chatRoomID),
    //       setChatRoomDataState
    //     )
    //   ]
    // });
  }, []);

  // フレンドリスト画面に戻ってきたらselectedUserDocStateを初期化
  useEffect(() => {
    viewState === cmpConfig.state.view["001"] && setSelectedUserDocState(null);
  }, [viewState]);

  /**
   * リクエスト拒否を処理する
   */
  const handleRejectRequest = () => {

    if (selectedUserDocState === null) throw new Error("handleRejectRequest Error: リクエストをハンドルする対象ユーザーのデータがありません。");

    // リクエストを拒否する側のデータを用意
    const nowUserDoc_newData = {
      ...props.nowUserDoc,
      //request_received: selectedUserのuidを削除
      request_received: props.nowUserDoc.request_received.filter(val => val !== selectedUserDocState.uid),
      request_rejected: [...props.nowUserDoc.request_rejected, selectedUserDocState.uid],
    };

    // リクエストを拒否される側のデータを用意
    // リクエストの拒否の履歴を保存する
    const targetUserDoc_newData = {
      ...selectedUserDocState,
      //request_sent: nowUserのuidを削除
      //request_rejected: nowUserのuidを追加 
      request_sent: selectedUserDocState.request_sent.filter(val => val !== props.nowUserDoc.uid),
      request_rejected: [...selectedUserDocState.request_rejected, props.nowUserDoc.uid],
    };

    (async () => {
      await registerRequest(nowUserDoc_newData, targetUserDoc_newData);
      setViewState(cmpConfig.state.view["001"]);
    })();
  }

  /**
   * リクエスト許可を処理する
   */
  const handleApproveRequest = async () => {

    if (selectedUserDocState === null) throw new Error("handleRejectRequest Error: リクエストをハンドルする対象ユーザーのデータがありません。");

    const chatRoomID = await registerChatroom(props.nowUserDoc, selectedUserDocState);

    // リクエストを許可する側のデータを用意
    const nowUserDoc_newData = {
      ...props.nowUserDoc,
      //request_received: selectedUserのuidを削除
      //friend: selectedUserの[uid, chatroomID] arrayを追加
      request_received: props.nowUserDoc.request_received.filter(val => val !== selectedUserDocState.uid),
      friend: [
        ...props.nowUserDoc.friend,
        {
          uid: selectedUserDocState.uid,
          chatRoomID: chatRoomID,
        }
      ],
    };

    // リクエストを許可される側のデータを用意
    const targetUserDoc_newData = {
      ...selectedUserDocState,
      //request_sent: nowUserのuidを削除
      //friend: nowUserの[uid, chatroomID] arrayを追加 
      request_sent: selectedUserDocState.request_sent.filter(val => val !== props.nowUserDoc.uid),
      friend: [
        ...selectedUserDocState.friend,
        {
          uid: props.nowUserDoc.uid,
          chatRoomID: chatRoomID
        }
      ],
    };

    (async () => {
      await registerRequest(nowUserDoc_newData, targetUserDoc_newData);
      setViewState(cmpConfig.state.view["001"]);
    })();
  }

  const handleView = () => {
    switch (viewState) {
      case cmpConfig.state.view["001"]:
        return <ShowFriendList
          nowUserDoc={props.nowUserDoc}
          allUserDocs={props.allUserDocs}
          handleSelectedUserDoc={setSelectedUserDocState}
          handleViewState={setViewState}
        />;

      case cmpConfig.state.view["002"]:
        return <ShowChatRoom
          handleViewState={setViewState}
        />;

      case cmpConfig.state.view["003"]:
        return <ShowUserProfileOnRequestReceived
          targetUserDoc={selectedUserDocState}
          handleViewState={setViewState}
          handleRejectRequest={handleRejectRequest}
          handleApproveRequest={handleApproveRequest}
        />;

      case cmpConfig.state.view["004"]:
        return <ShowUserProfileOnRequestSent
          targetUserDoc={selectedUserDocState}
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
  );
}