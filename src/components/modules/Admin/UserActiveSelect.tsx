/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useUpdateActiveStatusMutation } from "@/redux/features/admin/admin.api"
import { toast } from "sonner";



export function UserActiveSelect({ userId, initialStatus }: { userId: string; initialStatus: string }) {
    const [value, setValue] = useState(initialStatus)
    const [updateActiveStatus] = useUpdateActiveStatusMutation()

    const handleChange = async (newValue: string) => {
        setValue(newValue)

        try {
            await updateActiveStatus({ id: userId, isActive: newValue }).unwrap()
            toast.success("Status updated successfully ✅")
            window.location.reload();
        } catch (error) {
            toast.error("Failed to update status ❌")
        }
    }

    return (
        <Select onValueChange={handleChange} value={value}>
            <SelectTrigger className="w-28">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
            </SelectContent>
        </Select>
    )
}
