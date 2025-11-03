/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    useUserInfoQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation
} from "@/redux/features/auth/auth.api";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useChangeOnlineStatusMutation } from "@/redux/features/driver/driver.api";

const ProfilePage = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();
    const [changeOnlineStatus] = useChangeOnlineStatusMutation();

    const user = data?.data?.data;
    const avatarText = user?.name
        ? user.name
            .split(" ")
            .slice(0, 2)
            .map((w: string) => w.charAt(0).toUpperCase())
            .join("")
        : "?";

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name: "", phone: "" },
    });

    useEffect(() => {
        if (user) {
            reset({ name: user.name || "", phone: user.phone || "" });
        }
    }, [user, reset]);

    const onSubmitProfile = async (values: any) => {
        if (!user?._id) return;
        try {
            await updateProfile({ id: user._id, userInfo: values }).unwrap();
            toast.success("Profile updated successfully!");
            reset(values);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update profile");
        }
    };

    const { register: registerPwd, handleSubmit: handleSubmitPwd, reset: resetPwd } = useForm({
        defaultValues: { oldPassword: "", newPassword: "" },
    });

    const onSubmitPassword = async (values: any) => {
        try {
            await changePassword(values).unwrap();
            toast.success("Password changed successfully!");
            resetPwd();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to change password");
        }
    };

    const [onlineStatus, setOnlineStatus] = useState(user?.isOnline || "OFFLINE");

    const handleStatusChange = async (value: string) => {
        setOnlineStatus(value);
        try {
            await changeOnlineStatus({ status: value }).unwrap();
            toast.success(`Status changed to ${value}`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update status");
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-40"><p>Loading...</p></div>;
    console.log(user._id);
    return (
        <div className="mx-auto space-y-8">
            {/* User Info Card */}
            <Card className="p-4 space-y-4">
                <CardHeader className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src="./avatar.jpg" alt={user?.name || "Avatar"} />
                        <AvatarFallback>{avatarText}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-muted-foreground text-sm">Role</p>
                            <p className="font-medium capitalize">{user?.role}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Phone</p>
                            <p className="font-medium capitalize">{user?.phone || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Status</p>
                            <Badge
                                className="px-5 py-0.5 rounded-md"
                                variant={
                                    user?.isActive === "ACTIVE"
                                        ? "default"
                                        : user?.isActive === "INACTIVE"
                                            ? "destructive"
                                            : "secondary"
                                }
                            >
                                {user?.isActive}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Approved</p>
                            <Badge
                                className="px-5 py-0.5 rounded-md"
                                variant={user?.isApprove ? "default" : "destructive"}
                            >
                                {user?.isApprove ? "Yes" : "No"}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Is Blocked</p>
                            <Badge
                                className="px-5 py-0.5 rounded-md"
                                variant={user?.isApprove ? "default" : "destructive"}
                            >
                                {user?.isBlocked ? "Yes" : "No"}
                            </Badge>
                        </div>
                        {
                            user?.role === "driver" && (
                                <div>
                                    <p className="text-muted-foreground text-sm">Online Status</p>
                                    <Badge
                                        className="px-5 py-0.5 rounded-md"
                                        variant={user?.isApprove ? "default" : "destructive"}
                                    >
                                        {onlineStatus}
                                    </Badge>
                                </div>
                            )
                        }

                    </div>



                    {user?.role === "driver" && (
                        <div className="mt-4">
                            <p className="text-muted-foreground text-sm mb-1">Online Status</p>
                            <Select value={onlineStatus ? 'Online' : 'Offline'} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ONLINE">{onlineStatus ? "Offline" : "Online"}</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="p-6 shadow-xl rounded-xl">
                <h2 className="text-center font-bold text-xl">Update Profile</h2>
                <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground">Name</label>
                            <Input {...register("name")} placeholder="Enter name" />
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Phone Number</label>
                            <Input {...register("phone")} placeholder="Enter phone number" />
                        </div>
                    </div>
                    <Button type="submit" className="mt-4" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </Card>
            <Card className="p-6 shadow-xl rounded-xl">
                <h2 className="text-center font-bold text-xl">Change Password</h2>
                <form onSubmit={handleSubmitPwd(onSubmitPassword)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground">Old Password</label>
                            <Input {...registerPwd("oldPassword")} type="password" placeholder="Enter old password" />
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">New Password</label>
                            <Input {...registerPwd("newPassword")} type="password" placeholder="Enter new password" />
                        </div>
                    </div>
                    <Button type="submit" className="mt-4" disabled={isChanging}>
                        {isChanging ? "Changing..." : "Change Password"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ProfilePage;
