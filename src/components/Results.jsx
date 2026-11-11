import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FiSearch,
  FiCopy,
  FiExternalLink,
  FiDownload,
} from "react-icons/fi";
import Analytics from "./Analytics";

function Results({ data, darkMode }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const filteredUsers = data.notFollowingBack
    .filter((user) =>
      user.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );

  const exportCSV = () => {
    const csv = "Username\n" + data.notFollowingBack.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "instagram-unfollowers.csv";
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success("CSV exported successfully 🚀");
  };

  const copyUsername = (user) => {
    navigator.clipboard.writeText(user);
    toast.success(`Copied @${user}`);
  };

  const panel = darkMode
    ? "border-white/[0.07] bg-[#11111c] text-slate-100"
    : "border-black/[0.05] bg-white text-[#242033]";
  const muted = darkMode ? "text-slate-400" : "text-[#858194]";
  const input = darkMode
    ? "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-violet-300/50"
    : "border-black/[0.07] bg-white text-[#242033] placeholder:text-slate-400 focus:border-violet-300";

  const stats = [
    { title: "Not following back", value: data.notFollowingBack.length, desc: "People you follow", mark: "01", accent: "text-fuchsia-400" },
    { title: "Fans", value: data.fans.length, desc: "Follow you only", mark: "02", accent: "text-violet-400" },
    { title: "Mutuals", value: data.mutuals.length, desc: "Follow each other", mark: "03", accent: "text-sky-400" },
    { title: "Connections", value: data.mutuals.length + data.fans.length, desc: "Your total followers", mark: "04", accent: "text-emerald-400" },
  ];

  return (
    <div className="mt-8 md:mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${darkMode ? "text-violet-300" : "text-violet-600"}`}>Your overview</p>
          <h2 className={`mt-2 text-2xl font-semibold tracking-tight md:text-3xl ${darkMode ? "text-white" : "text-[#242033]"}`}>The connection report</h2>
        </div>
        <span className={`hidden rounded-full border px-3 py-1.5 text-xs sm:inline-flex ${darkMode ? "border-white/10 text-slate-400" : "border-black/[0.06] text-slate-500"}`}>Instagram insights</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.mark}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -3 }}
            className={`relative overflow-hidden rounded-2xl border p-5 md:p-6 ${panel}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold tracking-[0.18em] ${muted}`}>{item.mark} / 04</span>
              <span className={`h-2 w-2 rounded-full ${item.accent.replace("text-", "bg-")}`} />
            </div>
            <p className={`mt-5 text-sm font-medium ${muted}`}>{item.title}</p>
            <h3 className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{item.value.toLocaleString()}</h3>
            <p className={`mt-2 text-xs ${muted}`}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${darkMode ? "text-fuchsia-300" : "text-fuchsia-600"}`}>A closer look</p>
          <h2 className={`mt-2 text-2xl font-semibold tracking-tight md:text-3xl ${darkMode ? "text-white" : "text-[#242033]"}`}>People not following back</h2>
          <p className={`mt-1 text-sm ${muted}`}>{filteredUsers.length} {filteredUsers.length === 1 ? "account" : "accounts"} found</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-300 px-5 py-3 text-sm font-semibold text-[#201a30] shadow-lg shadow-violet-500/10 transition-all hover:-translate-y-0.5 hover:bg-violet-200"
        >
          <FiDownload /> Export CSV
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
        <div className="relative">
          <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${muted}`} />
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-violet-400/20 ${input}`}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={`rounded-xl border px-4 py-3.5 text-sm outline-none transition-colors ${input}`}
        >
          <option value="asc">Username: A – Z</option>
          <option value="desc">Username: Z – A</option>
        </select>
      </div>

      <div className={`mt-4 overflow-hidden rounded-2xl border p-3 md:p-4 ${panel}`}>
        {filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl">✳</div>
            <h3 className="mt-4 text-lg font-semibold">{search ? "No matching accounts" : "All clear!"}</h3>
            <p className={`mt-2 text-sm ${muted}`}>{search ? "Try a different username." : "There are no accounts in this list."}</p>
          </div>
        ) : (
          filteredUsers.map((user, index) => (
            <motion.div
              key={user}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.2) }}
              className={`mb-2 flex flex-col gap-4 rounded-xl border p-4 transition-colors last:mb-0 sm:flex-row sm:items-center sm:justify-between ${darkMode ? "border-white/[0.05] bg-white/[0.025] hover:bg-white/[0.05]" : "border-black/[0.04] bg-[#faf9fc] hover:bg-violet-50/60"}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-fuchsia-400 via-violet-500 to-indigo-400 p-[1.5px] shadow-lg shadow-violet-500/10">
                  <div className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-full ${darkMode ? "bg-[#171522]" : "bg-[#f4efff]"}`}>
                    <span className="select-none text-sm font-bold tracking-wide text-violet-300">
                      {user.replace(/^@/, "").slice(0, 2).toUpperCase()}
                    </span>
                    <img
                      src={`https://unavatar.io/instagram/${encodeURIComponent(user.replace(/^@/, ""))}`}
                      alt={`@${user} profile picture`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full rounded-full bg-transparent object-cover"
                      onError={(event) => {
                        event.currentTarget.remove();
                      }}
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">@{user}</h3>
                  <p className={`mt-1 text-xs ${muted}`}>Instagram account</p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => copyUsername(user)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${darkMode ? "border-white/10 text-slate-300 hover:bg-white/10" : "border-black/[0.07] text-slate-600 hover:bg-white"}`}
                >
                  <FiCopy /> Copy
                </button>
                <a
                  href={`https://instagram.com/${user}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#29213f] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-800"
                >
                  <FiExternalLink /> View profile
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Analytics data={data} darkMode={darkMode} />

      <p className={`mt-4 text-center text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
        Profile image lookup by{" "}
        <a
          href="https://unavatar.io"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-violet-400"
        >
          Unavatar
        </a>
      </p>
    </div>
  );
}

export default Results;
