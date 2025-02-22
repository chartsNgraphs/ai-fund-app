import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";

export default function DonorLoginPage () {
    return (
    <div className="container mx-auto p-4 flex justify-center">
        <div className="w-full sm:w-1/2">
        <Tabs defaultValue="login">
            <TabsList>
                <TabsTrigger value="login">
                    Login
                </TabsTrigger>
                <TabsTrigger value="register">
                    Register
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login to your Application Profile</CardTitle>
                        <CardDescription>Sign in to search for candidates, manage your relationships, and view today&apos;s actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="flex justify-end w-full p-2 space-x-4">
                            <Button variant={'outline'}>Forgot your Password</Button>
                            <Button variant={'default'}>Login</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register as a Donor</CardTitle>
                        <CardDescription>Register to start donating to causes that mean something to you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                        <div className="flex justify-end w-full p-2">
                            <Button variant={'default'}>Register</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
    </div>
    )
}