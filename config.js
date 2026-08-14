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
};
