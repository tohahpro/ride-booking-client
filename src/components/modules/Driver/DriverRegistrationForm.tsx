/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCreateDriverMutation } from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface DriverFormValues {
    vehicleType: string;
    vehicleNumber: string;
    licenseNumber: string;
    isOnline?: boolean;
}

const DriverRegistrationForm = () => {
    const navigate = useNavigate();
    const [createDriver, { isLoading }] = useCreateDriverMutation();

    const form = useForm<DriverFormValues>({
        defaultValues: {
            vehicleType: "",
            vehicleNumber: "",
            licenseNumber: "",
            isOnline: false,
        },
    });

    const onSubmit = async (values: DriverFormValues) => {
        try {
            await createDriver(values).unwrap();
            toast.success("Driver registered successfully!");
            form.reset();
            navigate("/login");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to register driver");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <Card className="w-full max-w-md shadow-md border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-center">
                        Driver Registration
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name="vehicleType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehicle Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select vehicle type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CAR">CAR</SelectItem>
                                                <SelectItem value="BIKE">BIKE</SelectItem>
                                                <SelectItem value="CNG">CNG</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vehicleNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehicle Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., DHAKA-METRO-BA-12-3456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="licenseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>License Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter License Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Registering..." : "Register Driver"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DriverRegistrationForm;
