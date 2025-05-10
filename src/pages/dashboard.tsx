import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import projectsData from "@/data/projects.json";

const Dashboard = () => {
  const completionData = projectsData.map((project) => ({
    name: project.title,
    completion: project.completionPercentage,
  }));

  const lineData = projectsData[0].monthlyProgress.map((_, index) => {
    const entry: any = { month: `M${index + 1}` };
    projectsData.forEach((project) => {
      entry[project.title] = project.monthlyProgress[index];
    });
    return entry;
  });

  return (
    <div className="w-full px-12 py-6">
      <h2 className="text-2xl font-bold mb-4">Project Completion Dashboard</h2>

      <div className="flex lg:flex-row flex-col gap-6">
        {/* Line Chart */}
        <div className="mb-10 lg:w-[65%] w-full">
          <h4 className="text-lg font-semibold mb-2">
            Monthly Completion Progress
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {projectsData.map((project) => (
                <Line
                  key={project.id}
                  type="monotone"
                  dataKey={project.title}
                  stroke="#8884d8"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="lg:w-[35%] w-full">
          <h4 className="text-lg font-semibold mb-2">
            Overall Completion Percentage
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completion" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
