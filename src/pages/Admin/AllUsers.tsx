/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Search, Filter, Loader2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserActiveSelect } from "@/components/modules/Admin/UserActiveSelect"
import {
    useGetUsersQuery,
    useChangeBlockStatusMutation,
} from "@/redux/features/admin/admin.api"
import { cn } from "@/lib/utils"

const AllUsers = () => {
    const { data, isLoading, isError, refetch } = useGetUsersQuery(undefined)
    const [changeBlockStatus, { isLoading: isBlocking }] = useChangeBlockStatusMutation()
    console.log(data?.data);
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // block/unblock
    const handleBlock = async (id: string, currentStatus: boolean) => {
        try {
            await changeBlockStatus(id).unwrap()
            toast.success(`User ${currentStatus ? "unblocked" : "blocked"} successfully`)
            refetch()
        } catch {
            toast.error("Failed to change block status")
        }
    }

    // Filter
    const filteredUsers = useMemo(() => {
        if (!data?.data?.users) return []
        return data.data.users.filter((user: any) => {
            const matchesSearch =
                user.name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase())

            const matchesRole =
                roleFilter === "all" ? true : user.role === roleFilter

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : statusFilter === "ACTIVE"
                        ? user.isActive === "ACTIVE"
                        : user.isActive === "INACTIVE"

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [data, search, roleFilter, statusFilter])

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
            </div>
        )

    if (isError)
        return <p className="text-center text-red-500">Something went wrong!</p>

    return (
        <motion.div
            className="p-4 md:p-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Card className="shadow-md border rounded-2xl">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-xl font-semibold">All Users</CardTitle>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-full sm:w-40">
                                <Filter className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Filter by Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="rider">Rider</SelectItem>
                                <SelectItem value="driver">Driver</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-40">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Blocked</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Active Action</TableHead>
                                    <TableHead>Block Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user: any, i: number) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b hover:bg-muted/50 transition-colors"
                                        >
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={cn(
                                                        "font-medium",
                                                        user.isActive === 'ACTIVE' ? "text-green-600" : "text-red-500"
                                                    )}
                                                >
                                                    {user.isActive}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {user.isBlocked ? (
                                                    <span className="text-red-500">Yes</span>
                                                ) : (
                                                    <span className="text-green-500">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="capitalize">{user.role}</TableCell>
                                            <TableCell>                                                
                                                <UserActiveSelect userId={user._id} initialStatus={user.isActive} />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleBlock(user._id, user.isBlocked)}
                                                    className={`px-4 py-1 text-sm rounded-lg text-white ${user.isBlocked
                                                        ? "bg-green-500 hover:bg-green-600"
                                                        : "bg-red-500 hover:bg-red-600"
                                                        }`}
                                                    disabled={isBlocking}
                                                >
                                                    {user.isBlocked ? "Unblock" : "Block"}
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default AllUsers
