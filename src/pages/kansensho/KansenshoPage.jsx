import { downloadFile } from "../../lib/download";

export function KansenshoPage() {
  return (
    <div>
      <div className="page-title-bar">
        <h1>予防接種 請求処理ポータル</h1>
        <div className="page-note">
          医療機関から受理した請求書・予診票を、GenUのユースケースビルダーで読み取り、
          出力された表をExcelにコピペして処理します。
        </div>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU ユースケースビルダー活用</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>医療機関から請求書・予診票を紙で受理する</li>
            <li>
              「ユースケースの定義をダウンロード」を取得し、GenUのユースケースビルダーにインポート
            </li>
            <li>受理した請求書・予診票（またはサンプル画像）をGenUにアップロード</li>
            <li>GenUが出力したタブ区切りの表を、そのままExcelに貼り付け</li>
            <li>内容を確認して処理完了</li>
          </ol>
        </div>
      </section>
      <section className="card">
        <div className="card-header">サンプル資料・ユースケース定義のダウンロード</div>
        <div className="card-body">
          <p className="field-help">
            デモ用のサンプル画像と、GenUにインポートするユースケース定義をダウンロードできます。
          </p>
          <div className="portal-download-grid">
            <div className="portal-download-item">
              <div className="pdi-title">予防接種費用 請求書（サンプル）</div>
              <div className="pdi-desc">
                接種明細表を含む請求書のサンプル画像（JPG）。GenUで表を読み取る対象です。
              </div>
              <button
                type="button"
                className="tool-btn download-btn"
                onClick={() => downloadFile("/img/kansensho-seikyu.jpg", "kansensho-seikyu.jpg")}
              >
                ⬇ 請求書サンプルをダウンロード
              </button>
            </div>
            <div className="portal-download-item">
              <div className="pdi-title">予診票（サンプル）</div>
              <div className="pdi-desc">被接種者1名分の予診票サンプル画像（JPG）です。</div>
              <button
                type="button"
                className="tool-btn download-btn"
                onClick={() => downloadFile("/img/kansensho-yoshin.jpg", "kansensho-yoshin.jpg")}
              >
                ⬇ 予診票サンプルをダウンロード
              </button>
            </div>
            <div className="portal-download-item">
              <div className="pdi-title">ユースケースの定義</div>
              <div className="pdi-desc">
                GenUのユースケースビルダーにインポートする定義（JSON）。
                Excelに貼り付けられる表を出力します。
              </div>
              <button
                type="button"
                className="tool-btn copy-btn"
                onClick={() => downloadFile("/doc/kansensho.json", "kansensho.json")}
              >
                ⬇ ユースケースの定義をダウンロード
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
