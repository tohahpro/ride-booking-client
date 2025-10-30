/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetRiderHistoryQuery } from "@/redux/features/rider/rider.api";
import { Link } from "react-router";


const History = () => {

    const { data, isLoading, isError } = useGetRiderHistoryQuery(undefined);
    console.log(data?.data);
    if (isLoading) return <div>Loading ride history...</div>;
    if (isError) return <div>Failed to load ride history</div>;
    return (
        <div>
            <Table className="md:w-1/2 mx-auto">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Destination Location</TableHead>
                        <TableHead className="w-[100px]">Pickup Location</TableHead>
                        <TableHead>Fare</TableHead>
                        <TableHead>Ride Status</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data?.slice().reverse().map((history: any) => (
                            <TableRow key={history._id}>
                                <TableCell className="font-medium">{history.destinationLocation.address}</TableCell>
                                <TableCell className="font-medium">{history.pickupLocation.address}</TableCell>
                                <TableCell>{history.fare} tk</TableCell>
                                <TableCell>{history.status}</TableCell>
                                <TableCell>
                                    <Link to={`/rider/history/${history._id}`}>
                                        <Button className="cursor-pointer">Details</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default History;