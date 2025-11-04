/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDriverHistoryQuery } from "@/redux/features/driver/driver.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function EarningHistoryPage() {
  const { data, isLoading } = useGetDriverHistoryQuery(undefined);
  const history = data?.data || {};
  const rides = history.rides || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading ride history...
      </div>
    );
  }

  const aggregate = (type: "daily" | "weekly" | "monthly") => {
    const map: Record<string, number> = {};
    rides.forEach((r: any) => {
      const date = new Date(r.completedAt || r.requestedAt);
      if (isNaN(date.getTime())) return;

      let key = "";
      if (type === "daily") {
        key = date.toISOString().split("T")[0];
      } else if (type === "weekly") {
        const week = Math.ceil(date.getDate() / 7);
        key = `${date.getFullYear()}-W${week}`;
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      }
      map[key] = (map[key] || 0) + (r.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const daily = aggregate("daily");
  const weekly = aggregate("weekly");
  const monthly = aggregate("monthly");

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800">
        Driver Ride History
      </h2>

     
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Completed Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {history.completedRides || 0}
            </p>
            <p className="text-xs text-gray-500">Total rides completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              ৳ {(history.totalEarnings || 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Total income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rides Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-700">{rides.length}</p>
            <p className="text-xs text-gray-500">All recorded rides</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Fare</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              ৳{" "}
              {(
                (history.totalEarnings || 0) / (history.completedRides || 1)
              ).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Per completed ride</p>
          </CardContent>
        </Card>
      </div>



      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily Earnings</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            {daily.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#2563EB" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500">No daily data</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Earnings</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            {weekly.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500">No weekly data</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            {monthly.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    dataKey="value"
                    stroke="#F59E0B"
                    fill="#FDE68A"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500">No monthly data</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EarningHistoryPage;
