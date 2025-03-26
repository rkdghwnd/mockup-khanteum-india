import { supabase } from "../utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";

/**
 * 데이터베이스에서 불러온 비디오 데이터 형식
 */
interface VideoData {
  id: string;
  title: string;
  description: string;
  category: string;
  user_id: string;
  users?: {
    name: string | null;
  };
  video_url: string;
  thumbnail_url: string;
  copyright: string;
  views: number;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

/**
 * 클라이언트에서 사용하는 비디오 데이터 형식
 */
export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  userId: string;
  userName?: string | null;
  videoSrc: string;
  thumbnail: string;
  copyright: string;
  views: number;
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
  userHasLiked?: boolean;
}

/**
 * 댓글 데이터 형식
 */
export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string | null;
  userProfileImage: string | null;
  createdAt: string;
}

/**
 * 비디오 서비스 객체
 * - 비디오 목록 조회, 비디오 상세 조회, 비디오 업로드 기능 등
 */
export const videoService = {
  /**
   * 모든 비디오 목록 가져오기 (카테고리별 필터링 가능)
   * @param category 필터링할 카테고리 (선택 사항)
   */
  getAllVideos: async (
    category?: string
  ): Promise<{ videos: Video[]; error?: string }> => {
    try {
      // 기본 쿼리 생성
      let query = supabase.from("videos").select(`
        *,
        users(name, profile_image),
        likes_count:likes(count),
        comments_count:comments(count)
      `);

      // 카테고리가 있으면 필터링
      if (category && category !== "Official") {
        query = query.eq("category", category);
      }

      // 최신순으로 정렬
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;

      // 비디오 데이터 형식 변환
      const videos: Video[] = (data || []).map((item: VideoData) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        userId: item.user_id,
        userName: item.users?.name,
        videoSrc: item.video_url,
        thumbnail: item.thumbnail_url,
        copyright: item.copyright,
        views: item.views,
        createdAt: item.created_at,
        likesCount: item.likes_count || 0,
        commentsCount: item.comments_count || 0,
      }));

      return { videos };
    } catch (error: unknown) {
      console.error("비디오 목록 조회 오류:", error);
      // 느슨한 정책: 오류 발생 시 빈 배열 반환
      return { videos: [] };
    }
  },

  /**
   * 특정 비디오 상세 정보 가져오기
   * @param id 비디오 ID
   */
  getVideo: async (
    id: string
  ): Promise<{ video: Video | null; error?: string }> => {
    try {
      // 조회수 증가 (느슨한 정책: 오류 발생 시 무시)
      try {
        await supabase.rpc("increment_view_count", { video_id: id });
      } catch (viewError) {
        console.error("조회수 증가 오류:", viewError);
      }

      // 현재 로그인한 사용자 확인
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        // 느슨한 정책: 익명 로그인 시도
        const { data: anonData, error: anonError } =
          await supabase.auth.signInAnonymously();
        if (anonError) throw new Error("로그인이 필요합니다.");
        // 익명 사용자로 계속 진행
        if (anonData && anonData.user) {
          const updatedUserData = { ...userData, user: anonData.user };
          Object.assign(userData, updatedUserData);
        } else {
          // 느슨한 정책: 인증되지 않은 경우 빈 배열 반환
          return { video: null };
        }
      }

      if (!userData.user) {
        // 느슨한 정책: 인증되지 않은 경우 빈 배열 반환
        return { video: null };
      }

      // 비디오 상세 정보 조회
      const { data, error } = await supabase
        .from("videos")
        .select(
          `
          *,
          users(name, profile_image),
          likes_count:likes(count),
          comments_count:comments(count),
          user_has_liked:likes!inner(user_id)
        `
        )
        .eq("id", id)
        .eq(
          "likes.user_id",
          userData.user.id || "00000000-0000-0000-0000-000000000000"
        )
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // 좋아요 정보가 없는 경우 (not found)
          const { data: videoOnly, error: videoError } = await supabase
            .from("videos")
            .select(
              `
              *,
              users(name, profile_image),
              likes_count:likes(count),
              comments_count:comments(count)
            `
            )
            .eq("id", id)
            .single();

          if (videoError) throw videoError;
          if (!videoOnly) return { video: null };

          // 비디오 데이터 형식 변환
          const videoData = videoOnly as VideoData;
          const video: Video = {
            id: videoData.id,
            title: videoData.title,
            description: videoData.description,
            category: videoData.category,
            userId: videoData.user_id,
            userName: videoData.users?.name,
            videoSrc: videoData.video_url,
            thumbnail: videoData.thumbnail_url,
            copyright: videoData.copyright,
            views: videoData.views,
            createdAt: videoData.created_at,
            likesCount: videoData.likes_count || 0,
            commentsCount: videoData.comments_count || 0,
            userHasLiked: false,
          };

          return { video };
        }
        throw error;
      }

      if (!data) return { video: null };

      // 비디오 데이터 형식 변환
      const videoData = data as VideoData;
      const video: Video = {
        id: videoData.id,
        title: videoData.title,
        description: videoData.description,
        category: videoData.category,
        userId: videoData.user_id,
        userName: videoData.users?.name,
        videoSrc: videoData.video_url,
        thumbnail: videoData.thumbnail_url,
        copyright: videoData.copyright,
        views: videoData.views,
        createdAt: videoData.created_at,
        likesCount: videoData.likes_count || 0,
        commentsCount: videoData.comments_count || 0,
        userHasLiked: !!videoData.user_has_liked,
      };

      return { video };
    } catch (error: unknown) {
      console.error("비디오 상세 조회 오류:", error);
      return {
        video: null,
        error:
          error instanceof Error
            ? error.message
            : "비디오 정보를 가져오는 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 내 비디오 목록 가져오기
   */
  getMyVideos: async (): Promise<{ videos: Video[]; error?: string }> => {
    try {
      // 현재 로그인한 사용자 정보 가져오기
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        // 느슨한 정책: 인증 오류 시 빈 배열 반환
        console.error("인증 오류:", userError);
        return { videos: [] };
      }

      if (!userData.user) {
        // 느슨한 정책: 인증되지 않은 경우 빈 배열 반환
        return { videos: [] };
      }

      // 사용자의 비디오 목록 조회
      const { data, error } = await supabase
        .from("videos")
        .select(
          `
          *,
          users(name, profile_image),
          likes_count:likes(count),
          comments_count:comments(count)
        `
        )
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // 비디오 데이터 형식 변환
      const videos: Video[] = (data || []).map((item: VideoData) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        userId: item.user_id,
        userName: item.users?.name,
        videoSrc: item.video_url,
        thumbnail: item.thumbnail_url,
        copyright: item.copyright,
        views: item.views,
        createdAt: item.created_at,
        likesCount: item.likes_count || 0,
        commentsCount: item.comments_count || 0,
      }));

      return { videos };
    } catch (error: unknown) {
      console.error("내 비디오 목록 조회 오류:", error);
      // 느슨한 정책: 오류 발생 시 빈 배열 반환
      return { videos: [] };
    }
  },

  /**
   * 비디오 업로드
   * @param videoData 업로드할 비디오 데이터
   */
  uploadVideo: async (uploadData: {
    title: string;
    description: string;
    category: string;
    videoFile: File;
    thumbnailFile: File;
    copyright: string;
  }): Promise<{ success: boolean; video?: Video; error?: string }> => {
    try {
      // 현재 로그인한 사용자 확인
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        // 느슨한 정책: 익명 로그인 시도
        const { data: anonData, error: anonError } =
          await supabase.auth.signInAnonymously();
        if (anonError) throw new Error("로그인이 필요합니다.");
        // 익명 사용자로 계속 진행
        if (anonData && anonData.user) {
          const updatedUserData = { ...userData, user: anonData.user };
          Object.assign(userData, updatedUserData);
        } else {
          throw new Error("익명 로그인에 실패했습니다.");
        }
      }

      if (!userData.user) throw new Error("로그인이 필요합니다.");

      // 1. 썸네일 이미지 업로드
      const thumbnailFileName = `${uuidv4()}-${uploadData.thumbnailFile.name}`;
      const { error: thumbnailError } = await supabase.storage
        .from("thumbnails")
        .upload(thumbnailFileName, uploadData.thumbnailFile);

      if (thumbnailError) throw thumbnailError;

      // 썸네일 공개 URL 가져오기
      const { data: thumbnailData } = await supabase.storage
        .from("thumbnails")
        .getPublicUrl(thumbnailFileName);

      // 2. 비디오 파일 업로드
      const videoFileName = `${uuidv4()}-${uploadData.videoFile.name}`;
      const { error: videoError } = await supabase.storage
        .from("videos")
        .upload(videoFileName, uploadData.videoFile);

      if (videoError) throw videoError;

      // 비디오 공개 URL 가져오기
      const { data: videoUrlData } = await supabase.storage
        .from("videos")
        .getPublicUrl(videoFileName);

      // 3. 비디오 정보 데이터베이스에 저장
      const { data: insertData, error: insertError } = await supabase
        .from("videos")
        .insert({
          title: uploadData.title,
          description: uploadData.description,
          category: uploadData.category,
          user_id: userData.user.id,
          video_url: videoUrlData.publicUrl,
          thumbnail_url: thumbnailData.publicUrl,
          copyright: uploadData.copyright,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // 업로드 성공한 비디오 데이터 반환
      const video: Video = {
        id: insertData.id,
        title: insertData.title,
        description: insertData.description,
        category: insertData.category,
        userId: insertData.user_id,
        videoSrc: insertData.video_url,
        thumbnail: insertData.thumbnail_url,
        copyright: insertData.copyright,
        views: 0,
        createdAt: insertData.created_at,
        likesCount: 0,
        commentsCount: 0,
      };

      return { success: true, video };
    } catch (error: unknown) {
      console.error("비디오 업로드 오류:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "비디오 업로드 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 비디오 좋아요 토글
   * @param videoId 비디오 ID
   */
  toggleLike: async (
    videoId: string
  ): Promise<{ success: boolean; liked?: boolean; error?: string }> => {
    try {
      // 사용자 확인
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        // 느슨한 정책: 익명 로그인 시도
        const { data: anonData, error: anonError } =
          await supabase.auth.signInAnonymously();
        if (anonError) throw new Error("로그인이 필요합니다.");
        // 익명 사용자로 계속 진행
        if (anonData && anonData.user) {
          const updatedUserData = { ...userData, user: anonData.user };
          Object.assign(userData, updatedUserData);
        } else {
          throw new Error("익명 로그인에 실패했습니다.");
        }
      }

      if (!userData.user) throw new Error("로그인이 필요합니다.");

      // 좋아요 토글 함수 호출
      const { data, error } = await supabase.rpc("toggle_like", {
        video_id: videoId,
      });

      if (error) throw error;

      return { success: true, liked: data };
    } catch (error: unknown) {
      console.error("좋아요 토글 오류:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "좋아요 처리 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 비디오 댓글 목록 가져오기
   * @param videoId 비디오 ID
   */
  getComments: async (
    videoId: string
  ): Promise<{ comments: Comment[]; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
          *,
          users(name, profile_image)
        `
        )
        .eq("video_id", videoId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const comments: Comment[] = (data || []).map((item) => ({
        id: item.id,
        content: item.content,
        userId: item.user_id,
        userName: item.users?.name,
        userProfileImage: item.users?.profile_image,
        createdAt: item.created_at,
      }));

      return { comments };
    } catch (error: unknown) {
      console.error("댓글 조회 오류:", error);
      // 느슨한 정책: 오류 발생 시 빈 배열 반환
      return { comments: [] };
    }
  },

  /**
   * 댓글 작성
   * @param videoId 비디오 ID
   * @param content 댓글 내용
   */
  addComment: async (
    videoId: string,
    content: string
  ): Promise<{ success: boolean; comment?: Comment; error?: string }> => {
    try {
      // 사용자 확인
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        // 느슨한 정책: 익명 로그인 시도
        const { data: anonData, error: anonError } =
          await supabase.auth.signInAnonymously();
        if (anonError) throw new Error("로그인이 필요합니다.");
        // 익명 사용자로 계속 진행
        if (anonData && anonData.user) {
          const updatedUserData = { ...userData, user: anonData.user };
          Object.assign(userData, updatedUserData);
        } else {
          throw new Error("익명 로그인에 실패했습니다.");
        }
      }

      if (!userData.user) throw new Error("로그인이 필요합니다.");

      // 댓글 추가
      const { data, error } = await supabase
        .from("comments")
        .insert({
          video_id: videoId,
          user_id: userData.user.id,
          content,
        })
        .select(
          `
          *,
          users(name, profile_image)
        `
        )
        .single();

      if (error) throw error;

      const comment: Comment = {
        id: data.id,
        content: data.content,
        userId: data.user_id,
        userName: data.users?.name,
        userProfileImage: data.users?.profile_image,
        createdAt: data.created_at,
      };

      return { success: true, comment };
    } catch (error: unknown) {
      console.error("댓글 작성 오류:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "댓글 작성 중 오류가 발생했습니다.",
      };
    }
  },
};
