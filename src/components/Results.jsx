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

function Results({ data }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const filteredUsers = data.notFollowingBack
    .filter((user) =>
      user
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "asc"
        ? a.localeCompare(b)
        : b.localeCompare(a)
    );

  const exportCSV = () => {
    const csv =
      "Username\n" +
      data.notFollowingBack.join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "instagram-unfollowers.csv";

    link.click();

    toast.success(
      "CSV exported successfully 🚀"
    );
  };

  const copyUsername = (user) => {
    navigator.clipboard.writeText(user);

    toast.success(
      `Copied @${user}`
    );
  };

  const stats = [
    {
      title: "Not Following Back",
      value: data.notFollowingBack.length,
      desc: "People you follow",
      emoji: "😢",
      gradient:
        "from-pink-500 to-rose-500",
    },
    {
      title: "Fans",
      value: data.fans.length,
      desc: "Follow you only",
      emoji: "❤️",
      gradient:
        "from-purple-500 to-indigo-500",
    },
    {
      title: "Mutuals",
      value: data.mutuals.length,
      desc: "Follow each other",
      emoji: "🤝",
      gradient:
        "from-cyan-500 to-blue-500",
    },
    {
      title: "Connections",
      value:
        data.mutuals.length +
        data.fans.length,
      desc: "Total followers",
      emoji: "📊",
      gradient:
        "from-orange-500 to-pink-500",
    },
  ];

  return (
    <div className="mt-14">

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-white
              p-7
              shadow-lg
              border
              border-gray-100
            "
          >
            <div
              className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${item.gradient}`}
            />

            <div className="text-4xl">
              {item.emoji}
            </div>

            <h3 className="font-bold text-lg mt-4">
              {item.title}
            </h3>

            <p className="text-gray-500">
              {item.desc}
            </p>

            <h2 className="text-5xl font-bold mt-5">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mt-12">

        <div>
          <h2 className="text-3xl font-bold">
            People Not Following Back
          </h2>

          <p className="text-gray-500 mt-1">
            Total Results:
            {" "}
            {filteredUsers.length}
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-xl
            text-white
            font-semibold
            bg-gradient-to-r
            from-pink-500
            to-purple-500
            shadow-lg
            hover:scale-105
            transition-all
          "
        >
          <FiDownload />
          Export CSV
        </button>

      </div>

      {/* Search + Sort */}

      <div className="grid md:grid-cols-4 gap-4 mt-6">

        <div className="md:col-span-3 relative">

          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search username..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-12
              p-4
              rounded-2xl
              border
              border-gray-200
              focus:ring-2
              focus:ring-purple-400
              outline-none
            "
          />

        </div>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
            p-4
            rounded-2xl
            border
            border-gray-200
            outline-none
          "
        >
          <option value="asc">
            A → Z
          </option>

          <option value="desc">
            Z → A
          </option>
        </select>

      </div>

      {/* Users List */}

      <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

        {filteredUsers.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-7xl">
              🎉
            </div>

            <h3 className="text-3xl font-bold mt-4">
              No Users Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search term.
            </p>

          </div>
        ) : (
          filteredUsers.map(
            (user, index) => (
              <motion.div
                key={user}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay:
                    index * 0.03,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                  bg-gray-50
                  rounded-2xl
                  p-5
                  mb-4
                  border
                  border-gray-100
                  hover:shadow-lg
                  transition-all
                "
              >
                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-gradient-to-r
                      from-pink-500
                      via-purple-500
                      to-indigo-500
                    "
                  />

                  <div>

                    <h3 className="font-semibold text-lg">
                      @{user}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Instagram User
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      copyUsername(user)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      border
                      hover:bg-gray-100
                      transition-all
                    "
                  >
                    <FiCopy />
                    Copy
                  </button>

                  <a
                    href={`https://instagram.com/${user}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      text-white
                      bg-gradient-to-r
                      from-pink-500
                      to-purple-500
                      hover:scale-105
                      transition-all
                    "
                  >
                    <FiExternalLink />
                    View Profile
                  </a>

                </div>
              </motion.div>
            )
          )
        )}

      </div>

      {/* Analytics Section */}

      <Analytics data={data} />

    </div>
  );
}

export default Results;