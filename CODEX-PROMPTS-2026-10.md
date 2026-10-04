# Codex向け 画像生成プロンプト（2026-10 リデザイン用・全16点）

全面リデザイン（README.md「全面リデザイン（2026-10-04）」）で必要になった追加画像の依頼書。
1見出し＝1画像。各見出しの下のコードブロックが、その画像のプロンプト全文（そのまま貼れる）。

## 共通ルール

- 保存先：`C:\AI\TKG-Website\assets\`（このリポジトリの中。てまほどき側には置かない）
- ファイル名：各見出しのとおり。PNGで保存（WebP変換とサイトへの組み込みはClaude側で行う）
- スタイルの参照画像：`assets/hero-index.png`（シリーズ共通の質感）。編集対象ではなく、質感の参照としてだけ使う
- 文字・ロゴ・UI・透かしは画像に入れない
- 実在の人物・実在の企業・実際の案件に見えるものは描かない
- 納品後、実際の寸法と透過の有無を `assets/ASSET-CHECK.json` に追記する

---

## A. 浮遊する小物（8点・最優先）

ページのあちこちに浮かべ、スクロールに合わせて奥行きをつけて動かす小物。
**背景が透過していることが最重要。** 透過PNGが出せない場合は、背景を完全な黒 `#000000` のベタにする
（床・影・光のにじみ・粒子を物体の外に出さない）。その場合はClaude側で切り抜く。

### A-1. `float-shell-01.png`（大きな殻の破片）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 70% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI matching the supplied reference image's material quality (reference is for STYLE only, do not copy its composition). OBJECT: one large curved fragment of a broken eggshell, seen at a three-quarter angle so both faces are visible. The outer face is glossy obsidian-black porcelain with a very fine gold kintsugi hairline; the inner face is matte warm ivory with subtle chalky texture. The broken edge is thick, irregular and crisp, showing the ivory cross-section. Soft warm golden key light from the upper left, gentle rim light on the edge. Sharp focus across the whole object.
```

### A-2. `float-shell-02.png`（小さな尖った破片）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 60% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI matching the supplied reference image's material quality (reference is for STYLE only). OBJECT: one small sharp triangular shard of broken eggshell, tumbling in mid-air, tilted so the matte warm ivory inner face is mostly visible and a sliver of the glossy obsidian-black outer face shows along one side. Thick crisp fractured edges. Soft warm golden light from the upper left. Sharp focus.
```

### A-3. `float-shell-03.png`（お椀のような半分の殻）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 70% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI matching the supplied reference image's material quality (reference is for STYLE only). OBJECT: the lower half of a cracked eggshell, like a small cup, floating and tilted about 20 degrees toward the viewer so the empty interior is visible. Glossy obsidian-black outside with two fine gold kintsugi hairlines, matte warm ivory inside, jagged irregular broken rim. The interior is softly lit with warm gold light but EMPTY: no yolk, no liquid, no light orb. Sharp focus.
```

### A-4. `float-yolk.png`（卵黄）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 60% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI. OBJECT: one glossy raw egg yolk floating weightlessly as a slightly flattened sphere, rich amber-gold #f2b632 to deep orange, with a taut wet surface and one clean soft highlight from the upper left. Appetizing and luminous, like a jewel. No egg white, no shell, no bowl, no rice, no plate. Sharp focus.
```

### A-5. `float-drop.png`（金の雫）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 55% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI. OBJECT: one elongated droplet of molten liquid gold caught in mid-air, with a rounded heavy bottom and a thin tapering tail pointing up and slightly to the right. Mirror-polished warm gold #f2b632 surface with soft dark reflections and one bright highlight. Sharp focus.
```

### A-6. `float-prism-01.png`（ガラスの結晶・大）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 65% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI matching the faceted glass prisms in the supplied reference image (STYLE only). OBJECT: one elongated faceted crystal prism of clear smoky glass, like a double-pointed gem, tilted diagonally. Crisp facets, thin bright edges, warm gold light refracting inside, faint amber tint. No blue or cyan tint. Sharp focus.
```

