import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus } from "lucide-react";
import { Address } from "@/model/shared/address";

interface AddressSubformProps {
    addresses: Array<Address>;
    setAddresses: (addresses: Array<Address>) => void;
}

const AddressSubform: React.FC<AddressSubformProps> = ({ addresses, setAddresses }) => {
    return (
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
                        event.preventDefault();
                        setAddresses([...addresses, {} as unknown as Address]);
                    }}
                    variant="secondary"
                    className="rounded-full"
                >
                    <Plus size={24} />
                    Add Address
                </Button>
            </div>
        </Card>
    );
};

export default AddressSubform;