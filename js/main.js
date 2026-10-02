// 株式会社TKG コーポレートサイト — 共通スクリプト

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initLoadReveal();
  initScrollReveal();
  initHeroCanvas();
  initSlideScroll();
  initFaqAccordion();
  initRepPoke();
  initHeroVideo();
});

// ---- トップページのショーリール動画（PC＝横長・スマホ＝縦長を自動選択、自動再生1回きり） ----
function initHeroVideo() {
  var section = document.querySelector(".hero--index");
  var video = document.querySelector(".hero-video");
  if (!section || !video) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.remove();
    return;
  }

  var isMobile = window.matchMedia("(max-width: 900px)").matches;
  video.poster = isMobile
    ? "assets/showreel/hero-vertical-poster.webp"
    : "assets/hero-index.webp";

  section.classList.add("has-video");
  video.play().catch(function () {
    /* 自動再生がブロックされた場合はposter画像のまま静止表示になる */
  });
}

// ---- ヒーローなど、初回表示時にそのまま見せる要素の演出 ----
function initLoadReveal() {
  var targets = document.querySelectorAll(".reveal-load");
  requestAnimationFrame(function () {
    targets.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add("is-visible");
      }, i * 110);
    });
  });
}

// ---- モバイルナビの開閉 ----
function initNavToggle() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- スクロールで画面に入った要素の出現 ----
function initScrollReveal() {
  var targets = document.querySelectorAll(".reveal:not(.reveal-load)");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add("is-visible");
          }, i * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach(function (el) { observer.observe(el); });
}

// ---- 1ジェスチャー＝1スライドのフルページスクロール ----
// CSSのscroll-snapだけだと、スマホの強いスワイプで途中のスライドを
// 飛び越えてしまうため（scroll-snap-stopが実機で効かないケースがある）、
// スクロール自体をJSで1段ずつ動かして確実に止める。
function initSlideScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var mobileQuery = window.matchMedia("(max-width: 900px)");
  var slides = [];
  var current = 0;
  var animating = false;
  var wheelAccum = 0;
  var touchStartY = 0;
  var unlockTimer;

  function collectSlides() {
    var selector = mobileQuery.matches
      ? ".hero, .audience .section-head, .audience-card, .services .section-head, .service-item, .snap-section:not(.hero):not(.audience):not(.services)"
      : ".snap-section";
    slides = Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function nearestIndex() {
    var best = 0;
    var bestDist = Infinity;
    slides.forEach(function (el, i) {
      var dist = Math.abs(el.getBoundingClientRect().top);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }

  function unlock() {
    animating = false;
  }

  function goTo(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    if (!slides[index]) return;
    current = index;
    animating = true;
    slides[index].scrollIntoView({ behavior: "smooth", block: "start" });
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlock, 650);
  }

  collectSlides();
  if (slides.length < 2) return;
  current = nearestIndex();

  window.addEventListener("resize", function () {
    collectSlides();
    current = nearestIndex();
  });

  window.addEventListener(
    "wheel",
    function (e) {
      if (!slides.length) return;
      e.preventDefault();
      if (animating) return;
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) > 40) {
        goTo(current + (wheelAccum > 0 ? 1 : -1));
        wheelAccum = 0;
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches.length !== 1) return;
      e.preventDefault();
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    function (e) {
      if (animating || e.changedTouches.length !== 1) return;
      var dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        goTo(current + (dy > 0 ? 1 : -1));
      }
    },
    { passive: true }
  );
}

// ---- FAQアコーディオン ----
function initFaqAccordion() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      items.forEach(function (other) {
        other.classList.remove("is-open");
        var otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = "";
      });

      if (!isOpen) {
        item.classList.add("is-open");
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
    line.textContent = quips[index % quips.length];
    index++;
    if (avatar) {
      speaking = !speaking;
      avatar.src = speaking ? "assets/avatar-kisa-speaking.png" : "assets/avatar-kisa.png";
    }
  });
}

// ---- ヒーローの背景ギミック（結線パーティクル） ----
function initHeroCanvas() {
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width, height, points;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.max(18, Math.round((width * height) / 42000));
    points = [];
    for (var i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
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

    for (var i = 0; i < points.length; i++) {
      for (var j = i + 1; j < points.length; j++) {
        var a = points[i], b = points[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var maxDist = 150;
        if (dist < maxDist) {
          ctx.strokeStyle = "rgba(242, 182, 50, " + (0.16 * (1 - dist / maxDist)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    points.forEach(function (p) {
      ctx.fillStyle = "rgba(242, 182, 50, 0.65)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(step);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  step();
}
