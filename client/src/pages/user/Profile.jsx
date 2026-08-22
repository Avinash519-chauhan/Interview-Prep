import {
  FiArrowLeft,
  FiCamera,
  FiLock,
  FiMail,
  FiPhone,
  FiSave,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Header */}

        <button className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <FiArrowLeft />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-400">
            Account Settings
          </p>

          <h1 className="mt-1 text-3xl font-bold">My Profile</h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-slate-800 bg-indigo-600 text-4xl font-bold">
                  U
                </div>

                <label className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-slate-900 bg-indigo-600 hover:bg-indigo-500">
                  <FiCamera size={17} />

                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <h2 className="mt-5 text-xl font-bold">User Name</h2>

              <p className="mt-1 text-sm text-slate-500">user@example.com</p>
            </div>
          </div>

          {/* Form */}

          <form className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-2">
            <h2 className="mb-6 text-lg font-semibold">Personal Information</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Full Name */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Email
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Phone
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  New Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="password"
                    name="password"
                    placeholder="Leave blank to keep current"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}

            <div className="mt-4">
              <label className="mb-2 block text-sm text-slate-300">Bio</label>

              <textarea
                name="bio"
                rows="4"
                placeholder="Tell us about yourself..."
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold hover:bg-indigo-500"
              >
                <FiSave size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Delete */}

        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-red-400">Delete Account</h2>

            <p className="mt-1 text-sm text-slate-500">
              Permanently delete your account and data.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10"
          >
            <FiTrash2 />
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
