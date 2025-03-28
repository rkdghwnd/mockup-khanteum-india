# Supabase 계정 생성 및 프로젝트 설정 가이드

이 가이드는 Supabase 계정 생성 및 프로젝트 설정 방법을 안내합니다.

## 1. Supabase 계정 생성

1. [Supabase 공식 사이트](https://supabase.com)에 접속합니다.
2. 우측 상단의 "Sign Up" 버튼을 클릭합니다.
3. GitHub 계정으로 가입하거나 이메일과 비밀번호를 입력하여 계정을 생성합니다.
4. 이메일 인증을 완료합니다.

## 2. 새 프로젝트 생성

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인합니다.
2. "New Project" 버튼을 클릭합니다.
3. 조직(Organization)이 없다면 먼저 조직을 생성합니다.
4. 프로젝트 설정:
   - **Name**: 프로젝트 이름 입력 (예: "khanteum-india")
   - **Database Password**: 안전한 비밀번호 생성 (나중에 필요할 수 있으므로 저장)
   - **Region**: 서비스 대상 지역에 가까운 리전 선택 (예: Asia Northeast)
   - **Pricing Plan**: Free Tier 선택
5. "Create new project" 버튼을 클릭합니다.

## 3. 프로젝트 설정 확인

프로젝트 생성이 완료되면 다음 정보를 확인합니다:

1. 프로젝트 URL (예: https://[project-id].supabase.co)
2. API Key - Project API keys 페이지에서 확인:
   - **anon/public**: 클라이언트에서 사용
   - **service_role**: 서버 측에서만 사용 (공개하면 안 됨)

## 4. 인증 설정

1. 왼쪽 메뉴에서 "Authentication" → "Providers"로 이동합니다.
2. 기본적으로 이메일 인증이 활성화되어 있습니다.
3. 이메일 확인 필요 여부 설정:
   - 개발 중에는 "Confirm email" 체크를 해제하여 이메일 확인 없이 회원가입 가능
   - 운영 환경에서는 체크하여 보안 강화

## 5. 환경 변수 설정

프로젝트의 `.env` 파일에 Supabase 연결 정보를 설정합니다:

```
VITE_SUPABASE_URL=https://[your-project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

## 6. 데이터베이스 마이그레이션 준비

1. 왼쪽 메뉴에서 "SQL Editor"로 이동합니다.
2. "New Query"를 클릭하여 새 쿼리 창을 엽니다.
3. 여기에 `migration.sql` 파일의 내용을 붙여넣고 실행할 준비를 합니다.

이제 'migration-guide.md' 파일의 지침에 따라 데이터베이스 마이그레이션을 진행할 수 있습니다.
