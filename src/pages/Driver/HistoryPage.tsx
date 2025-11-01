import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDriverHistoryQuery } from "@/redux/features/driver/driver.api";
import { Loader2 } from "lucide-react";

const HistoryPage = () => {
  const { data, isLoading } = useGetDriverHistoryQuery(undefined);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-600" size={24} />
        <span className="ml-2 text-gray-600">Loading history...</span>
      </div>
    );


  const completedRides = data?.data?.completedRides || 0;
  const totalEarnings = data?.data?.totalEarnings || 0;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Driver Ride History
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

        <Card className="shadow-md border-l-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-700">
              Completed Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {completedRides}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Total successful rides
            </p>
          </CardContent>
        </Card>

        {/* Total Earnings */}
        <Card className="shadow-md border-l-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-700">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              ৳ {totalEarnings.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Cumulative earnings from all completed rides
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Optional summary */}
      <Card className="shadow-sm bg-gray-50">
        <CardContent className="p-5 text-gray-700">
          <p>
            You’ve successfully completed{" "}
            <span className="font-semibold">{completedRides}</span> rides and
            earned a total of{" "}
            <span className="font-semibold text-blue-600">
              ৳{totalEarnings.toFixed(2)}
            </span>
            . Keep up the great driving!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
