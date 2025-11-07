import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, MapPin, Send } from "lucide-react"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Enter a valid email" }),
    phone: z.string().optional(),
    subject: z.string().min(2, { message: "Subject is required" }),
    message: z.string().min(5, { message: "Message must be at least 5 characters" }),
})

export default function Contact() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast.success("Message sent successfully!")
    }

    return (
        <div className=" py-16 px-5 md:px-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3">Get In Touch</h1>
                    <p className="md:w-1/2 mx-auto text-center text-lg">
                        Have questions or feedback? We'd love to hear from you. Fill out the form and our team will respond as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left Info */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <p className=" mb-8">
                            Reach out through the following channels or fill out the form. We typically reply within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="">support@gmail.com</p>
                                    <p className="text-sm text-gray-500">We'll reply within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="">+880 1XXX-XXXXXX</p>
                                    <p className="text-sm text-gray-500">Mon to Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Office</h3>
                                    <p className="">Banani, Dhaka, Bangladesh</p>
                                    <p className="text-sm text-gray-500">Visit us during office hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Support Hours */}
                        <Card className="mt-10 border-purple-200">
                            <CardHeader className="pb-2">
                                <h3 className="font-semibold">Support Hours</h3>
                            </CardHeader>
                            <CardContent className=" space-y-1 text-sm">
                                <p>Monday - Friday: <span className="font-medium">9:00 AM - 6:00 PM</span></p>
                                <p>Saturday: <span className="font-medium">10:00 AM - 4:00 PM</span></p>
                                <p>Sunday: <span className="font-medium">Emergency Only</span></p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: shadcn form */}
                    <Card className="shadow-lg border-purple-200">
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Send a Message</h2>
                            <p className="text-sm ">We’ll get back to you soon.</p>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+8801XXXXXXXXX" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="What's this regarding?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Please describe your inquiry in detail..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center justify-center space-x-2"
                                    >
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </Button>

                                    <p className="text-xs text-center text-gray-500 mt-2">
                                        By submitting this form, you agree to our{" "}
                                        <a href="#" className="underline hover:text-purple-600">
                                            privacy policy
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="underline hover:text-purple-600">
                                            terms of service
                                        </a>.
                                    </p>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
