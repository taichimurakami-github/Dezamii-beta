import { useContext, useState } from "react";
import { AppRouteContext } from "../../AppRoute";
import { cmpConfig } from "./config";
import { Header } from "../UI/Header";
import { ControlledInputText } from "../UI/InputText";
import { validateAccountData } from "../../fn/app/validateAccountData";
import { updateUserData } from "../../fn/db/updateHandler";

export const EditMatchingAge = (props) => {
  const { authUserDoc, showLoadingModal, showConfirmModal, showErrorModal } =
    useContext(AppRouteContext);
  const [overAgeRestriction, setOverAgeRestriction] = useState(
    authUserDoc?.setting?.matching?.age?.diff?.plus || ""
  );
  const [belowAgeRestriction, setBelowAgeRestriction] = useState(
    authUserDoc?.setting?.matching?.age?.diff?.minus || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAbleToSubmit()) return;

    (async () => {
      try {
        showLoadingModal();
        await updateUserData({
          uid: authUserDoc.uid,
          "setting.matching.age.diff": {
            plus: overAgeRestriction,
            minus: belowAgeRestriction,
          },
        });
        showConfirmModal({
          content: {
            title: "更新に成功しました。",
          },
        });
      } catch (e) {
        console.log(e);
        showErrorModal({
          content: {
            title: "データの更新に失敗しました。",
            text: ["お手数ですがもう一度やり直してください。"],
          },
        });
      }
      props.handleViewState(cmpConfig.state.view["001"]);
    })();
  };

  const isAbleToSubmit = () => {
    const isInputDifferFromBeforeValue =
      overAgeRestriction !== authUserDoc.setting.matching.age.diff.plus ||
      belowAgeRestriction !== authUserDoc.setting.matching.age.diff.minus;

    return (
      isInputDifferFromBeforeValue &&
      validateAccountData("number-01", overAgeRestriction) &&
      validateAccountData("number-01", belowAgeRestriction)
    );
  };

  return (
    <>
      <Header
        title="マッチング年齢幅を設定"
        backable={true}
        handleBack={() => props.handleViewState(cmpConfig.state.view["001"])}
      />

      <form onSubmit={handleSubmit}>
        <h2 className="input-target-title" style={{ marginBottom: "30px" }}>
          マッチング年齢幅を設定
        </h2>
        <p className="description">
          マッチングする年齢幅を設定してください。<br></br>
          年上、年下それぞれ別々に設定できます。<br></br>
          なお、半角英数字で0〜100の数字のみ設定できます。
        </p>
        <ControlledInputText
          id="over-age-restriction"
          valueState={overAgeRestriction}
          setValueState={setOverAgeRestriction}
          required={true}
          text={{
            label: "年上に対する許容年齢幅を設定",
            placeholder: "半角英数字で入力",
          }}
          pattern="^[1-9][0-9]*$"
        ></ControlledInputText>

        <ControlledInputText
          id="below-age-restriction"
          valueState={belowAgeRestriction}
          setValueState={setBelowAgeRestriction}
          required={true}
          text={{
            label: "年下に対する年齢許容幅を設定",
            placeholder: "年下の年齢幅を半角で入力",
          }}
          pattern="^[1-9][0-9]*$"
        ></ControlledInputText>

        <button
          disabled={!isAbleToSubmit()}
          className="btn-orange"
          type="submit"
        >
          この内容に変更する
        </button>
      </form>

      <button
        className="btn-gray"
        onClick={() => props.handleViewState(cmpConfig.state.view["001"])}
      >
        前のページに戻る
      </button>
    </>
  );
};