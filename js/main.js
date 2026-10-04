// 株式会社TKG コーポレートサイト — 共通スクリプト
//
// 演出はすべて「あれば効く・なくても読める」作りにしてある。
// - JSが動かない環境：<html>に.jsクラスが付かないので、全要素が最初から表示される
// - prefers-reduced-motion：スクロール連動・カーソル・オープニングを止め、完成状態を静止表示

var REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// スクロール位置に応じて毎フレーム呼ぶ処理の置き場（rAFは全体で1本だけ回す）
var scrollTasks = [];

document.addEventListener("DOMContentLoaded", function () {
  initLoader();
  initNav();
  initHeader();
  initReveal();
  initManifesto();
  initMarquee();
  initParallax();
  initSideIndex();
  initScrollProgress();
  initCursor();
  initMagnetic();
  initSvcPreview();
  initHeroCanvas();
  initHeroVideo();
  initFaqAccordion();
  initRepPoke();
  startScrollLoop();
});

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// ---- スクロール連動処理のループ ----
// スクロール位置が変わったフレームだけ scrollTasks を実行する。
function startScrollLoop() {
  if (!scrollTasks.length) return;
  var lastY = -1;
  var lastH = -1;

  function frame() {
    var y = window.scrollY;
    var h = window.innerHeight;
    if (y !== lastY || h !== lastH) {
      for (var i = 0; i < scrollTasks.length; i++) scrollTasks[i](y, h, y - lastY);
      lastY = y;
      lastH = h;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ---- オープニング（画面が殻のように割れて開く・1セッション1回） ----
function initLoader() {
  var root = document.documentElement;
  var loader = document.querySelector(".loader");
  if (!loader || !root.classList.contains("is-loading")) {
    root.classList.remove("is-loading");
    return;
  }

  try { sessionStorage.setItem("tkg-opened", "1"); } catch (e) {}

  // ひびが走りきってから（CSS側：0.5s待ち＋0.9s）上下に割る
  setTimeout(function () {
    loader.classList.add("is-open");
    setTimeout(function () {
      root.classList.remove("is-loading");
    }, 1150);
  }, 1500);
}

// ---- 全画面メニューの開閉 ----
function initNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  // 現在のページに印をつける
  var here = location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a").forEach(function (link) {
    if (link.getAttribute("href") === here) link.setAttribute("aria-current", "page");
  });
}

// ---- ヘッダー：下スクロールで隠れ、上スクロールで戻る ----
function initHeader() {
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  if (!header) return;

  scrollTasks.push(function (y, h, dy) {
    header.classList.toggle("is-scrolled", y > 40);
    if (nav && nav.classList.contains("is-open")) return;
    if (y < 200 || dy < -4) header.classList.remove("is-hidden");
    else if (dy > 4) header.classList.add("is-hidden");
  });
}

// ---- スクロールで画面に入った要素の出現 ----
function initReveal() {
  var targets = document.querySelectorAll(".reveal, .lines");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      // 同時に入ってきた要素は少しずつずらして出す
      var order = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add("is-visible"); }, order * 90);
        order++;
        observer.unobserve(el);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
  );

  targets.forEach(function (el) { observer.observe(el); });
}

// ---- マニフェスト：スクロールの進み具合で殻が割れる ----
// セクションが画面に固定されている間の進行度 p（0〜1）を、
//   --crack ひびが走る → --open 殻が開く → --glow 光が広がる → --body 本文が現れる
// の4つの値に割り振ってCSSに渡す。実際の変形はすべてCSS側で行う。
function initManifesto() {
  var section = document.querySelector(".manifesto");
  if (!section) return;

  // 光の筋を放射状に生成
  var rays = section.querySelector(".egg-rays");
  if (rays) {
    var NS = "http://www.w3.org/2000/svg";
    for (var i = 0; i < 14; i++) {
      var a = (-170 + i * (160 / 13)) * (Math.PI / 180);
      var r1 = 120 + (i % 3) * 14;
      var r2 = 230 + (i % 4) * 34;
      var line = document.createElementNS(NS, "line");
      line.setAttribute("x1", (200 + Math.cos(a) * r1).toFixed(1));
      line.setAttribute("y1", (262 + Math.sin(a) * r1).toFixed(1));
      line.setAttribute("x2", (200 + Math.cos(a) * r2).toFixed(1));
      line.setAttribute("y2", (262 + Math.sin(a) * r2).toFixed(1));
      line.setAttribute("pathLength", "1");
      rays.appendChild(line);
    }
  }

  if (REDUCE_MOTION) return;

  section.classList.add("is-scrub");
  var style = section.style;

  scrollTasks.push(function (y, h) {
    var rect = section.getBoundingClientRect();
    var total = rect.height - h;
    if (total <= 0) return;
    var p = clamp01(-rect.top / total);

    style.setProperty("--crack", clamp01(p / 0.3).toFixed(3));
    style.setProperty("--open", clamp01((p - 0.3) / 0.36).toFixed(3));
    style.setProperty("--glow", clamp01((p - 0.38) / 0.4).toFixed(3));
    style.setProperty("--body", clamp01((p - 0.56) / 0.2).toFixed(3));
  });
}

