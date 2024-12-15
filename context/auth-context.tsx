import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { supabase } from "~/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  submitted_verification: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  submitted_verification: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Separate effect for verification status
  useEffect(() => {
    const fetchUserVerification = async () => {
      if (!session?.user.id) {
        setVerificationSubmitted(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("verification")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // No rows returned
          console.error("Error fetching verification:", error);
          return;
        }

        setVerificationSubmitted(!!data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setVerificationSubmitted(false);
      }
    };

    fetchUserVerification();
  }, [session]); // Re-run when session changes

  const value: AuthContextType = {
    session,
    user: session?.user ?? null,
    submitted_verification: verificationSubmitted,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
