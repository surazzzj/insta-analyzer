import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics({ data, darkMode }) {
  const chartData = [
    { name: "Not Following Back", value: data.notFollowingBack.length },
    { name: "Fans", value: data.fans.length },
    { name: "Mutuals", value: data.mutuals.length },
  ];

  const COLORS = ["#e879b9", "#a78bfa", "#7dd3fc"];

  return (
    <div className={`mt-5 rounded-2xl border p-5 md:p-8 ${darkMode ? "border-white/[0.07] bg-[#11111c] text-white" : "border-black/[0.05] bg-white text-[#242033]"}`}>
      <div className="mb-5">
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${darkMode ? "text-violet-300" : "text-violet-600"}`}>At a glance</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">Account analytics</h2>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-[#858194]"}`}>A visual breakdown of your Instagram connections.</p>
      </div>

      <div className="h-[300px] md:h-[340px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={115}
              innerRadius={68}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#191827" : "#ffffff",
                border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #eeeaf5",
                borderRadius: "12px",
                color: darkMode ? "#f8fafc" : "#242033",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
            <span className={darkMode ? "text-slate-300" : "text-slate-600"}>{item.name}</span>
            <strong>{item.value.toLocaleString()}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