### A-7. `float-prism-02.png`（ガラスの結晶・小）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 50% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI matching the faceted glass prisms in the supplied reference image (STYLE only). OBJECT: one small flat triangular shard of clear glass, like a thin faceted arrowhead, rotated so one broad face catches a warm gold reflection. Thin bright bevelled edges, faint amber tint, no blue or cyan. Sharp focus.
```

### A-8. `float-bead.png`（金の珠）

```
Use case: website decorative floating object. Output PNG 1024x1024 with TRANSPARENT background (alpha channel). If transparency is not possible, use a flat pure black #000000 background with nothing else in it. A SINGLE isolated object, centered, filling about 45% of the frame, fully inside the frame with clear margin on all sides. No ground, no floor, no cast shadow, no reflection, no particles, no glow or haze spilling outside the object, no text, no logo, no watermark. Premium cinematic photorealistic 3D CGI. OBJECT: one perfect sphere of polished warm gold #f2b632, like the small gold beads floating in the supplied reference image. Mirror surface with soft dark navy reflections and a single bright highlight from the upper left. Sharp focus.
```

---

## B.「三つの入口」用の画像（3点）

トップページの3枚の扉パネルの背景。パネルは縦長にも横長にも切り取られるので正方形で作り、
主役は中央やや上、下40%は文字を載せるために暗く静かにする。

### B-1. `door-corporate.png`（法人のお客様）

```
Use case: website panel BACKGROUND artwork, not a screenshot or mockup. Output PNG 1536x1536, square. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only, do not copy its composition): near-black midnight navy #05080f background, luminous warm golden yellow #f2b632 light, ivory eggshell interiors, obsidian shell exteriors, fine gold particles, sparse smoky glass shards. No cyan or electric blue. Dark exposure, controlled gold highlights. Main subject in the center, slightly above the middle, staying fully visible if the image is cropped to a tall 3:4 strip or to a wide 3:2 strip. The bottom 40% must be dark, calm and nearly empty for white text overlay; dark corners. No letters, logo, UI, charts, arrows, business icons, people or silhouettes, buildings, watermarks. SCENE — FOR COMPANIES: a large cracked obsidian egg-shaped shell stands upright like a monument, and from the opening in its side a precise architectural lattice of straight golden light beams rises and assembles into an orderly three-dimensional framework, like the structure of an organization being put in order. Around its base lie a few loosened tangled dark filaments that have been left behind. Confident, structured, dependable.
```

### B-2. `door-individual.png`（個人のお客様）

```
Use case: website panel BACKGROUND artwork, not a screenshot or mockup. Output PNG 1536x1536, square. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only, do not copy its composition): near-black midnight navy #05080f background, luminous warm golden yellow #f2b632 light, ivory eggshell interiors, obsidian shell exteriors, fine gold particles, sparse smoky glass shards. No cyan or electric blue. Dark exposure, controlled gold highlights. Main subject in the center, slightly above the middle, staying fully visible if the image is cropped to a tall 3:4 strip or to a wide 3:2 strip. The bottom 40% must be dark, calm and nearly empty for white text overlay; dark corners. No letters, logo, UI, charts, arrows, business icons, people or silhouettes, hands, watermarks. SCENE — FOR INDIVIDUALS: one small egg-shaped obsidian shell, intimate in scale, with a single clean crack running down its front; a narrow warm beam of golden light escapes through the crack like light through a door left ajar, and one tiny shell fragment has just lifted away beside it. Quiet, personal, reassuring — a small worry beginning to open. Much calmer than the reference, with a soft pool of gold light on the dark ground beneath the shell.
```

### B-3. `door-lancer.png`（登録をご希望の方）

```
Use case: website panel BACKGROUND artwork, not a screenshot or mockup. Output PNG 1536x1536, square. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only, do not copy its composition): near-black midnight navy #05080f background, luminous warm golden yellow #f2b632 light, ivory eggshell interiors, obsidian shell exteriors, fine gold particles, sparse smoky glass shards. No cyan or electric blue. Dark exposure, controlled gold highlights. Main subject in the center, slightly above the middle, staying fully visible if the image is cropped to a tall 3:4 strip or to a wide 3:2 strip. The bottom 40% must be dark, calm and nearly empty for white text overlay; dark corners. No letters, logo, UI, charts, arrows, business icons, people or silhouettes, watermarks. SCENE — JOINING THE GUILD: five small open eggshell halves of different sizes float in a loose ring, each holding its own small golden light, and thin luminous gold filaments connect the lights into a constellation-like network with one brighter node at the center. Independent individuals joining a shared network. Balanced, hopeful, gently dynamic.
```

---

## C. 事業01〜03のビジュアル（3点）

事業内容ページの各ブロックに置く画像。正方形、主役は中央、四辺は背景色 `#05080f` に溶かす
（明るい面にも黒い額装で置くため、縁に明るい要素を残さない）。

### C-1. `svc-01-consulting.png`（経営・業務コンサルティング）

