/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetRidesQuery } from "@/redux/features/admin/admin.api";

const AllRides = () => {

    const { data: rides } = useGetRidesQuery(undefined);

    console.log(rides?.data?.data);

    return (
        <div>
            <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Pickup Location</TableHead>
                        <TableHead>Destination Location</TableHead>
                        <TableHead>Cost Amount</TableHead>
                        <TableHead>Ride Status</TableHead>                        
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        rides?.data?.data.map((ride:any) => (
                            < TableRow >
                                <TableCell>{ride.pickupLocation.address}</TableCell>
                                <TableCell className="font-medium">{ride.destinationLocation.address}</TableCell>
                                <TableCell>{ride.fare} tk</TableCell>                                
                                <TableCell>{ride.status}</TableCell>                                
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div >
        </div>
    );
};

export default AllRides;