// ---- 巨大な流れる文字（スクロールの勢いで加速する） ----
function initMarquee() {
  var rows = document.querySelectorAll("[data-marquee]");
  if (!rows.length) return;

  var items = [];
  rows.forEach(function (row) {
    var group = row.querySelector(".gm-group");
    if (!group) return;
    // 画面幅を埋めて切れ目なくループするよう、中身を複製する
    for (var i = 0; i < 3; i++) row.appendChild(group.cloneNode(true));
    items.push({ row: row, group: group, dir: parseFloat(row.dataset.marquee) || -1, x: 0 });
  });

  if (REDUCE_MOTION) return;

  var boost = 0;
  var lastY = window.scrollY;
  var lastT = performance.now();

  function frame(t) {
    var dt = Math.min(50, t - lastT);
    lastT = t;
    var y = window.scrollY;
    boost += Math.abs(y - lastY) * 0.5;
    boost *= 0.9;
    lastY = y;

    items.forEach(function (it) {
      var w = it.group.offsetWidth;
      if (!w) return;
      it.x += it.dir * (dt * 0.05 + boost * 0.12);
      if (it.x <= -w) it.x += w;
      if (it.x > 0) it.x -= w;
      it.row.style.transform = "translate3d(" + it.x.toFixed(1) + "px,0,0)";
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ---- パララックス（破片・背景などをスクロール量に応じてずらす） ----
function initParallax() {
  if (REDUCE_MOTION) return;

  var els = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var bands = Array.prototype.slice.call(document.querySelectorAll(".cta-band"));
  if (!els.length && !bands.length) return;

  scrollTasks.push(function (y, h) {
    els.forEach(function (el) {
      var rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > h + 200) return;
      var dist = rect.top + rect.height / 2 - h / 2;
      el.style.translate = "0 " + (dist * parseFloat(el.dataset.parallax)).toFixed(1) + "px";
      // data-rot：画面を通り過ぎる間にゆっくり回る角度（度）
      if (el.dataset.rot) {
        el.style.rotate = ((dist / h) * parseFloat(el.dataset.rot)).toFixed(2) + "deg";
      }
    });
    bands.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > h) return;
      el.style.setProperty("--par", ((rect.top / h) * -60).toFixed(1));
    });
  });
}

// ---- 右端の縦インデックス（今どのセクションにいるか） ----
function initSideIndex() {
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-index]"));
  if (sections.length < 2) return;

  var el = document.createElement("div");
  el.className = "side-index";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = '<span class="si-num"></span><i></i><span class="si-label"></span>';
  document.body.appendChild(el);
  var num = el.querySelector(".si-num");
  var label = el.querySelector(".si-label");
  var current = null;

  scrollTasks.push(function (y, h) {
    var active = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= h * 0.5) active = sections[i];
    }
    if (active === current) return;
    current = active;
    num.textContent = active.dataset.index;
    label.textContent = active.dataset.label;
  });
}

// ---- スクロール進捗バー ----
function initScrollProgress() {
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  scrollTasks.push(function (y, h) {
    var max = document.documentElement.scrollHeight - h;
    bar.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : "0");
  });
}

// ---- カスタムカーソル（マウス操作の端末だけ） ----
function initCursor() {
  if (!FINE_POINTER || REDUCE_MOTION) return;

  var ring = document.createElement("div");
  ring.className = "cursor";
  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var tx = 0, ty = 0, rx = 0, ry = 0;

  window.addEventListener("mousemove", function (e) {
    tx = e.clientX;
    ty = e.clientY;
    if (!ring.classList.contains("is-active")) {
      rx = tx;
      ry = ty;
      ring.classList.add("is-active");
      dot.classList.add("is-active");
    }
    dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";

    var target = e.target.closest ? e.target.closest("a, button, [data-cursor]") : null;
    var text = target && target.dataset.cursor ? target.dataset.cursor : "";
    ring.classList.toggle("is-link", !!target && !text);
    ring.classList.toggle("is-label", !!text);
    if (ring.textContent !== text) ring.textContent = text;
  });

  document.addEventListener("mouseleave", function () {
    ring.classList.remove("is-active");
    dot.classList.remove("is-active");
  });

  // 輪は少し遅れて追いかける
  (function follow() {
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
    requestAnimationFrame(follow);
  })();
}

