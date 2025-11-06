/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import Password from "../ui/password";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  const form = useForm();
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from1 = (location.state as any)?.from?.pathname || "/"

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {    
    console.log(data);
    try {
      await login(data).unwrap();
      toast.success("Logged In Successful")
      navigate(from1, { replace: true })
    } catch (err: any) {
      console.error(err)
      const message = err?.data?.message || err?.error || "Login failed. Please try again.";
      toast.error(message)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid">
        <Form {...form}>
          <form id="login-button" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          {/* <Link to={'/forgot-password'} className="text-xs text-chart-5 flex justify-end font-medium pb-3">Forgot Password?</Link> */}
          <Button form="login-button" type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}