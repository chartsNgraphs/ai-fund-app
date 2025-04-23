"use client";

import { Card } from "@/components/ui/card";
import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Loader2, Plus, Trash, X } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import createProspectAction from "../actions/create-prospect-action";
import editProspectAction from "../actions/edit-prospect-action";
import { Address } from "@/model/shared/address";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Prospect } from "@/model/prospects/prospect";
import { permanentRedirect, redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

/**
 * 
 * @param props Page to create a prospect, also used to edit a prospect.
 */
export default function CreateProspectPage(props: { prospect?: Prospect, mode?: string }) {
    const { prospect: initialProspect } = props;
    const { mode } = props;
    const isEditMode = mode === "edit";
    const toast = useToast();
    const [addresses, setAddresses] = useState<Array<Address>>(initialProspect?.addresses || []);
    const [socials, setSocials] = useState<Array<string>>(initialProspect?.socials.map(
        (social) => social.url
    ) || []);

    const [employer, setEmployer] = useState<string>(initialProspect?.employer || "");

    const [prospect, setProspect] = useState<Prospect>(initialProspect || {} as unknown as Prospect);

    const [isError, setIsError] = useState(false);

    const handleSubmit = async (prevState: any, formData: FormData) => {
        // append array of addresses to formData
        formData.append("addresses", JSON.stringify(addresses));

        // append array of socials to formData
        formData.append("socials", JSON.stringify(socials));

        // append employer to formData
        formData.append("employer", employer);

        if (isEditMode) {
            const editResults = await editProspectAction(initialProspect?.id!, formData);
            if (!editResults.success) {
                setIsError(true);
                setProspect(editResults.prospect || prospect);
                return {
                    message: "Error editing prospect",
                }
            }
            else {
                setIsError(false);
                toast.toast({
                    title: "Prospect Edited",
                    description: "The prospect has been edited successfully.",
                    variant: "default",
                });
                permanentRedirect("/prospects/" + initialProspect?.id);
            }
        }

        else {
            const creationResults = await createProspectAction(formData);
            if (!creationResults.success) {
                setIsError(true);
                setProspect(creationResults.prospect);
                return {
                    message: "Error creating prospect",
                }
            }
            else {
                setIsError(false);
                toast.toast({
                    title: "Prospect Created",
                    description: "The prospect has been created successfully.",
                    variant: "default",
                });
                redirect("/prospects");
            }

        }

    }

    const [actionState, action, pending] = useActionState(handleSubmit, {
        message: "",
    } as unknown as any);

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
                    {isEditMode ? `Edit Prospect Details` : `Create a Prospect`}
                </h1>
                <p className=" m-1 text-s mb-1 md:mb-5">
                    {isEditMode ? `Update personal & address details here.` : `Add some basic details here, let our ✨magic✨ fill out the rest!`}
                </p>
            </div>
            {
                actionState?.message && (
                    <Alert variant="destructive" className="mb-4" >
                        <AlertTitle>{`Something went wrong`}</AlertTitle>
                        {isError && <AlertDescription>{actionState.message}</AlertDescription>}
                    </Alert>
                )
            }
            <form className="space-y-4" action={action}>
                <Card className="p-4">
                    <h1 className="text-xl text-primary font-semibold">Basic Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input name="firstName" type="text" placeholder="First Name" defaultValue={prospect?.firstName} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input name="lastName" type="text" placeholder="Last Name" defaultValue={prospect?.lastName} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" placeholder="Email" defaultValue={prospect?.email} />
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
                                defaultValue={prospect?.phone}
                            />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                name="dateOfBirth"
                                type="date"
                                placeholder="Date of Birth"
                                defaultValue={prospect?.dateOfBirth?.toString()}
                            />
                        </FormItem>
                    </div>
                </Card>
                <Card className="p-4">
                    <h1 className="text-xl text-primary font-semibold">Occupation and Education</h1>
                    <FormItem>
                        <Label htmlFor="employer">Employer</Label>
                        <Input
                            name="employer"
                            type="text"
                            placeholder="Employer"
                            defaultValue={employer}
                            onChange={(e) => {
                                setEmployer(e.target.value);
                            }}
                        />
                    </FormItem>
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
                                <div className="grid row-span-2 gap-4">
                                    <FormItem>
                                        <Label htmlFor={`street-${index}`}>Street Address</Label>
                                        <Input
                                            type="text"
                                            placeholder="Street"
                                            onChange={(e) => {
                                                const updatedAddresses = [...addresses];
                                                updatedAddresses[index] = {
                                                    ...updatedAddresses[index],
                                                    street: e.target.value,
                                                };
                                                setAddresses(updatedAddresses);
                                            }}
                                            defaultValue={address.street || ""}
                                        />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor={`street2-${index}`}>Street Address 2</Label>
                                        <Input
                                            type="text"
                                            placeholder="Street"
                                            onChange={(e) => {
                                                const updatedAddresses = [...addresses];
                                                updatedAddresses[index] = {
                                                    ...updatedAddresses[index],
                                                    street2: e.target.value,
                                                };
                                                setAddresses(updatedAddresses);
                                            }}
                                            defaultValue={address.street2 || ""}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem>
                                    <Label htmlFor={`city-${index}`}>City</Label>
                                    <Input
                                        type="text"
                                        placeholder="City"
                                        onChange={(e) => {
                                            const updatedAddresses = [...addresses];
                                            updatedAddresses[index] = {
                                                ...updatedAddresses[index],
                                                city: e.target.value,
                                            };
                                            setAddresses(updatedAddresses);
                                        }}
                                        defaultValue={address.city || ""}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor={`state-${index}`}>State</Label>
                                    <Input
                                        type="text"
                                        placeholder="State"
                                        onChange={(e) => {
                                            const updatedAddresses = [...addresses];
                                            updatedAddresses[index] = {
                                                ...updatedAddresses[index],
                                                state: e.target.value,
                                            };
                                            setAddresses(updatedAddresses);
                                        }}
                                        defaultValue={address.state || ""}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor={`zip-${index}`}>Zip</Label>
                                    <Input
                                        type="text"
                                        placeholder="Zip"
                                        onChange={(e) => {
                                            const updatedAddresses = [...addresses];
                                            updatedAddresses[index] = {
                                                ...updatedAddresses[index],
                                                zip: e.target.value,
                                            };
                                            setAddresses(updatedAddresses);
                                        }}
                                        defaultValue={address.zip || ""}
                                    />
                                </FormItem>
                            </div>
                        ))}
                        <div className="flex justify-center p-4">
                            <Button
                                onClick={(event) => {
                                    // suppress form submit
                                    event.preventDefault();
                                    setAddresses([...addresses, {} as unknown as Address]);
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
                                        type="text"
                                        placeholder="https://platform.com/johndoe"
                                        onChange={(e) => {
                                            socials[index] = e.target.value;
                                            setSocials([...socials]);
                                        }}
                                        defaultValue={social || ""}
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
                                disabled={socials[socials.length - 1] === ""}
                                onClick={(event) => {
                                    // suppress form submit
                                    event.preventDefault();
                                    setSocials([...socials, ""]);
                                }}
                                variant="outline"
                                className={`rounded-full`}
                            >
                                <Plus size={24} />
                                Add Social
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:flex md:justify-end gap-4 w-full">
                    <Button
                        variant="ghost"
                        size={"lg"}
                        className="rounded-full"
                        onClick={(event) => {
                            event.preventDefault();
                            window.history.back();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="secondary"
                        size={"lg"}
                        className="rounded-full"
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                    >
                        Save for Later
                    </Button>
                    <Button variant="default" size={"lg"} className="rounded-full">
                        {
                            pending && (
                                <Loader2 className="animate-spin mr-2" size={16} />
                            )
                        }
                        {isEditMode ? 'Save Changes' : 'Create Prospect Profile'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
