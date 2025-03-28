# Khanteum India - Supabase 마이그레이션

이 프로젝트는 Khanteum India 애플리케이션의 데이터베이스를 Supabase로 마이그레이션하는 과정을 안내합니다.

## 개요

이 프로젝트는 비디오 공유 플랫폼으로, 다음과 같은 특징을 가집니다:

- 사용자 인증 (이메일/비밀번호 기반)
- 비디오 업로드 및 관리
- 비디오 조회 및 좋아요 기능

## 마이그레이션 가이드

Supabase로 마이그레이션하기 위해 다음 파일들을 참고하세요:

1. **supabase-account-guide.md**: Supabase 계정 생성 및 프로젝트 설정
2. **migration.sql**: 데이터베이스 스키마 마이그레이션 SQL
3. **migration-guide.md**: 마이그레이션 실행 과정 안내

## 데이터베이스 구조

마이그레이션 SQL은 다음과 같은 데이터베이스 구조를 생성합니다:

### 테이블

- **users**: 사용자 정보
- **videos**: 비디오 메타데이터
- **likes**: 비디오 좋아요 정보

### 스토리지 버킷

- **videos**: 실제 비디오 파일 저장
- **thumbnails**: 비디오 썸네일 이미지 저장

### 데이터베이스 함수

- **increment_view_count**: 비디오 조회수 증가
- **increment_like_count**: 비디오 좋아요 수 증가
- **decrement_like_count**: 비디오 좋아요 수 감소

## 환경 변수

마이그레이션 후에는 다음 환경 변수를 업데이트해야 합니다:

```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 마이그레이션 이후 확인사항

1. 모든 테이블이 정상적으로 생성되었는지 확인
2. 스토리지 버킷이 정상적으로 생성되었는지 확인
3. 인증 설정이 올바른지 확인
4. RLS(Row Level Security) 정책이 정상적으로 적용되었는지 확인

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase 인증 가이드](https://supabase.com/docs/guides/auth)
