# TKG グラフィック納品 / 2026-09-27

初稿一式。サイトへの組み込みはClaude側で行う前提です。

## ファイル

| 用途 | ファイル | 仕様 |
|---|---|---|
| メインロゴ | logo-mark.svg | ネイビー単色、288×100 viewBox、背景透過 |
| 白抜きロゴ | logo-mark-white.svg | 白単色、背景透過 |
| favicon | favicon.svg | 64×64 viewBox、ネイビー地＋黄色のT |
| 代表アバター | avatar-kisa.png | 透過PNG、通常の笑顔 |
| 会話用アバター | avatar-kisa-speaking.png | 透過PNG、説明中の表情 |
| 対象別アイコン | icon-corporate.svg / icon-individual.svg / icon-lancer.svg | 64×64、線幅2.5、丸端、ネイビー単色 |
| 事業アイコン | icon-consulting.svg / icon-spotwork.svg / icon-network.svg / icon-online.svg | 上記と同じ仕様 |
| SNSシェア | ogp.png | 1200×630、PNG、背景不透明 |
| 実績用仮画像 | works-placeholder-01.png ～ 03.png | 960×540、抽象グラフィック |
| 編集用原稿 | ogp.svg / works-placeholder-01.svg ～ 03.svg | PNGの編集用。文字には閲覧環境のフォントが必要 |
| 確認用 | graphics-preview.png / graphics-preview.html | 一覧画像・全素材の確認ページ |

## デザイン

TKGのワードマークは独自の幾何学形状をSVGパスで制作。文字の端と丸いピリオドで、信頼感と親しみを両立しました。faviconは小サイズでも読み取れるTに簡略化。アイコンは同じ線幅・丸端・余白を共有しています。OGPの重なる四角と接点は相談者とTKGの接点を表します。

## アバターの扱い

本人の写真・外見情報が未提供のため、木佐祐久氏の似顔絵ではなく、代表・相談窓口用の仮キャラクターです。代表紹介に掲載する際は「代表イメージイラスト」と説明し、本人の外見を再現したものとして扱わないでください。将来のチャットでは「木佐社長AI」と明示してください。生成方法は内蔵image_gen。使用プロンプトは GENERATION-PROMPTS.md に記録しています。

## 組み込み例

```html
<!-- ヘッダーの既存 .logo の内容を置換。footerは白抜き版 -->
<a href="index.html" class="logo" aria-label="株式会社TKG トップページ">
  <img src="assets/logo-mark.svg" alt="株式会社TKG" width="104" height="36">
</a>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">

<!-- 隣に同じ意味の見出しがあるカード内では装飾画像とする -->
<img src="assets/icon-corporate.svg" alt="" width="64" height="64">

<img src="assets/avatar-kisa.png" alt="代表イメージイラスト" width="320" height="320">
```

OGPの `og:image` / `twitter:image` は公開先が決まり次第、ogp.png の絶対HTTPS URLを設定してください。`og:image:width` は1200、`og:image:height` は630、`twitter:card` は `summary_large_image`。実績用仮画像は実案件の写真ではありません。事例の本文・顧客名・成果数値を伴う実績としての掲載は、実際の事例が用意できてから行ってください。

ロゴは幅86px以上を推奨し、周囲にはロゴ高さの約1/4の余白を確保してください。通常のアイコンは48～64pxで表示します。SVGをimgで表示した場合は外側CSSのcolorは引き継がないため、黄色が必要ならSVGのstrokeを #f2b632 に変更した別ファイルを作成してください。アバターは正方形の余白込みで配置し、円形にする場合も顔が切れないよう確認してください。

参考URL（依頼書指定）：https://www.ryden.co.jp/ 、https://www.bikebear.com.my/web-design/ 、https://yourbana.com/ 。素材の転用はしていません。
