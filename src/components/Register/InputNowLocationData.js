import { useContext } from "react";
import { AppRouteContext } from "../../AppRoute";
import { setGeolocation } from "../../fn/app/geolocation";
import { validateAccountData } from "../../fn/app/validateAccountData";
import { ChoiceActionButton } from "../UI/Button";
import { Header } from "../UI/Header";

export const InputNowLocationData = (props) => {
  const { showLoadingModal, showErrorModal, eraceModal } =
    useContext(AppRouteContext);

  const isAbleToGoNext = () => {
    return (
      props.registerUserData.location.lat !== "" &&
      props.registerUserData.location.lng !== ""
    );
  };

  const handleGoNext = () => {
    if (isAbleToGoNext()) {
      props.handleGoNext();
    } else {
      showErrorModal({
        content: {
          title: "現在地が取得されていません。",
          text: [
            "現在地の設定がない場合はマッチングを行うことができません。",
            "現在地の取得を許可してください。",
          ],
        },
      });
    }
  };

  const handleGoBack = () => {
    props.handleGoBack();
  };

  return (
    <>
      <Header title="現在地を登録" handleBack={handleGoBack} />

      <div className="register-form-container">
        <h2>マッチング用に現在地を登録</h2>

        <p className="description">
          本アプリは、近場にいるユーザー検索を行う際、<br></br>
          アプリユーザーの位置情報の登録が必要です。<br></br>
        </p>

        <p className="description">
          下部のボタンを押して現在地を登録してください。<br></br>
          なお、本設定はアカウント登録後も変更可能です。
        </p>

        <button
          className={`getNowLocation ${
            props.registerUserData.location?.lat &&
            props.registerUserData.location?.lng
              ? "btn-gray"
              : "btn-orange"
          }`}
          type="button"
          disabled={
            props.registerUserData.location?.lat &&
            props.registerUserData.location?.lng
          }
          onClick={() => {
            showLoadingModal();
            setGeolocation({
              success: (data) => {
                props.dispatchUserData({
                  type: "set",
                  value: {
                    location: { ...data },
                  },
                });
                eraceModal();
              },
              error: (e) => {
                let errorMessage =
                  e.code === 1
                    ? "現在地の取得を許可してください。"
                    : "位置情報の取得中にエラーが発生しました。";

                showErrorModal({
                  content: {
                    title: "現在地の取得に失敗しました。",
                    text: [errorMessage],
                  },
                });
              },
            });
          }}
        >
          {props.registerUserData.location?.lat &&
          props.registerUserData.location?.lng
            ? "現在地を取得しました。"
            : "現在地の設定を開始"}
        </button>
        <ChoiceActionButton
          callback={{
            yes: handleGoNext,
            no: handleGoBack,
          }}
          text={{
            yes: "次へ進む >",
            no: "< 前に戻る",
          }}
          attributes={{
            yes: {
              disabled: !isAbleToGoNext(),
            },
          }}
          reverseOrder={true}
        />
      </div>
    </>
  );
};
