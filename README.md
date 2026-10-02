# 株式会社TKG コーポレートサイト

請負制作案件。TND AI Mediaの運用リポジトリとは別管理（クライアント案件のため独立フォルダ）。

## クライアント情報

- 会社名：株式会社TKG
- ご担当者：木佐祐久
- 連絡先：09098763643 / office.tkgxx@gmai.com（※gmail.comの"i"抜けの可能性あり、要確認）
- ヒアリング実施日：2026/9/26

## スコープ（第一弾・2027/4公開目標）

サイト本体（静的HTML/CSS/JS）のみ。GCS上のWebアプリ（お試し開放→有料キー発行、顧客リスト化）は
第二弾フェーズとして別途打合せ・別途予算。

予算目安：5万円ほど（クライアント了承のうえ、実現範囲は別途相談）。

## 分業

- **ベース（構造・コード・コンテンツ設計）**：Claude
- **グラフィック（画像・イラスト等の素材）**：Codex（依頼内容は [GRAPHICS-BRIEF.md](./GRAPHICS-BRIEF.md) 参照）
- 2026-09-27 Codexより初稿一式納品済み（`assets/`）、全ページに組み込み済み。詳細は `assets/GRAPHICS-HANDOFF.md`
  - 代表アバター（avatar-kisa.png）は本人の写真ではなく仮キャラクターのイラスト。「代表イメージイラスト」と明記して掲載する運用（about.html・faq.htmlで対応済み）
  - 実績用プレースホルダー画像も実際の事例写真ではない旨をキャプションで明記（works.html）

## ターゲット・訴求軸

1. 法人向け：コンサルタント／コンサル業務紹介、困りごと解決の相談窓口
2. 個人向け：法人向けと同様の相談、またはピンポイントの小規模委託
3. ランサー登録：個人事業主としてTKGに登録したい人向け

流入経路：検索 + SNS。目標は「1年以内に新規顧客1件 or 委託案件1件の受注」。

## デザイン方針

- 雰囲気：先進的・スタイリッシュ（ギミック/動きを効かせる）＋ 温かみ・親しみやすさ の両立
- コーポレートカラー：紺（ネイビー）・黄色・白
- NG：明るすぎる配色、どこかで見た定型デザイン
- 参考サイト：
  - https://www.ryden.co.jp/
  - https://www.bikebear.com.my/web-design/
  - https://yourbana.com/

## サイトマップ

| ページ | 状態 | 備考 |
|---|---|---|
| トップ（index.html） | 作成済み・founder確認済み | 3ターゲット訴求＋CTA。全画面スライド演出（詳細は技術メモ） |
| 会社概要（about.html） | ドラフト作成済み | スタッフ・代表紹介を統合。基本情報の一部（所在地・設立・資本金）とfounderメッセージは仮テキスト、要差し替え |
| 事業内容・サービス紹介（services.html） | ドラフト作成済み | 4事業＋ご利用の流れ。トップと同じ全画面スライド構成 |
| 実績・事例（works.html） | ドラフト作成済み | 実績はまだないため「準備中」の空状態＋対応分野の例のみ。通常スクロール（スライドなし） |
| ブログ・お知らせ（blog.html） | ドラフト作成済み | 空状態のみ。通常スクロール |
| お問い合わせ（contact.html） | ドラフト作成済み | フォームUIのみ実装、送信先未実装（下記参照）。通常スクロール |
| よくある質問（faq.html） | ドラフト作成済み | アコーディオン形式。「木佐社長AI」は準備中の案内のみ。通常スクロール |

## 未決事項（クライアント確認待ち）

- お問い合わせフォームの送信先（メールへの転送でよいか、フォーム送信サービスを使うか）
- 写真・画像素材：クライアントから提供が難しいとのことで相談中。Codexでの生成 or ストック素材を想定
- 文章原稿：クライアントから作成依頼あり。各ページ、ドラフトをClaude側で書いて確認してもらう運用にする
- 独自ドメイン：保有済みとのことだが、ドメイン名・DNS設定担当は未確認
- メールアドレスのtypo疑い（上記）
- 会社概要ページの基本情報（所在地・設立年月日・資本金）：ヒアリングシートに記載がないため仮の空欄「［ご記入ください］」のまま。クライアント確認要
- 代表挨拶（about.html）：文章はClaudeによる仮ドラフト。木佐様ご自身の言葉への差し替えを推奨する旨、ページ内にもコメントで明記済み

