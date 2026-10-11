
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface EditProfileFormProps {
  currentName: string;
}

export default function EditProfileForm({
  currentName,
}: EditProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (trimmedName === currentName) {
      toast.error("নতুন কোনো নাম দেওয়া হয়নি।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "Profile আপডেট করা যায়নি।");
        return;
      }

      toast.success("Profile সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>

        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim() || name.trim() === currentName}
        className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
