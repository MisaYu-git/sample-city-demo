# NTT市 自治体業務デモ

自治体業務で生成AI（GenU など）を使うデモ用の画面一式を、React + Vite で作り直したもの。
元のデモサイト（2026-11-10 閉鎖）を HAR・配信ファイルから復元した内容がもとになっている。

- **費用はかからない**: 既定ではブラウザ内のデータだけで動き、AWS など外部サービスには一切つながない。
- 画面は全8業務・16画面。文言・見た目は元サイトと同じ（全画面のテキスト一致を確認済み）。

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
  config/departments.js   部署ごとのタブ・ヘッダー・パンくず・フッターの文言
  App.jsx                 画面枠とルーティング
  components/             Header / Breadcrumb / ConnectWidget
  pages/<部署>/           一覧画面・詳細画面（部署ごとに1フォルダ）
  data/                   デモ用データ（*.js はメモリ上のストア、*.json は API モック）
  prompts/                画面から「コピー」できるAI要約プロンプト
  lib/                    api（API クライアント）/ store / clipboard / download など
  styles/app.css          全体のスタイル
public/
  img/ doc/ wav/          ダウンロード用のサンプル帳票・GenU ユースケース定義・音声
  config.json             API の接続先などの設定
```

## デザインの基準

画面の見た目は、[デジタル庁デザインシステム](https://design.digital.go.jp/)の考え方に沿っている。
色・文字サイズ・角丸などの値は、公式のデザイントークン（`@digital-go-jp/design-tokens`、MIT ライセンス）を使っている。

- 文字は 16px 以上が基本。14px は補足情報だけに使う
- 文字と背景のコントラスト比は 4.5:1 以上、枠線は 3:1 以上
- キーボードで移動したとき、フォーカスが黒い枠＋黄色い縁で見える
- リンクは色だけでなく下線でも区別する
- 一覧の「◯◯を開く」はリンクなので、キーボード（Tab → Enter）で開ける

デジタル庁が作成・監修したものではなく、ロゴ等も使っていない（`THIRD_PARTY_NOTICES.md` 参照）。
フォントは、Noto Sans JP が入っていればそれを、無ければ OS 標準の日本語フォントを使う（Web フォントは読み込まない）。

## カスタマイズの入口

| やりたいこと | 触る場所 |
|---|---|
| 市の名前・担当者名・ヘッダーやフッターの文言を変える | `src/config/departments.js` |
| 部署（タブ）を追加・削除する | `src/config/departments.js` と `src/App.jsx` のルート |
| 一覧に出るデモデータを変える | `src/data/*.js`（`*Seed` の配列） |
| 保健指導・Connect 連携のデータを変える | `src/data/subjects.json` / `consultations.json` |
| AI 要約プロンプトを変える | `src/prompts/` |
| ダウンロードされる帳票や GenU 定義を差し替える | `public/img` / `public/doc` / `public/wav` |
| 色・レイアウトを変える | `src/styles/app.css`（先頭の `:root` の「用途の名前」を差し替える） |

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