## 技術メモ

- ビルドツールなし。素の HTML/CSS/JS のみ（保守しやすさ・低コスト優先）
- 各ページでヘッダー/フッターのマークアップを複製する方式（静的サイトなのでこれで十分）
- フォントは Google Fonts（Zen Maru Gothic / Noto Sans JP）
- OGP（og:image等）はassets/ogp.pngを相対パスで仮設定済み。公開ドメイン確定後、絶対URLに変更が必要（各ページ`<head>`にTODOコメントあり）
- **全画面スライド演出**：`.snap-section` を1画面ずつ縦に並べる構成。CSSの`scroll-snap`は
  スマホの強いスワイプで途中スライドを飛び越える不具合があったため使わず、`js/main.js`の
  `initSlideScroll()` でスクロールそのものをJS制御（1ジェスチャー＝1スライド）。
  スマホ幅（900px以下）では `.audience-card` / `.service-item` が個別に1スライド化し、
  出現時に横（`translateX`）からスライドインする。`prefers-reduced-motion`時は通常スクロールに
  フォールバック。他ページを同じ演出で作る際は `initSlideScroll()` 内のセレクタを拡張すること。
- **ヒーロー画像のスマホ用クロップ（2026-09-27）**：`hero-*.webp`は16:9の横長画像のため、`background-size:cover`
  のままスマホ幅で使うと縦長ボックスに引き伸ばされて画像が大きく（ズームして）見えてしまう不具合があった。
  各画像から縦長寄りの構図（`hero-*-mobile.webp`、被写体中心をx=66%付近でクロップ、WHR比0.78）を別途生成し、
  `--hero-image-mobile`カスタムプロパティで640px以下の幅にだけ差し替えるようにした。新しいヒーロー画像を
  追加する際は、この`hero-*-mobile.webp`も同じ手順（Pythonスクリプトで中心クロップ→WebP変換）で作ること。
- **ページ間のシームレス遷移**：CSSの `@view-transition { navigation: auto; }` ＋ 各ページの
  ヒーロー要素（`.hero` / `.page-header`）とヘッダーロゴ（`.site-header .logo`）に共通の
  `view-transition-name` を付与（View Transitions API）。対応ブラウザ（Chrome/Edge系）ではページ
  遷移時にヒーロー画像・ロゴがクロスフェードする。非対応ブラウザ（Safari/Firefox）は無視されて通常
  遷移になるだけなので、フォールバック実装は不要。新しいページを追加する際も同名の
  `view-transition-name: page-hero` をヒーロー要素に付ける。
- **ヒーロー画像（2026-09-27・組み込み済み）**：founder指定の参考画像（`assets/reference/hero-mood-reference.jpg`）
  を元に、卵の殻が割れるビジュアル（TKG＝Task Kisa Guild／卵かけご飯の掛け言葉）でCodexが7ページ分を制作
  （`hero-index.png`〜`hero-faq.png`、詳細は`assets/HERO-HANDOFF.md`）。容量削減のためClaude側でWebP変換
  （`hero-*.webp`、元PNGの約1/10のサイズ）。CSSでは各ページの`.hero`/`.page-header`に`hero--index`のような
  修飾クラスを追加し、`--hero-image`カスタムプロパティで画像を指定（`.hero, .page-header`共通ルールで
  ネイビーのグラデーション＋画像を`background-image`に重ねる）。**注意**：`css/style.css`内の`url()`は
  CSSファイル自身からの相対パス（`../assets/...`）なので、`assets/...`と書くと`css/assets/...`を探しに
  行ってしまう——実際にこれで一度ハマった。スマホ幅（640px以下）ではグラデーションを均一な暗さに変更し
  `background-position: 68% center`（Codex指定）でクロップ位置を調整。index.htmlの`.hero-canvas`
  （パーティクル演出）は画像と喧嘩するため削除（JS/CSSの実装自体は残してあるので他ページで再利用可）。
