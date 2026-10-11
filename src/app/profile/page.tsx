
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Container from "@/components/ui/Container";
import EditProfileForm from "../../components/profile/EditProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if user is not logged in
  if (!session) {
    redirect("/signin");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mx-auto max-w-2xl">

          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your BazarDor account information.
            </p>
          </div>

          {/* Profile Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Profile Header */}
            <div className="bg-green-700 px-6 py-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-green-700">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <h2 className="mt-4 text-xl font-bold text-white">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-green-100">
                BazarDor Member
              </p>
            </div>

            {/* Account Information */}
            <div className="space-y-5 p-6">

              <h3 className="border-b border-gray-100 pb-3 text-lg font-semibold text-gray-900">
                Account Information
              </h3>

              {/* Email */}
              <div>
                <p className="text-sm text-gray-500">
                  Email Address
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              {/* Email Verification */}
              <div>
                <p className="text-sm text-gray-500">
                  Email Verification
                </p>

                <p className="mt-1 font-medium">
                  {user.emailVerified ? (
                    <span className="text-green-600">
                      Verified
                    </span>
                  ) : (
                    <span className="text-orange-600">
                      Not Verified
                    </span>
                  )}
                </p>
              </div>

              {/* Member Since */}
              <div>
                <p className="text-sm text-gray-500">
                  Member Since
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(new Date(user.createdAt))}
                </p>
              </div>

              {/* Edit Profile */}
              <div className="border-t border-gray-100 pt-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Edit Profile
                </h3>

                <EditProfileForm currentName={user.name} />
              </div>

            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