```
Use case: website feature artwork, not a screenshot or mockup. Output PNG 1536x1536, square. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only): near-black midnight navy #05080f, luminous warm golden yellow #f2b632, ivory and obsidian eggshell, fine gold particles, sparse glass shards. No cyan or electric blue. Dark exposure, controlled highlights. Subject centered, occupying about 60% of the frame; all four edges fade completely into flat #05080f with no bright elements touching the border. No letters, logo, UI, charts, arrows, icons, people, watermarks. SCENE — CONSULTING: a dense knot of dark tangled metallic threads hangs on the left side of an upright cracked egg-shaped shell; the threads pass through the shell's glowing golden core and come out the other side as a neat fan of straight, evenly spaced golden lines. A problem being untangled and put in order. Calm, precise, intelligent.
```

### C-2. `svc-02-spotwork.png`（スポット業務委託）

```
Use case: website feature artwork, not a screenshot or mockup. Output PNG 1536x1536, square. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only): near-black midnight navy #05080f, luminous warm golden yellow #f2b632, ivory and obsidian eggshell, fine gold particles, sparse glass shards. No cyan or electric blue. Dark exposure, controlled highlights. Subject centered, occupying about 60% of the frame; all four edges fade completely into flat #05080f with no bright elements touching the border. No letters, logo, UI, charts, arrows, icons, people, hands, watermarks. SCENE — SPOT WORK: an obsidian egg-shaped shell with one piece missing from its surface, and a single glowing golden fragment of exactly the matching shape floating a short distance away, moving into place to complete it. A thin trail of gold particles marks its path. Exactly the piece that was needed, exactly when it was needed. Quick, light, precise.
```

### C-3. `svc-03-network.png`（個人事業主ネットワーク）

```
Use case: website feature artwork, not a screenshot or mockup. Output PNG 1536x1536, square. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only): near-black midnight navy #05080f, luminous warm golden yellow #f2b632, ivory and obsidian eggshell, fine gold particles, sparse glass shards. No cyan or electric blue. Dark exposure, controlled highlights. Subject centered, occupying about 65% of the frame; all four edges fade completely into flat #05080f with no bright elements touching the border. No letters, logo, UI, charts, arrows, icons, people, watermarks. SCENE — NETWORK: seven small egg-shaped shells of varied sizes, each slightly cracked with a golden glow inside, suspended in space at different depths and linked by fine golden filaments into a three-dimensional web; where filaments cross, small gold beads shine. Skills and projects being connected. Spacious, orderly, quietly alive.
```

---

## D. 代表のビジュアル（1点）

### D-1. `avatar-kisa-portrait.png`

既存の `assets/avatar-kisa.png` と **同じ架空のキャラクター** を、大きく描き込んだ縦長版にする。
実在の木佐氏の外見を再現するものではない（サイト上でも「代表イメージイラスト」と明記して掲載する）。

```
Use case: website portrait illustration. Output PNG 1600x2000, portrait 4:5. Use the supplied avatar image as the CHARACTER reference: keep the same fictional character — same face, hairstyle, friendly calm expression, navy suit, white open-collar shirt and small gold lapel pin — and the same clean flat illustration style with confident ink outlines. This is an invented brand character, not a depiction of any real person. Redraw him larger and with more craft as a waist-up portrait, body turned slightly to the left, face toward the viewer, arms relaxed. Background: deep navy #0f1e3d with a very subtle large egg-shaped outline in slightly lighter navy behind his shoulders and a few tiny gold dots. Limited palette: navy, ivory, warm gold #f2b632. Head in the upper third, generous space above the hair, nothing important within 6% of any edge. No text, no logo, no watermark, no photographic realism.
```

---

## E. OGP画像の背景（1点）

### E-1. `ogp-bg.png`

SNSで共有されたときの画像。文字とロゴはClaude側で合成するので、背景だけを作る。

```
Use case: social sharing card BACKGROUND, not a screenshot or mockup. Output PNG 2400x1260 (exact 1200x630 ratio), landscape. Premium cinematic photorealistic 3D CGI in the exact same visual family as the supplied reference image (STYLE reference only): near-black midnight navy #05080f, luminous warm golden yellow #f2b632, ivory and obsidian eggshell, fine gold particles, sparse glass shards. No cyan or electric blue. Dark exposure, controlled highlights. COMPOSITION: one majestic cracked egg-shaped obsidian shell breaking open with a radiant golden core, placed on the right, centered at about 72% across and middle height, fully inside the frame. The left 55% of the image is dark, calm and nearly empty so a logo and a headline can be placed there. Keep every important detail at least 8% away from all edges, because some platforms crop the card. No letters, no logo, no UI, no watermark, no food.
```
