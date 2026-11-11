# 自治体AIデモポータル

自治体の窓口業務で生成AI（GenU、Amazon Connect など）がどう役立つかを、実際の業務画面に近いデモで体験できるポータルサイト。
8つの業務デモ（架空の「NTT市」の業務システム）を、トップページから選んで体験できる。
業務システムの画面は、閉鎖された元のデモサイト（2026-11-10）を復元した内容がもとになっている。

- **費用はかからない**: 既定ではブラウザ内のデータだけで動き、AWS など外部サービスには一切つながない。
- 業務デモは8種類・16画面。業務システム部分の文言は元サイトと同じ（全画面のテキスト一致を確認済み）。

## 動かす

Node.js 18 以上が必要。

```
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ に静的ファイルを出力
npm run preview  # build 結果の確認
```

## フォルダ構成

```
src/
  config/usecases.js      8つの業務デモの紹介文・色・アイコン・業務システムの名前（ここを直せば全体に反映）
  App.jsx                 ルーティング
  components/             SiteHeader / SiteFooter / DemoLayout（デモの紹介欄＋業務システムのウィンドウ）など
  pages/portal/           トップページ（ポータル）とメインビジュアルの絵
  pages/<業務>/           業務システムの一覧画面・詳細画面（業務ごとに1フォルダ）
  data/                   デモ用データ（*.js はメモリ上のストア、*.json は API モック）
  prompts/                画面から「コピー」できるAI要約プロンプト
  lib/                    api（API クライアント）/ store / clipboard / download など
  styles/app.css          全体のスタイル
public/
  img/ doc/ wav/          ダウンロード用のサンプル帳票・GenU ユースケース定義・音声
  config.json             API の接続先などの設定
```

## デザイン

- **コンセプト**: 「紙と電話の窓口業務を、生成AIで。」紙の申請書やハンコといった自治体らしいモチーフに、藍（紺）と朱色を合わせている。背景は紙のような生成り色
- **トップページ**: メインビジュアル → AIでできること（3分類）→ デモ一覧（分類で絞り込み）→ 使い方 → 仕組み
- **各デモ**: 上に「いまの課題 → AIでこう変わる」の紹介欄、下に業務システムの画面をアプリのウィンドウ風の枠で表示。前後のデモへ移動できる
- **色**: デモごとにテーマ色がある（`usecases.js` の `color`）。文字と背景のコントラスト比は 4.5:1 以上になるよう確認済み
- **フォント**: Zen Kaku Gothic New と Inter（Google Fonts から読み込み。どちらも無料・商用利用可）
- **アイコン**: lucide-react（ISC ライセンス）

## カスタマイズの入口

| やりたいこと | 触る場所 |
|---|---|
| デモの紹介文・色・アイコン・並び順を変える | `src/config/usecases.js` |
| 業務システムの名前・担当者名を変える | `src/config/usecases.js` の `system` |
| トップページの文言・構成を変える | `src/pages/portal/PortalPage.jsx` |
| デモを追加・削除する | `src/config/usecases.js` と `src/App.jsx` のルート |
| 一覧に出るデモデータを変える | `src/data/*.js`（`*Seed` の配列） |
| 保健指導・Connect 連携のデータを変える | `src/data/subjects.json` / `consultations.json` |
| AI 要約プロンプトを変える | `src/prompts/` |
| ダウンロードされる帳票や GenU 定義を差し替える | `public/img` / `public/doc` / `public/wav` |
| 全体の色・レイアウトを変える | `src/styles/app.css`（先頭の `:root` に色の変数） |

## データの扱い

編集・保存した内容はメモリ上だけで保持され、再読み込みで初期状態に戻る。
自前の API につなぎたいときは `public/config.json` の `apiEndpoint` に URL を入れる
（仕様は `src/lib/api.js` の冒頭コメント）。

## Amazon Connect ウィジェット（任意・既定は無効）

元サイトの `/connect` 画面には Amazon Connect のチャット/通話ウィジェットが付いていた。
利用には自分の Connect インスタンスが必要で、**通話・チャットには AWS の料金がかかる**ため、既定では読み込まない。
使う場合だけ `public/config.json` に次を書く（`src/components/ConnectWidget.jsx` 参照）。

```json
{
  "apiEndpoint": "",
  "connectWidget": { "scriptUrl": "…", "widgetId": "…", "snippetId": "…" }
}
```

## 公開する（GitHub Pages・無料）

`.github/workflows/deploy.yml` を入れてあるので、GitHub に push するだけで自動的にビルド・公開される。

1. GitHub で **Public** のリポジトリを作る（Private の Pages は有料プランが必要）
2. このフォルダを push する（`node_modules` と `dist` は `.gitignore` で除外済み）
3. リポジトリの **Settings → Pages → Source** を **GitHub Actions** にする
4. 数分後に `https://<ユーザー名>.github.io/<リポジトリ名>/` で見られる

## 本番と作業用の2つの環境

| | 本番 | 作業用 |
|---|---|---|
| ブランチ | `main` | `dev` |
| URL | `https://<ユーザー名>.github.io/<リポジトリ名>/` | 同じ URL の末尾に `staging/` を付けたもの |
| 見た目 | 通常 | 画面上部に黄色い「作業用環境」の帯。タイトルに `[作業用]`。検索エンジンには載せない |

**ふだんの流れ**

1. `dev` ブランチに切り替えて、画面や文言を変える（手元では `npm run dev` で確認できる）
2. コミットして Push する → 数分後に「作業用」のページが自動で更新される
3. 作業用のページで、見た目や動きを確認する（他の人にも URL を共有できる）
4. 問題なければ `dev` を `main` に取り込んで Push する → 本番が更新される

仕組み: GitHub Pages は `main` からしか公開できないため、`dev` に Push したときは `.github/workflows/notify-staging.yml` が公開処理（`deploy.yml`）を `main` 側で起動し、`main` と `dev` の両方をビルドして1つのサイトにまとめている。
作業用のページも、URL を知っていれば誰でも見られる（秘密のページではない）。本物の個人情報・社内情報は入れないこと。

別のホスティング（Cloudflare Pages、Netlify など）に置くときは、`npm run build` の `dist/` をそのまま置けばよい。
サブパス公開や、URL を直接開いたときの 404 に備えて 2 つの環境変数がある。

- `VITE_BASE=/リポジトリ名/` : `https://…/リポジトリ名/` のようにサブパスで公開するとき
- `VITE_ROUTER=hash` : サーバーの設定なしで、画面の URL を直接開けるようにする（URL が `/#/resident` の形になる）

`public/wav/soudan.wav` は約 18MB ある。容量を抑えたいときは圧縮するか、使う画面（子ども・若者総合支援センター）の導線ごと外す。
