import { supabase } from "../utils/supabaseClient";

/**
 * User information type definition
 */
export interface User {
  id: string;
  email: string;
  name?: string | null;
  profileImage?: string | null;
  createdAt: string;
}

/**
 * Authentication service object
 * - Signup, login, logout and user information management functions
 */
export const authService = {
  /**
   * Email duplication check function
   * @param email Email to check
   */
  checkEmailExists: async (
    email: string
  ): Promise<{ exists: boolean; error?: string }> => {
    try {
      // Check if email format is valid
      if (!email.includes("@")) {
        return {
          exists: false,
          error: "Please enter a valid email address.",
        };
      }

      // Search for email in users table
      const { data, error } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .limit(1);

      if (error) throw error;

      // If data exists, email already exists
      return { exists: data && data.length > 0 };
    } catch (error: unknown) {
      console.error("Email duplication check error:", error);
      return {
        exists: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while checking email.",
      };
    }
  },

  /**
   * Signup function
   * @param email User email
   * @param password User password
   * @param name User name (optional)
   */
  signup: async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Email format validation
      if (!email.includes("@")) {
        return {
          success: false,
          error: "Please enter a valid email address.",
        };
      }

      // Signup with email/password - set metadata
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split("@")[0], // Extract from email if name is not provided
          },
        },
      });

      if (error) {
        console.log("Signup error:", error.message);
        throw error;
      }

      // Try login immediately after successful signup
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { success: true };
    } catch (error: unknown) {
      console.error("Signup error:", error);

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during signup.",
      };
    }
  },

  /**
   * Login function
   * @param email User email
   * @param password User password
   */
  login: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      // Basic login attempt
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (!data.user) throw new Error("User information not found");

      // Convert user information format
      const user: User = {
        id: data.user.id,
        email: data.user.email || "",
        name:
          data.user.user_metadata.name || data.user.email?.split("@")[0] || "",
        profileImage: data.user.user_metadata.profile_image,
        createdAt: data.user.created_at,
      };

      return { success: true, user };
    } catch (error: unknown) {
      console.error("Login error:", error);

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during login.",
      };
    }
  },

  /**
   * Logout function
   */
  logout: async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error: unknown) {
      console.error("Logout error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during logout.",
      };
    }
  },

  /**
   * Get current authenticated user information
   */
  getCurrentUser: async (): Promise<{ user: User | null; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;
      if (!data.user) return { user: null };

      const user: User = {
        id: data.user.id,
        email: data.user.email || "",
        name:
          data.user.user_metadata?.name ||
          data.user.email?.split("@")[0] ||
          "User",
        profileImage: data.user.user_metadata?.profile_image,
        createdAt: data.user.created_at,
      };

      return { user };
    } catch (error: unknown) {
      console.error("User info lookup error:", error);
      return {
        user: null,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while retrieving user information.",
      };
    }
  },

  /**
   * Authentication check
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const { data } = await supabase.auth.getSession();
      return !!data.session;
    } catch (error) {
      console.error("Authentication check error:", error);
      return false;
    }
  },

  /**
   * Password change function
   * @param currentPassword Current password
   * @param newPassword New password
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check current user session
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;
      if (!sessionData.session)
        throw new Error("Login session has expired. Please login again.");

      // Re-authenticate with current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: sessionData.session.user.email || "",
        password: currentPassword,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          throw new Error("Current password is incorrect.");
        }
        throw signInError;
      }

      // Change password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      return { success: true };
    } catch (error: unknown) {
      console.error("Password change error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while changing password.",
      };
    }
  },
};
