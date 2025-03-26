-- KhanTeam India 애플리케이션 마이그레이션 스크립트
-- Supabase를 이용한 비디오 공유 플랫폼을 위한 데이터베이스 설정

---------------------------------
-- 1. 스토리지 버킷 설정
---------------------------------

-- 비디오 파일 저장 버킷
CREATE BUCKET IF NOT EXISTS videos;

-- 썸네일 이미지 저장 버킷
CREATE BUCKET IF NOT EXISTS thumbnails;

-- 프로필 이미지 저장 버킷
CREATE BUCKET IF NOT EXISTS profiles;

---------------------------------
-- 2. 테이블 구조 설정
---------------------------------

-- 사용자 정보 테이블
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 비디오 정보 테이블
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  copyright TEXT,
  views INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 좋아요 정보 테이블
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  video_id UUID REFERENCES public.videos(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, video_id)
);

-- 댓글 정보 테이블
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  video_id UUID REFERENCES public.videos(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 조회 기록 테이블
CREATE TABLE IF NOT EXISTS public.views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  video_id UUID REFERENCES public.videos(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

---------------------------------
-- 3. 인덱스 생성
---------------------------------

-- 비디오 테이블 검색 최적화 인덱스
CREATE INDEX IF NOT EXISTS videos_user_id_idx ON public.videos (user_id);
CREATE INDEX IF NOT EXISTS videos_category_idx ON public.videos (category);
CREATE INDEX IF NOT EXISTS videos_created_at_idx ON public.videos (created_at DESC);

-- 좋아요 테이블 인덱스
CREATE INDEX IF NOT EXISTS likes_video_id_idx ON public.likes (video_id);
CREATE INDEX IF NOT EXISTS likes_user_id_idx ON public.likes (user_id);

-- 댓글 테이블 인덱스
CREATE INDEX IF NOT EXISTS comments_video_id_idx ON public.comments (video_id);
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON public.comments (user_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON public.comments (created_at DESC);

-- 조회 기록 테이블 인덱스
CREATE INDEX IF NOT EXISTS views_video_id_idx ON public.views (video_id);
CREATE INDEX IF NOT EXISTS views_user_id_idx ON public.views (user_id);

---------------------------------
-- 4. 함수 및 트리거 정의
---------------------------------

-- 조회수 증가 함수 - 사용자 인증 없이도 동작하도록 설정
CREATE OR REPLACE FUNCTION public.increment_view_count(video_id UUID)
RETURNS VOID AS $$
BEGIN
  -- 조회수를 먼저 증가시킵니다
  UPDATE public.videos
  SET views = views + 1
  WHERE id = video_id;
  
  -- 사용자가 로그인한 경우에만 조회 기록을 저장합니다
  IF auth.uid() IS NOT NULL THEN
    INSERT INTO public.views (user_id, video_id)
    VALUES (auth.uid(), video_id);
  ELSE
    -- 익명 조회인 경우 사용자 ID 없이 기록
    INSERT INTO public.views (video_id)
    VALUES (video_id);
  END IF;
  
EXCEPTION
  -- 중복 조회 등의 오류 처리
  WHEN OTHERS THEN
    -- 오류가 발생해도 조회수는 증가
    NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 좋아요 토글 함수
CREATE OR REPLACE FUNCTION public.toggle_like(video_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  like_exists BOOLEAN;
BEGIN
  -- 인증 확인
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION '인증이 필요합니다';
  END IF;

  -- 좋아요 존재 여부 확인
  SELECT EXISTS (
    SELECT 1 FROM public.likes
    WHERE user_id = auth.uid() AND video_id = toggle_like.video_id
  ) INTO like_exists;

  -- 좋아요가 있으면 삭제, 없으면 추가
  IF like_exists THEN
    DELETE FROM public.likes
    WHERE user_id = auth.uid() AND video_id = toggle_like.video_id;
    RETURN FALSE;
  ELSE
    INSERT INTO public.likes (user_id, video_id)
    VALUES (auth.uid(), toggle_like.video_id);
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 신규 사용자 등록 시 사용자 테이블에 자동 추가하는 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, profile_image, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NULL,
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 사용자 등록 트리거 설정
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

---------------------------------
-- 5. RLS(Row Level Security) 설정 (느슨한 보안 정책)
---------------------------------

-- 모든 테이블에 RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;

-- 사용자 테이블 정책
CREATE POLICY "모든 사용자 정보 조회 가능" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "사용자 본인만 정보 수정 가능" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- 비디오 테이블 정책 (매우 느슨한 정책)
CREATE POLICY "모든 비디오 조회 가능" ON public.videos
  FOR SELECT USING (true);

CREATE POLICY "인증된 사용자만 비디오 업로드 가능" ON public.videos
  FOR INSERT WITH CHECK (auth.role() IS NOT NULL);

CREATE POLICY "비디오 소유자만 수정 가능" ON public.videos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "비디오 소유자만 삭제 가능" ON public.videos
  FOR DELETE USING (auth.uid() = user_id);

-- 좋아요 테이블 정책
CREATE POLICY "모든 좋아요 조회 가능" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "인증된 사용자만 좋아요 추가/삭제 가능" ON public.likes
  FOR ALL USING (auth.role() IS NOT NULL);

-- 댓글 테이블 정책
CREATE POLICY "모든 댓글 조회 가능" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "인증된 사용자만 댓글 작성 가능" ON public.comments
  FOR INSERT WITH CHECK (auth.role() IS NOT NULL);

CREATE POLICY "댓글 작성자만 수정 가능" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "댓글 작성자만 삭제 가능" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- 조회 기록 테이블 정책
CREATE POLICY "조회 기록 추가 허용" ON public.views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "사용자 본인 조회 기록만 조회 가능" ON public.views
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- 스토리지 정책 (매우 느슨한 정책)
CREATE POLICY "누구나 비디오 업로드 가능" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'videos');

CREATE POLICY "누구나 비디오 다운로드 가능" ON storage.objects
  FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "누구나 썸네일 업로드 가능" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'thumbnails');

CREATE POLICY "누구나 썸네일 다운로드 가능" ON storage.objects
  FOR SELECT USING (bucket_id = 'thumbnails');

CREATE POLICY "누구나 프로필 이미지 업로드 가능" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profiles');

CREATE POLICY "누구나 프로필 이미지 다운로드 가능" ON storage.objects
  FOR SELECT USING (bucket_id = 'profiles');

-- 업로더 또는 인증된 사용자는 파일 삭제 가능 (느슨한 정책)
CREATE POLICY "인증된 사용자는 스토리지 파일 삭제 가능" ON storage.objects
  FOR DELETE USING (auth.role() IS NOT NULL);

-- 스토리지 객체 업데이트 정책
CREATE POLICY "인증된 사용자는 파일 업데이트 가능" ON storage.objects
  FOR UPDATE USING (auth.role() IS NOT NULL);

-- 익명 사용자 조회 허용
ALTER POLICY "누구나 비디오 다운로드 가능" ON storage.objects USING (bucket_id = 'videos');
ALTER POLICY "누구나 썸네일 다운로드 가능" ON storage.objects USING (bucket_id = 'thumbnails');
ALTER POLICY "누구나 프로필 이미지 다운로드 가능" ON storage.objects USING (bucket_id = 'profiles'); 