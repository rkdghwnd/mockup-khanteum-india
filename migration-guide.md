# Supabase 마이그레이션 가이드

이 문서는 Khanteum India 프로젝트의 데이터베이스 구조를 Supabase 계정으로 마이그레이션하는 방법을 설명합니다.

## 사전 요구사항

- Supabase 계정
- Supabase 프로젝트 생성 완료

## 마이그레이션 프로세스

### 1. Supabase SQL 에디터 접속하기

1. Supabase 대시보드에 로그인합니다.
2. 해당 프로젝트를 선택합니다.
3. 왼쪽 메뉴에서 "SQL Editor"를 클릭합니다.
4. "New Query"를 클릭하여 새 SQL 쿼리를 생성합니다.

### 2. 마이그레이션 SQL 실행하기

1. `migration.sql` 파일의 내용을 SQL 에디터에 복사합니다.
2. SQL 쿼리를 실행합니다(Run 버튼 클릭).
3. 실행 결과를 확인하고 모든 테이블과 정책이 올바르게 생성되었는지 확인합니다.

### 3. 스토리지 확인하기

1. 왼쪽 메뉴에서 "Storage"를 클릭합니다.
2. `videos`와 `thumbnails` 버킷이 올바르게 생성되었는지 확인합니다.
3. 각 버킷의 권한 설정이 올바른지 확인합니다.

### 4. 애플리케이션 환경 변수 업데이트

프로젝트의 `.env` 파일에 올바른 Supabase URL과 anon key를 설정합니다:

```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. API 설정 확인

1. 왼쪽 메뉴에서 "API"를 클릭합니다.
2. "Project API keys" 섹션에서 `anon` 키와 `URL`이 환경 변수에 설정한 값과 일치하는지 확인합니다.

## 데이터베이스 구조

이 프로젝트는 다음 테이블을 사용합니다:

1. **users** - 사용자 정보 저장

   - `id`: UUID (사용자 ID)
   - `email`: TEXT (이메일 주소)
   - `name`: TEXT (사용자 이름)
   - `profile_image`: TEXT (프로필 이미지 URL)
   - `created_at`: TIMESTAMP (생성 시간)

2. **videos** - 비디오 정보 저장

   - `id`: UUID (비디오 ID)
   - `title`: TEXT (제목)
   - `description`: TEXT (설명)
   - `category`: TEXT (카테고리)
   - `user_id`: UUID (업로더 ID)
   - `video_url`: TEXT (비디오 URL)
   - `thumbnail_url`: TEXT (썸네일 URL)
   - `copyright`: TEXT (저작권 정보)
   - `views`: INT (조회수)
   - `likes`: INT (좋아요 수)
   - `created_at`: TIMESTAMP (업로드 시간)

3. **likes** - 좋아요 정보 저장
   - `id`: UUID (좋아요 ID)
   - `user_id`: UUID (사용자 ID)
   - `video_id`: UUID (비디오 ID)
   - `created_at`: TIMESTAMP (좋아요 시간)

## 스토리지 구조

1. **videos** - 비디오 파일 저장
2. **thumbnails** - 썸네일 이미지 저장

## RPC 함수

1. **increment_view_count** - 비디오 조회수 증가
2. **increment_like_count** - 비디오 좋아요 수 증가
3. **decrement_like_count** - 비디오 좋아요 수 감소

## 문제 해결

마이그레이션 과정에서 문제가 발생한 경우:

1. SQL 오류 메시지를 확인합니다
2. 테이블이 이미 존재하는지 확인합니다 (`IF NOT EXISTS` 구문으로 대부분 방지됨)
3. 올바른 권한으로 실행 중인지 확인합니다
