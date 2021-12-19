import { Header } from "../UI/Header";
import cmpConfig from "./config";


export const ShowRequestForm = (props) => {

  const handleSendRequest = () => {
    /**
     * リクエストを送る処理を入れる
     */
  }

  return (
    <>
      <Header
        title={`${props.user.name} さんにリクエストを送る`}
        backable={true}
        handleBack={() => props.handleViewState(cmpConfig.state.view["002"])}
      />
      <img className="user-icon" src={props.user.photo}></img>
      <button className="btn-orange" onClick={handleSendRequest}>
        チケット１枚を消費して<br></br>リクエストを送る
      </button>
      <button className="btn-gray" onClick={() => props.handleViewState(cmpConfig.state.view["001"])}>
        リクエストをキャンセル
      </button>
    </>
  )
}