// ---- マウスに吸い寄せられるボタン ----
function initMagnetic() {
  if (!FINE_POINTER || REDUCE_MOTION) return;

  document.querySelectorAll(".magnetic").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var rect = el.getBoundingClientRect();
      var x = (e.clientX - rect.left - rect.width / 2) * 0.28;
      var y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      el.style.translate = x.toFixed(1) + "px " + y.toFixed(1) + "px";
    });
    el.addEventListener("mouseleave", function () {
      el.style.translate = "";
    });
  });
}

// ---- 事業内容の行にマウスを乗せると、カーソルの近くにビジュアルが現れる ----
function initSvcPreview() {
  if (!FINE_POINTER || REDUCE_MOTION) return;

  var rows = document.querySelectorAll(".svc-row[data-preview]");
  if (!rows.length) return;

  var box = document.createElement("div");
  box.className = "svc-preview";
  box.setAttribute("aria-hidden", "true");
  var img = document.createElement("img");
  img.alt = "";
  box.appendChild(img);
  document.body.appendChild(box);

  var tx = 0, ty = 0, x = 0, y = 0, running = false;

  function follow() {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    box.style.translate = x.toFixed(1) + "px " + y.toFixed(1) + "px";
    if (box.classList.contains("is-active") || Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
      requestAnimationFrame(follow);
    } else {
      running = false;
    }
  }

  rows.forEach(function (row) {
    // 先読みしておき、初回ホバーで画像が遅れて出るのを防ぐ
    new Image().src = row.dataset.preview;

    row.addEventListener("mouseenter", function (e) {
      img.src = row.dataset.preview;
      if (!box.classList.contains("is-active")) {
        x = tx = e.clientX;
        y = ty = e.clientY;
      }
      box.classList.add("is-active");
      if (!running) {
        running = true;
        requestAnimationFrame(follow);
      }
    });
    row.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
    });
    row.addEventListener("mouseleave", function () {
      box.classList.remove("is-active");
    });
  });
}

// ---- トップページのショーリール動画（PC＝横長・スマホ＝縦長を自動選択、自動再生1回きり） ----
function initHeroVideo() {
  var section = document.querySelector(".hero--index");
  var video = document.querySelector(".hero-video");
  if (!section || !video) return;

  if (REDUCE_MOTION) {
    video.remove();
    return;
  }

  var isMobile = window.matchMedia("(max-width: 900px)").matches;
  video.poster = isMobile
    ? "assets/showreel/hero-vertical-poster.webp"
    : "assets/hero-index.webp";

  // オープニング演出がある回は、殻が開くタイミングに合わせて再生を始める
  var delay = document.documentElement.classList.contains("is-loading") ? 1500 : 0;
  setTimeout(function () {
    video.play().catch(function () {
      /* 自動再生がブロックされた場合はposter画像のまま静止表示になる */
    });
  }, delay);
}

// ---- FAQアコーディオン ----
function initFaqAccordion() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      items.forEach(function (other) {
        other.classList.remove("is-open");
        var otherQuestion = other.querySelector(".faq-question");
        var otherAnswer = other.querySelector(".faq-answer");
        if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.maxHeight = "";
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// ---- 代表プロフィールの「つついてみる」遊び ----
function initRepPoke() {
  var btn = document.getElementById("rep-poke");
  var line = document.getElementById("rep-poke-line");
  var avatar = document.getElementById("rep-avatar-img");
  if (!btn || !line) return;

  var quips = [
    "今日も殻、破っていきましょう。",
    "困りごとは、遠慮なくどうぞ。",
    "卵かけご飯は、白米が9割説を推してます。",
    "TKG＝Task Kisa Guild、ご存知でしたか？",
    "つついてくれてありがとうございます。"
  ];
  var index = 0;
  var speaking = false;

  btn.addEventListener("click", function () {
    line.textContent = "「" + quips[index % quips.length] + "」";
    index++;
    if (avatar) {
      speaking = !speaking;
      avatar.src = speaking ? "assets/avatar-kisa-speaking.png" : "assets/avatar-kisa.png";
    }
  });
}

// ---- 背景ギミック（金の結線パーティクル）。画面に見えている間だけ描画する ----
function initHeroCanvas() {
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width, height, points;
  var visible = false;
  var running = false;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.min(90, Math.max(18, Math.round((width * height) / 26000)));
    points = [];
    for (var i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    points.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    var maxDist = 160;
    ctx.lineWidth = 1;
    for (var i = 0; i < points.length; i++) {
      for (var j = i + 1; j < points.length; j++) {
        var a = points[i], b = points[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.strokeStyle = "rgba(242, 182, 50, " + (0.22 * (1 - dist / maxDist)).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = "rgba(255, 214, 107, 0.8)";
    points.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (visible && !REDUCE_MOTION) requestAnimationFrame(step);
    else running = false;
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(step);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); start(); }, 150);
  });

  resize();

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
    }).observe(canvas);
  } else {
    visible = true;
    start();
  }
}
