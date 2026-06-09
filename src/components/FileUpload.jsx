import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { motion } from "framer-motion";

function FileUpload({ onFiles }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "application/json": [".json"],
    },
    onDrop: (files) => onFiles(files),
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
        border
        border-white/50
        p-8
        md:p-10
      "
    >
      {/* Glow Effects */}

      <div
        className="
          absolute
          -top-24
          -right-24
          w-80
          h-80
          rounded-full
          bg-pink-500/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -left-24
          w-80
          h-80
          rounded-full
          bg-purple-500/20
          blur-3xl
        "
      />

      {/* Upload Area */}

      <div
        {...getRootProps()}
        className={`
          relative
          rounded-3xl
          border-2
          border-dashed
          p-12
          md:p-20
          text-center
          cursor-pointer
          transition-all
          duration-300

          ${
            isDragActive
              ? `
                border-pink-500
                bg-gradient-to-r
                from-pink-50
                to-purple-50
                scale-[1.02]
              `
              : `
                border-purple-300
                hover:border-pink-500
                hover:bg-purple-50/50
              `
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Floating Icon */}

        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <FiUploadCloud
            size={95}
            className="
              mx-auto
              text-purple-500
            "
          />
        </motion.div>

        {/* Heading */}

        <h2
          className="
            text-3xl
            md:text-5xl
            font-bold
            mt-8
            text-slate-900
          "
        >
          Upload Instagram Data
        </h2>

        <p
          className="
            mt-5
            text-lg
            text-gray-500
            max-w-2xl
            mx-auto
          "
        >
          Upload your Instagram export files and
          instantly discover unfollowers, mutual
          followers, and hidden fans.
        </p>

        {/* File Names */}

        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-3
            mt-6
          "
        >
          <span
            className="
              px-4
              py-2
              rounded-full
              bg-pink-100
              text-pink-700
              text-sm
              font-semibold
            "
          >
            followers.json
          </span>

          <span
            className="
              px-4
              py-2
              rounded-full
              bg-purple-100
              text-purple-700
              text-sm
              font-semibold
            "
          >
            following.json
          </span>
        </div>

        {/* CTA */}

        <button
          type="button"
          className="
            mt-8
            px-8
            py-4
            rounded-2xl
            text-white
            font-semibold
            text-lg
            bg-gradient-to-r
            from-pink-500
            via-purple-500
            to-indigo-500
            shadow-lg
            hover:scale-105
            transition-all
          "
        >
          Choose Files
        </button>

        {/* Drag State */}

        {isDragActive && (
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              mt-6
              text-pink-600
              font-semibold
              text-lg
            "
          >
            🚀 Drop your files here
          </motion.p>
        )}
      </div>

      {/* Bottom Features */}

      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-3
          mt-8
        "
      >
        <span
          className="
            px-4
            py-2
            rounded-full
            bg-green-100
            text-green-700
            text-sm
            font-medium
          "
        >
          🔒 100% Private
        </span>

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-blue-100
            text-blue-700
            text-sm
            font-medium
          "
        >
          ⚡ Instant Analysis
        </span>

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-orange-100
            text-orange-700
            text-sm
            font-medium
          "
        >
          📥 CSV Export
        </span>
      </div>

      {/* Footer */}

      <p className="text-center text-gray-400 mt-6">
        Everything is processed locally in your
        browser. No data is uploaded anywhere.
      </p>
    </motion.div>
  );
}

export default FileUpload;