import { User as supabaseUser } from "@supabase/supabase-js";

export type User = supabaseUser;
export interface useAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (formData: FormData) => Promise<{ error?: string } | undefined>;
  signup: (formData: FormData) => Promise<{ error?: string } | undefined>;
  logout: () => Promise<void>;
  userDelete: () => Promise<void>;
  handleResendEmail: () => Promise<void>;
  isResending: boolean;
  resendMessage: string | null;
}
