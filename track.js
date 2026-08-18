// ODEAL 전환 추적. 메타(페이스북·인스타)와 구글(검색·유튜브·GA4)을 한 곳에서 다룬다.
//
// ★설계 규칙 셋
//  1. config.js에 ID가 비어 있으면 ★아무것도 로드하지 않는다. 광고를 안 켠 상태에서 스크립트만 붙어
//     이용자 정보가 남 서버로 나가는 일이 없게 한다.
//  2. 결제 완료(Purchase)는 브라우저와 서버가 ★둘 다 보낸다. 브라우저 쪽은 광고차단·iOS 추적거부로
//     20~40%가 날아가서, 서버 전송이 없으면 전환을 과소 집계한다.
//     대신 같은 event_id를 붙여 메타가 중복을 걷어내게 한다(48시간 내 같은 id·같은 이벤트명이면 한 건으로 침).
//  3. event_id는 주문번호를 그대로 쓴다. 주문 하나 = 결제 하나라 자연스러운 유일값이다.
(function () {
  var C = (window.ODEAL && window.ODEAL.TRACK) || {};
  var T = { on: false, meta: false, google: false };
  window.ODEAL_TRACK = T;

  // ── 메타 픽셀 ─────────────────────────────────────────────
  if (C.META_PIXEL) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', C.META_PIXEL);
    T.meta = true;
  }

  // ── 구글 태그 (GA4 + 구글애즈 · 유튜브 광고도 여기로 잡힌다) ──
  var gids = [C.GA4, C.GADS].filter(Boolean);
  if (gids.length) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gids[0]);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    gids.forEach(function (id) { window.gtag('config', id); });
    T.google = true;
  }

  T.on = T.meta || T.google;

  // ── 공통 헬퍼 ────────────────────────────────────────────
  function fb(name, params, eventId) {
    if (!T.meta) return;
    window.fbq('track', name, params || {}, eventId ? { eventID: eventId } : undefined);
  }
  function gt(name, params) {
    if (!T.google) return;
    window.gtag('event', name, params || {});
  }

  // 로그인한 사람의 이메일·전화를 넘기면 매칭률이 오른다(향상된 전환).
  // ★해싱은 구글·메타가 각자 알아서 한다. 우리가 원문을 보관하지 않는다.
  T.identify = function (u) {
    if (!u) return;
    if (T.google) {
      var ud = {};
      if (u.email) ud.email = String(u.email).trim().toLowerCase();
      if (u.phone) ud.phone_number = u.phone;   // E.164(+8210…) 형태여야 한다
      if (Object.keys(ud).length) window.gtag('set', 'user_data', ud);
    }
    if (T.meta && u.email) {
      window.fbq('init', C.META_PIXEL, { em: String(u.email).trim().toLowerCase() });
    }
  };

  T.view = function () { fb('PageView'); };

  T.signup = function () {
    fb('CompleteRegistration');
    gt('sign_up', { method: 'social' });
  };

  T.beginCheckout = function (o) {
    fb('InitiateCheckout', { value: o.value, currency: 'KRW' }, o.orderId);
    gt('begin_checkout', { value: o.value, currency: 'KRW', transaction_id: o.orderId });
  };

  // ★결제 완료. 서버(pay-confirm)도 같은 event_id로 메타에 보낸다.
  T.purchase = function (o) {
    fb('Purchase', { value: o.value, currency: 'KRW' }, o.orderId);
    gt('purchase', { value: o.value, currency: 'KRW', transaction_id: o.orderId });
    // 구글애즈 전환은 별도 라벨이 있어야 어떤 전환인지 정해진다
    if (T.google && C.GADS && C.GADS_PURCHASE_LABEL) {
      window.gtag('event', 'conversion', {
        send_to: C.GADS + '/' + C.GADS_PURCHASE_LABEL,
        value: o.value, currency: 'KRW', transaction_id: o.orderId,
      });
    }
  };

  if (T.on) T.view();
})();
