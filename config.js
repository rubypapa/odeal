// ODEAL 연동 키. ★공개돼도 되는 값만 둔다. secret 키·REST API 키는 절대 여기 두지 않는다.
// 카카오·구글 클라이언트 정보는 여기가 아니라 Supabase 대시보드(Authentication > Providers)에 넣는다.
window.ODEAL = {
  // Supabase (리전 = Northeast Asia / Seoul, ap-northeast-2)
  SUPABASE_URL: "https://rkzcclmcqnyzkyvmovft.supabase.co",
  SUPABASE_ANON: "sb_publishable_3jpxigblPdd5vhdv3nvmCQ_ZBs2nWle",

  // 토스페이먼츠 클라이언트 키. ★공개 키다(결제창을 띄우는 용도).
  // 시크릿 키는 여기 없다 — Supabase 함수 환경변수(PG_SECRET_KEY)에만 있다.
  // 지금 값 = 토스 공식 문서에 공개된 "문서용 테스트 키". 계약 후 라이브 키로 바꾼다.
  TOSS_CLIENT: "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",

  // 광고 전환 추적. ★비워두면 스크립트를 아예 로드하지 않는다(광고 안 켰는데 남 서버로 나가는 일 방지).
  // 여기 값은 전부 공개돼도 되는 식별자다. 서버 전송용 토큰은 함수 환경변수에만 둔다.
  TRACK: {
    META_PIXEL: "",           // 메타 픽셀 ID (예: 1234567890123456)
    GA4: "",                  // GA4 측정 ID (예: G-XXXXXXXXXX)
    GADS: "",                 // 구글애즈 전환 ID (예: AW-123456789) — 유튜브 광고도 여기로 잡힌다
    GADS_PURCHASE_LABEL: "",  // 구글애즈 '구매' 전환 라벨 (전환 ID와 짝이다. 없으면 어떤 전환인지 못 정한다)
  },
};
