import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics({ data }) {
  const chartData = [
    {
      name: "Not Following Back",
      value: data.notFollowingBack.length,
    },
    {
      name: "Fans",
      value: data.fans.length,
    },
    {
      name: "Mutuals",
      value: data.mutuals.length,
    },
  ];

  const COLORS = [
    "#ec4899",
    "#8b5cf6",
    "#6366f1",
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Account Analytics
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
            >
              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;