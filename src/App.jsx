import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import FileUpload from "./components/FileUpload";
import Results from "./components/Results";

function App() {
  const [data, setData] = useState(null);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const readJSON = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(JSON.parse(e.target.result));
      };

      reader.readAsText(file);
    });
  };

  const analyzeData = (followers, following) => {
    const followerSet = new Set(
      followers
        .map(
          (item) =>
            item.string_list_data?.[0]?.value
        )
        .filter(Boolean)
    );

    const followingSet = new Set(
      following.relationships_following
        .map((item) => item.title)
        .filter(Boolean)
    );

    const notFollowingBack = [...followingSet].filter(
      (user) => !followerSet.has(user)
    );

    const fans = [...followerSet].filter(
      (user) => !followingSet.has(user)
    );

    const mutuals = [...followerSet].filter(
      (user) => followingSet.has(user)
    );

    return {
      notFollowingBack,
      fans,
      mutuals,
    };
  };

  const handleFiles = async (files) => {
    const followersFile = files.find((file) =>
      file.name.toLowerCase().includes(
        "followers"
      )
    );

    const followingFile = files.find((file) =>
      file.name.toLowerCase().includes(
        "following"
      )
    );

    if (!followersFile || !followingFile) {
      toast.error(
        "Upload both followers_1.json and following.json"
      );
      return;
    }

    try {
      const followers =
        await readJSON(followersFile);

      const following =
        await readJSON(followingFile);

      const result = analyzeData(
        followers,
        following
      );

      setData(result);

      toast.success(
        "Instagram data analyzed successfully 🚀"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to process Instagram files."
      );
    }
  };

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${darkMode
          ? "bg-[#09090f] text-slate-100"
          : "bg-[#f7f6fb] text-[#242033]"
        }`}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      {/* Background Glow */}

      <div
        className="
          fixed
          inset-0
          overflow-hidden
          pointer-events-none
          -z-10
        "
      >
        <div
          className="
            absolute
            top-20
            left-10
            w-72
            h-72
            rounded-full
            bg-fuchsia-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-20
            right-10
            w-72
            h-72
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />
      </div>

      {/* Navbar */}

      <nav
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode
            ? "bg-[#10101a]/85 border-white/[0.07]"
            : "bg-white/75 border-black/[0.06]"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-[15px] bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 opacity-25 blur-md" />
              <svg
                viewBox="0 0 48 48"
                role="img"
                aria-label="InstaInsights logo"
                className="relative h-11 w-11 drop-shadow-lg"
                fill="none"
              >
                <defs>
                  <linearGradient id="insightLogoGradient" x1="5" y1="4" x2="43" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0ABFC" />
                    <stop offset=".52" stopColor="#A78BFA" />
                    <stop offset="1" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="42" height="42" rx="14" fill="#171322" stroke="url(#insightLogoGradient)" strokeWidth="1.8" />
                <path d="M17 13.5h14A4.5 4.5 0 0 1 35.5 18v12a4.5 4.5 0 0 1-4.5 4.5H17a4.5 4.5 0 0 1-4.5-4.5V18a4.5 4.5 0 0 1 4.5-4.5Z" stroke="url(#insightLogoGradient)" strokeWidth="2.4" />
                <circle cx="24" cy="24" r="6.2" stroke="url(#insightLogoGradient)" strokeWidth="2.4" />
                <circle cx="33" cy="16.5" r="1.7" fill="#F0ABFC" />
                <path d="m37.5 7 .9 2.6L41 10.5l-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" fill="#F5D0FE" />
              </svg>
            </div>

            <h1
              className={`text-2xl font-bold tracking-tight ${darkMode
                  ? "text-white"
                  : "text-[#242033]"
                }`}
            >
              Insta
              <span className="text-fuchsia-400">
                Insights
              </span>
            </h1>

          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`p-3 rounded-xl border transition-all ${darkMode
                ? "bg-white/[0.06] border-white/10 text-amber-300 hover:bg-white/10"
                : "bg-white border-black/[0.06] text-slate-700 hover:bg-slate-100"
              }`}
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>

        </div>
      </nav>

      {/* Hero Section */}

      <section className="max-w-5xl mx-auto px-6 pt-24 md:pt-28">

        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className={`text-center text-4xl md:text-6xl font-semibold tracking-[-0.045em] leading-[1.08] ${darkMode
              ? "text-white"
              : "text-[#242033]"
            }`}
        >
          Your Instagram,{" "}

          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            decoded.
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className={`text-center text-base md:text-lg mt-6 max-w-2xl mx-auto leading-8 ${darkMode
              ? "text-slate-400"
              : "text-[#777386]"
            }`}
        >
          Analyze your Instagram followers,
          discover unfollowers, mutuals,
          and hidden fans in seconds.
        </motion.p>

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: 120,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            h-1
            rounded-full
            mx-auto
            mt-8
            bg-gradient-to-r
            from-pink-500
            to-purple-500
          "
        />
      </section>

      {/* Upload Section */}

      <section className="max-w-5xl mx-auto px-6 mt-14 pb-20">
        <FileUpload onFiles={handleFiles} darkMode={darkMode} />
      </section>

      {/* Results */}

      {data && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <Results data={data} darkMode={darkMode} />
        </section>
      )}
    </div>
  );
}

export default App;