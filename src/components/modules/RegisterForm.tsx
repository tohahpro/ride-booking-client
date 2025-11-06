/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { useLocation, useNavigate } from "react-router"


const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [registerUser, { isLoading }] = useRegisterMutation()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/"

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data).unwrap()
            toast.success("Registration successful!")
            reset()
            navigate(from, { replace: true })
        } catch (err: any) {
            toast.error(err?.data?.message || "Registration failed")
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center min-h-screen bg-gray-50 p-4"
        >
            <Card className="w-full max-w-md shadow-lg border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Create Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@gmail.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-3"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default RegisterForm