- **参考サイト5社（RYDEN／BikeBear／Yourbana／WAKITA HI-TECS／MEIRA）調査後の追加演出（2026-09-28）**：
  - `.marquee-band` / `.marquee-track`：BikeBear風の横スクロールするマーキー帯。index.html（ヒーロー直後）と
    services.html（ヒーロー直後）に設置。`prefers-reduced-motion`で停止
  - `.shard-field` / `.shard`：MEIRA風の「散りばめる小物」をCSSのみの仮素材（三角形のグラデーション）で先行実装。
    `.shard--scattered`は`.reveal`のスクロール検知に相乗りし、散った状態→整列した状態にtransformする。
    Codexへの本番イラスト依頼は`GRAPHICS-BRIEF.md`の追加依頼セクション参照（届き次第、背景画像に差し替え予定）
  - `.section-head--impact` / `.big-number`：RYDEN風の巨大な背景数字。services.htmlの01〜03スライドに適用
  - about.htmlに`.rep-fun-card`（BikeBear風の遊びプロフィール）を追加。「つついてみる」ボタンで
    `avatar-kisa.png`⇄`avatar-kisa-speaking.png`を切り替えつつ一言コメントを表示（`initRepPoke()` in main.js）。
    プロフィール項目・コメント文言はClaudeによる仮ドラフトなので、founder確認の上で調整推奨
- **トップページのショーリール動画（2026-09-29・組み込み済み）**：15秒の動画（founderが別チャットで生成、
  GitHub `tsundoa/bonsaiwalker-legal` 経由で受け取り `assets/showreel/` に保存）を`index.html`のヒーローに
  `<video>`として追加。`js/main.js`の`initHeroVideo()`が、幅900px以下または`prefers-reduced-motion`のときは
  動画要素ごと削除して静止画（`hero-index.webp`）にフォールバックする（データ量・モーション配慮）。
  デスクトップでは`muted playsinline`で自動再生、ループなし（最後のフレームで静止＝動画の終盤が既存の
  静止ヒーロー画像と同じ構図になるよう作ってあるので、動画→静止画の切り替わりが破綻しにくい設計）。
  音声つきで見たい場合は別途手動再生の導線が必要（現状は自動再生の都合上ミュート固定）。
  `assets/showreel/`には最終フレームの`TKG_hero_1920x1080.png`/`.jpg`（TKGロゴ・タグラインが焼き込み済み）と
  `tkg-showreel.html`（生成時のブラウザ再生プレビュー）も参考として残してあるが、
  **これらの画像はロゴ・文字が画像に焼き込まれているため、サイトのポスター画像としては使っていない**
  （既存の`hero-index.webp`はテキストなしなので、HTML側の実文字と二重に文字が表示される心配がない）。
  この環境のブラウザ自動化ツールでは動画のデコード自体ができない制限があり（MDN公式サンプル動画でも
  再生不可）、実機での目視確認は未実施——ファイル自体はMP4コンテナとして正常（`file`コマンドで確認済み）で、
  `video.play()`もエラーなく成功しているので技術的には問題ないはずだが、founder側での実機確認を推奨。
- **スマホ専用の縦長ショーリール動画を追加（2026-09-29）**：`<video>`に`<source media="(max-width: 900px)">`で
  縦長版（`TKG_showreel_vertical_1080x1920_24fps.mp4`）を先に指定し、それ以外（PC）は横長版にフォールバック
  （ブラウザが自動で最初にマッチしたsourceを採用、両方ダウンロードすることはない）。posterもJS
  （`initHeroVideo()`）で幅に応じて動的に切り替え。縦長版の最終フレーム画像はロゴ・文字が焼き込まれていた
  ため、Pythonで下部の文字部分をクロップしてテキストなしのposter用画像
  （`assets/showreel/hero-vertical-poster.webp`）を作成——他の下層ページのモバイル画像（PC画像を中央付近で
  トリミングしただけ）とは違い、**こちらは動画自体が縦長で作られているので、クロップではなく本来の縦構図
  そのもの**。`.hero--index`のCSS変数（`--hero-image-mobile`）もこの新しいposter画像に差し替え済み
  （動画が読み込めない/`prefers-reduced-motion`時のフォールバックとして使われる）。
