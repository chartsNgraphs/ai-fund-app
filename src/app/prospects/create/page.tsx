"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Plus, Trash, X } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CreateProspectPage() {
    const [addresses, setAddresses] = useState<Array<unknown>>([]);
    const [socials, setSocials] = useState<Array<unknown>>([]);

    return (
        <div className="container mx-auto p-1 pt-5">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/prospects">Prospects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Create</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1 className="text-2xl font-bold m-1 text-primary">
                    Create a Prospect
                </h1>
                <p className=" m-1 text-s mb-1 md:mb-5">
                    Add some basic details here, let our magic fill out the rest!
                </p>
            </div>
            <form className="space-y-4">
                <Card className="p-4">
                    <h1 className="text-xl text-primary font-semibold">Basic Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input name="firstName" type="text" placeholder="First Name" />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input name="lastName" type="text" placeholder="Last Name" />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" placeholder="Email" />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                name="phone"
                                type="tel"
                                placeholder="Phone"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    const formattedValue = value
                                        .replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3")
                                        .slice(0, 14);
                                    e.target.value = formattedValue;
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                name="dateOfBirth"
                                type="date"
                                placeholder="Date of Birth"
                            />
                        </FormItem>
                    </div>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="p-4 lg:col-span-2 flex flex-col gap-4">
                        <h1 className="text-xl font-semibold text-primary">
                            Address Information
                        </h1>
                        {addresses.map((address, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-black-900 p-4"
                            >
                                <div className="flex flex-row justify-end gap-1 w-full col-span-2">
                                    <Button
                                        size={"default"}
                                        variant="ghost"
                                        className="flex items-center gap-1 rounded-full hover:bg-red-500 hover:text-white"
                                        onClick={(event) => {
                                            // suppress form submit
                                            event.preventDefault();
                                            setAddresses(addresses.filter((_, i) => i !== index));
                                        }}
                                    >
                                        <Trash size={64} />
                                    </Button>
                                </div>
                                <div className=" grid row-span-2 gap-4">
                                    <FormItem>
                                        <Label htmlFor="street">Street Address</Label>
                                        <Input name="street" type="text" placeholder="Street" />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor="street">Street Address 2</Label>
                                        <Input name="street" type="text" placeholder="Street" />
                                    </FormItem>
                                </div>
                                <FormItem>
                                    <Label htmlFor="city">City</Label>
                                    <Input name="city" type="text" placeholder="City" />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="state">State</Label>
                                    <Input name="state" type="text" placeholder="State" />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="zip">Zip</Label>
                                    <Input name="zip" type="text" placeholder="Zip" />
                                </FormItem>
                            </div>
                        ))}
                        <div className="flex justify-center p-4">
                            <Button
                                onClick={(event) => {
                                    // suppress form submit
                                    event.preventDefault();
                                    setAddresses([...addresses, {}]);
                                }}
                                variant="outline"
                                className="rounded-full"
                            >
                                <Plus size={24} />
                                Add Address
                            </Button>
                        </div>
                    </Card>
                    <Card className="p-4 lg:col-span-1 flex flex-col gap-4">
                        <h1 className="text-xl font-semibold text-primary">
                            Socials & Links
                        </h1>
                        {!socials.length && (
                            <p>Add links to LinkedIn, professional websites, etc.</p>
                        )}
                        {socials.map((social, index) => (
                            <div key={index} className="flex flex-row gap-1 w-full">
                                <FormItem className="flex flex-row gap-2 w-full">
                                    <Input
                                        name="social"
                                        type="text"
                                        placeholder="https://platform.com/johndoe"
                                    />
                                </FormItem>
                                <Button
                                    size={"default"}
                                    variant="ghost"
                                    className="flex items-center gap-1 rounded-full"
                                    onClick={(event) => {
                                        // suppress form submit
                                        event.preventDefault();
                                        setSocials(socials.filter((_, i) => i !== index));
                                    }}
                                >
                                    <X size={64} />
                                </Button>
                            </div>
                        ))}
                        <div className="flex justify-center p-4">
                            <Button
                                onClick={(event) => {
                                    // suppress form submit
                                    event.preventDefault();
                                    setSocials([...socials, {}]);
                                }}
                                variant="outline"
                                className="rounded-full"
                            >
                                <Plus size={24} />
                                Add Social
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:flex md:justify-end gap-4 w-full">
                    <Button variant="secondary" size={"lg"} className="rounded-full">
                        Cancel
                    </Button>
                    <Button variant="default" size={"lg"} className="rounded-full">
                        Save & Search
                    </Button>
                </div>
            </form>
        </div>
    );
}
