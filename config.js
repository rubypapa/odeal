// ODEAL 연동 키. 여기 값만 채우면 로그인과 저장이 살아난다.
// ★공개돼도 되는 값만 둔다. REST API 키·service_role 키·시크릿은 절대 여기 두지 않는다.
window.ODEAL = {
  // Supabase (프로젝트 리전은 반드시 Seoul). Settings > API 에서 복사
  SUPABASE_URL: "",        // 예: https://xxxxxxxx.supabase.co
  SUPABASE_ANON: "",       // anon public 키. 공개용이라 브라우저에 둬도 된다

  // 구글 OAuth 클라이언트 ID (웹 애플리케이션). 이것도 공개값이다
  GOOGLE_CLIENT_ID: "",    // 예: 1234-abcd.apps.googleusercontent.com
};
