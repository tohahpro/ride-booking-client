/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { motion } from "framer-motion"
import {
  useUserInfoQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/features/auth/auth.api"
import { useChangeOnlineStatusMutation } from "@/redux/features/driver/driver.api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Lock, Wifi, EyeOff, Eye, Smartphone, LockOpen } from "lucide-react"

const ProfilePage = () => {
  const { data, isLoading } = useUserInfoQuery(undefined)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation()
  const [changeOnlineStatus] = useChangeOnlineStatusMutation()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const user = data?.data?.data

  const [onlineStatus, setOnlineStatus] = useState<boolean>(false)
  useEffect(() => {
    if (user && user.role === "driver") {
      setOnlineStatus(!!user.isOnline)
    }
  }, [user])

  const avatarText = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w: string) => w.charAt(0).toUpperCase())
        .join("")
    : "?"

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", phone: "" },
  })

  useEffect(() => {
    if (user) {
      reset({ name: user.name || "", phone: user.phone || "" })
    }
  }, [user, reset])

  const onSubmitProfile = async (values: any) => {
    if (!user?._id) return
    try {
      await updateProfile({ id: user._id, userInfo: values }).unwrap()
      toast.success("Profile updated successfully!")
      reset(values)
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile")
    }
  }

  const { register: registerPwd, handleSubmit: handleSubmitPwd, reset: resetPwd } =
    useForm({
      defaultValues: { oldPassword: "", newPassword: "" },
    })

  const onSubmitPassword = async (values: any) => {
    try {
      await changePassword(values).unwrap()
      toast.success("Password changed successfully!")
      resetPwd()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password")
    }
  }

  const toggleOnlineStatus = async () => {
    const newStatus = !onlineStatus
    setOnlineStatus(newStatus)
    try {
      await changeOnlineStatus({ status: newStatus ? "ONLINE" : "OFFLINE" }).unwrap()
      toast.success(`Status changed to ${newStatus ? "Online" : "Offline"}`)
    } catch (err: any) {
      setOnlineStatus(!newStatus) 
      toast.error(err?.data?.message || "Failed to update status")
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading profile...
      </div>
    )

  return (
    <section className="min-h-screen py-16 px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-10"
      >
    
        <Card className="border-none shadow-2xl backdrop-blur-md bg-white/80">
          <CardHeader className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
            <Avatar className="w-24 h-24 shadow-md ring-4 ring-blue-100">
              <AvatarImage src="./avatar.jpg" alt={user?.name || "Avatar"} />
              <AvatarFallback>{avatarText}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-2xl font-bold text-gray-800">{user?.name}</CardTitle>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Badge variant="secondary" className="capitalize">{user?.role}</Badge>
                <Badge
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
                <Badge variant={user?.isApprove ? "default" : "destructive"}>
                  {user?.isApprove ? "Approved" : "Not Approved"}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6 py-6">
            <div className="space-y-2">
              <p className="text-gray-500 text-sm flex items-center"><Smartphone size={18} /> Phone</p>
              <p className="font-semibold text-gray-800">{user?.phone || "N/A"}</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-500 text-sm flex gap-2"><LockOpen size={18} /> Blocked</p>
              <Badge
                variant={user?.isBlocked ? "destructive" : "default"}
                className="px-5 py-0.5 rounded-md"
              >
                {user?.isBlocked ? "Yes" : "No"}
              </Badge>
            </div>

            {user?.role === "driver" && (
              <div className="space-y-2 md:col-span-2 flex items-center gap-4">
                <Wifi size={16} />
                <span className="text-gray-500 text-sm">Online Status</span>
                <button
                  onClick={toggleOnlineStatus}
                  className={`px-4 py-1 rounded-full font-medium text-white transition-colors ${
                    onlineStatus ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
                  }`}
                >
                  {onlineStatus ? "Online" : "Offline"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-8 shadow-2xl bg-white/80 backdrop-blur-md">
            <h2 className="text-center font-bold text-2xl text-gray-800 flex items-center justify-center gap-2">
              <User size={22} /> Update Profile
            </h2>
            <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                  <Input {...register("name")} placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
                  <Input {...register("phone")} placeholder="Enter phone number" />
                </div>
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-8 shadow-2xl bg-white/80 backdrop-blur-md">
            <h2 className="text-center font-bold text-2xl text-gray-800 flex items-center justify-center gap-2">
              <Lock size={20} /> Change Password
            </h2>
            <form onSubmit={handleSubmitPwd(onSubmitPassword)} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-sm text-gray-500 mb-1 block">Old Password</label>
                  <Input {...registerPwd("oldPassword")} type={showOldPassword ? "text" : "password"} placeholder="Enter old password" />
                  <button type="button" onClick={() => setShowOldPassword((prev) => !prev)} className="absolute right-3 top-8 text-gray-500 hover:text-gray-700">
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-500 mb-1 block">New Password</label>
                  <Input {...registerPwd("newPassword")} type={showNewPassword ? "text" : "password"} placeholder="Enter new password" />
                  <button type="button" onClick={() => setShowNewPassword((prev) => !prev)} className="absolute right-3 top-8 text-gray-500 hover:text-gray-700">
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isChanging}>
                {isChanging ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ProfilePage
