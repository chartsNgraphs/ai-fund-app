import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";

export default function DonorLoginPage() {

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full sm:w-1/2">
        <Tabs defaultValue="login">
          <TabsList className="rounded-full">
            <TabsTrigger value="login" className="rounded-full">Google</TabsTrigger>
            <TabsTrigger value="register" className="rounded-full">Other Sign In Providers</TabsTrigger>
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
