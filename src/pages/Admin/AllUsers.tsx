/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserActiveSelect } from "@/components/modules/Admin/UserActiveSelect";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"

import { useChangeBlockStatusMutation, useGetUsersQuery } from "@/redux/features/admin/admin.api";
import { toast } from "sonner";

const AllUsers = () => {

    const { data, isLoading, isError } = useGetUsersQuery(undefined)
    const [changeBlockStatus, { isLoading: isBlocking }] = useChangeBlockStatusMutation();



    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Something went wrong!</p>

    const handleBlock = async (id: string, currentStatus: boolean) => {
        try {
            await changeBlockStatus(id).unwrap();
            toast.success(
                `User ${currentStatus ? "unblocked" : "blocked"} successfully`
            );
            window.location.reload();
        } catch (error) {
            console.error('Failed to change block status', error);
        }
    };

    console.log(data?.data?.users);

    return (
        <div>
            <Table>                
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>IsActive</TableHead>
                        <TableHead>IsBlocked</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Active Action</TableHead>
                        <TableHead>Blocked Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data?.users.map((user: any) => (
                            < TableRow >
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.isActive}</TableCell>
                                <TableCell>{user.isBlocked ? 'Yes' : 'No'}</TableCell>

                                <TableCell>{user.role}</TableCell>
                                <TableCell className="flex mx-auto gap-4">
                                    <UserActiveSelect userId={user._id} initialStatus={user.isActive} />

                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleBlock(user._id, user.isBlocked)}
                                        className={`px-4 py-2 rounded text-white ${user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        disabled={isBlocking}
                                    >
                                        {user.isBlocked ? 'Unblock' : 'Block'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div >
    );
};

export default AllUsers;