import { signInWithGoogle } from "../fn/auth/firebase.auth";

import "../styles/SignUp.scss";
import logo from "../images/logo_dezamii.png";
import logotype from "../images/SVG/dezamii_logotype.svg";

export const SignUp = () => {
  const isRunningOnPWA = window.matchMedia("(display-mode: standalone").matches;

  return (
    <>
      <div className="sign-up-content-container flex-col-xyc">
        <img
          className="app-logo-icon"
          src={logo}
          alt="Dezamii コミュニケーション促進サービス"
        ></img>
        <img className="app-logo-type" src={logotype} alt="De"></img>
        <button className="btn-orange btn-sign-up" onClick={signInWithGoogle}>
          googleアカウントでログイン
        </button>
        {!isRunningOnPWA && (
          //PWA上で動作していない
          <p className="description">
            本アプリをスマートフォン上でご利用になる際は、
            <br></br>
            ホーム画面へのインストールを推奨します。
            <br></br>
            <br></br>
            iphoneの場合は共有ボタン<br></br>→ 「ホーム画面に追加」
            <br></br>
            <br></br>
            Androidの場合は、ブラウザメニュー<br></br>
            →「アプリをインストール」
            <br></br>
            <br></br>
            からアプリをインストールしてください。
          </p>
        )}
        <p className="copyright">
          &copy; 2021 team ConneQt all rights reserved.
        </p>
      </div>
    </>
  );
};
