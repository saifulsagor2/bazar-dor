
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface AuthActionsProps {
  user: {
    name: string;
    email: string;
  } | null;
}

export default function AuthActions({ user }: AuthActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        alert(error.message || "Logout করা যায়নি।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      alert("Logout করার সময় সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  // User is not logged in
  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50 sm:px-5 sm:text-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-800 sm:px-5 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // User is logged in
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      {/* User Information */}
      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold text-gray-800">
          {user.name}
        </p>

        <p className="text-xs text-gray-500">
          {user.email}
        </p>
      </div>

      {/* Profile Button */}
      <Link
        href="/profile"
        className="rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50 sm:px-5 sm:text-sm"
      >
        Profile
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-sm"
      >
        {loading ? "অপেক্ষা করুন..." : "Logout"}
      </button>
    </div>
  );
}
