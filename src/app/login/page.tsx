import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";

export default function DonorLoginPage() {

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full sm:w-1/2">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Google</TabsTrigger>
            <TabsTrigger value="register">Other Sign In Providers</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm/>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create an account to start using the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
