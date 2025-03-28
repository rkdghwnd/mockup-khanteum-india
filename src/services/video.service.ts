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
      let query = supabase.from("videos").select(`
        *,
        users(name, profile_image),
        likes_count:likes(count),
        comments_count:comments(count)
      `);

      if (category && category !== "Official") {
        query = query.eq("category", category);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;

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
      console.error("Error fetching video list:", error);
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
      try {
        await supabase.rpc("increment_view_count", { video_id: id });
      } catch (viewError) {
        console.error("Error incrementing view count:", viewError);
      }

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
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) return { video: null };

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
      };

      return { video };
    } catch (error: unknown) {
      console.error("Error fetching video details:", error);
      return {
        video: null,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while fetching video information.",
      };
    }
  },

  /**
   * 내 비디오 목록 가져오기
   */
  getMyVideos: async (): Promise<{ videos: Video[]; error?: string }> => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        console.error("Authentication error:", userError);
        return { videos: [] };
      }

      if (!userData.user) {
        return { videos: [] };
      }

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
      console.error("Error fetching my videos:", error);
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
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        throw new Error("로그인이 필요합니다");
      }

      // 썸네일 업로드
      const thumbnailFileName = `${uuidv4()}-${uploadData.thumbnailFile.name}`;
      const { error: thumbnailError } = await supabase.storage
        .from("thumbnails")
        .upload(thumbnailFileName, uploadData.thumbnailFile);

      if (thumbnailError) throw thumbnailError;

      const { data: thumbnailData } = await supabase.storage
        .from("thumbnails")
        .getPublicUrl(thumbnailFileName);

      // 비디오 업로드
      const videoFileName = `${uuidv4()}-${uploadData.videoFile.name}`;
      const { error: videoError } = await supabase.storage
        .from("videos")
        .upload(videoFileName, uploadData.videoFile);

      if (videoError) throw videoError;

      const { data: videoUrlData } = await supabase.storage
        .from("videos")
        .getPublicUrl(videoFileName);

      // 데이터베이스에 비디오 정보 저장
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
      console.error("Error uploading video:", error);
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
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        throw new Error("로그인이 필요합니다");
      }

      const { data, error } = await supabase.rpc("toggle_like", {
        video_id: videoId,
      });

      if (error) throw error;

      return { success: true, liked: data };
    } catch (error: unknown) {
      console.error("Error toggling like:", error);
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
      console.error("Error fetching comments:", error);
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
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        throw new Error("로그인이 필요합니다");
      }

      const { data: commentData, error: commentError } = await supabase
        .from("comments")
        .insert({
          user_id: userData.user.id,
          video_id: videoId,
          content,
        })
        .select(
          `
          *,
          users(name, profile_image)
        `
        )
        .single();

      if (commentError) throw commentError;

      const comment: Comment = {
        id: commentData.id,
        content: commentData.content,
        userId: commentData.user_id,
        userName: commentData.users?.name,
        userProfileImage: commentData.users?.profile_image,
        createdAt: commentData.created_at,
      };

      return { success: true, comment };
    } catch (error: unknown) {
      console.error("Error adding comment:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "댓글 작성 중 오류가 발생했습니다.",
      };
    }
  },

  /**
   * 내 비디오 삭제하기
   * @param videoId 삭제할 비디오 ID
   */
  deleteVideo: async (
    videoId: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        throw new Error("로그인이 필요합니다");
      }

      // 비디오 정보 가져오기
      const { data: videoData, error: videoError } = await supabase
        .from("videos")
        .select("*")
        .eq("id", videoId)
        .single();

      if (videoError) throw videoError;

      // 비디오 소유자 확인
      if (videoData.user_id !== userData.user.id) {
        throw new Error("자신이 업로드한 비디오만 삭제할 수 있습니다");
      }

      // 비디오 파일명 추출
      const videoFileName = videoData.video_url.split("/").pop();
      const thumbnailFileName = videoData.thumbnail_url.split("/").pop();

      // 비디오 레코드 삭제
      const { error: deleteError } = await supabase
        .from("videos")
        .delete()
        .eq("id", videoId);

      if (deleteError) throw deleteError;

      // 스토리지 파일 삭제 시도 (실패해도 계속 진행)
      try {
        await supabase.storage.from("videos").remove([videoFileName]);
      } catch (storageError) {
        console.error("비디오 파일 삭제 오류:", storageError);
      }

      try {
        await supabase.storage.from("thumbnails").remove([thumbnailFileName]);
      } catch (storageError) {
        console.error("썸네일 파일 삭제 오류:", storageError);
      }

      return { success: true };
    } catch (error: unknown) {
      console.error("Error deleting video:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "비디오 삭제 중 오류가 발생했습니다.",
      };
    }
  },
};
