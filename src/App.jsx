import { useEffect, useState } from "react";
import { FaInstagram, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import FileUpload from "./components/FileUpload";
import Results from "./components/Results";

function App() {
  const [data, setData] = useState(null);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
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
      className={`min-h-screen transition-all duration-500 ${darkMode
          ? "bg-slate-950"
          : "bg-gradient-to-br from-[#faf5ff] via-white to-[#f5f3ff]"
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
            bg-pink-500/20
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
            bg-purple-500/20
            blur-3xl
          "
        />
      </div>

      {/* Navbar */}

      <nav
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode
            ? "bg-slate-900/80 border-slate-800"
            : "bg-white/80 border-gray-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FaInstagram
              size={40}
              className="text-pink-500"
            />

            <h1
              className={`text-3xl font-bold ${darkMode
                  ? "text-white"
                  : "text-slate-900"
                }`}
            >
              Insta
              <span className="text-pink-500">
                Insights
              </span>
            </h1>

          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`p-3 rounded-xl transition-all ${darkMode
                ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                : "bg-gray-100 text-slate-700 hover:bg-gray-200"
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

      <section className="max-w-7xl mx-auto px-6 pt-20">

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
          className={`text-center text-5xl md:text-7xl font-bold ${darkMode
              ? "text-white"
              : "text-slate-900"
            }`}
        >
          Instagram{" "}

          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Analytics
          </span>{" "}

          Dashboard
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
          className={`text-center text-lg md:text-xl mt-6 max-w-3xl mx-auto ${darkMode
              ? "text-slate-400"
              : "text-gray-500"
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

      <section className="max-w-6xl mx-auto px-6 mt-14 pb-20">
        <FileUpload onFiles={handleFiles} />
      </section>

      {/* Results */}

      {data && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <Results data={data} />
        </section>
      )}
    </div>
  );
}

export default App;