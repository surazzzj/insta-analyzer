import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiShield, FiZap, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";

function FileUpload({ onFiles, darkMode }) {
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-[28px] border p-5 md:p-9 backdrop-blur-xl transition-colors duration-300 ${
        darkMode
          ? "bg-[#11111c]/90 border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          : "bg-white/90 border-white shadow-[0_24px_80px_rgba(40,30,80,0.08)]"
      }`}
    >
      <div className={`pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full blur-3xl ${darkMode ? "bg-violet-500/10" : "bg-violet-300/25"}`} />
      <div className={`pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full blur-3xl ${darkMode ? "bg-fuchsia-500/10" : "bg-fuchsia-300/20"}`} />

      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-[22px] border border-dashed px-5 py-12 md:py-16 text-center transition-all duration-300 ${
          isDragActive
            ? darkMode
              ? "border-violet-300 bg-violet-400/10"
              : "border-violet-500 bg-violet-50"
            : darkMode
              ? "border-white/15 bg-white/[0.025] hover:border-violet-300/60 hover:bg-white/[0.045]"
              : "border-violet-200 bg-[#faf9ff] hover:border-violet-400 hover:bg-violet-50/70"
        }`}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border ${darkMode ? "border-violet-300/15 bg-violet-400/10 text-violet-200" : "border-violet-100 bg-violet-100/70 text-violet-600"}`}
        >
          <FiUploadCloud size={32} />
        </motion.div>

        <p className={`mt-7 text-xs font-semibold uppercase tracking-[0.24em] ${darkMode ? "text-violet-300" : "text-violet-600"}`}>
          Your audience, in focus
        </p>

        <h2 className={`mt-3 text-2xl font-semibold tracking-tight md:text-4xl ${darkMode ? "text-white" : "text-[#242033]"}`}>
          Upload your Instagram data
        </h2>

        <p className={`mx-auto mt-4 max-w-xl text-sm leading-7 md:text-base ${darkMode ? "text-slate-400" : "text-[#777386]"}`}>
          Drop your Instagram export files here and uncover your connections in a few seconds.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className={`rounded-full border px-4 py-2 text-xs font-medium ${darkMode ? "border-white/10 bg-white/[0.04] text-slate-300" : "border-violet-100 bg-white text-slate-600"}`}>
            followers_1.json
          </span>
          <span className={`rounded-full border px-4 py-2 text-xs font-medium ${darkMode ? "border-white/10 bg-white/[0.04] text-slate-300" : "border-violet-100 bg-white text-slate-600"}`}>
            following.json
          </span>
        </div>

        <div className={`mx-auto mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-500/15 transition-transform hover:-translate-y-0.5 ${darkMode ? "bg-violet-300 text-[#171322]" : "bg-[#29213f] text-white"}`}>
          <FiFileText />
          Choose files
        </div>

        {isDragActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-5 text-sm font-semibold ${darkMode ? "text-violet-200" : "text-violet-700"}`}
          >
            Drop your files to begin
          </motion.p>
        )}
      </div>

      <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        <span className={`inline-flex items-center gap-2 text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          <FiShield className={darkMode ? "text-emerald-300" : "text-emerald-600"} />
          Files stay on your device
        </span>
        <span className={`inline-flex items-center gap-2 text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          <FiZap className={darkMode ? "text-amber-300" : "text-amber-600"} />
          Instant analysis
        </span>
      </div>
    </motion.div>
  );
}

export default FileUpload;
