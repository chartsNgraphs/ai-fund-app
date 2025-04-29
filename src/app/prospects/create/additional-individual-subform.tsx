import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Check, ChevronsUpDown } from "lucide-react";
import { AdditionalPerson } from "@/model/prospects/prospect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface AdditionalIndividualSubformProps {
  additionalIndividuals: AdditionalPerson[];
  setAdditionalIndividuals: (individuals: AdditionalPerson[]) => void;
}

export default function AdditionalIndividualSubform({
  additionalIndividuals,
  setAdditionalIndividuals,
}: AdditionalIndividualSubformProps) {
  const allowedRelations = [
    {
      value: "Spouse",
      label: "Spouse",
    },
    {
      value: "Parent",
      label: "Parent",
    },
    {
      value: "Sibling",
      label: "Sibling",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  return (
    <div className="p-4 lg:col-span-2 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-semibold text-primary">
                Additional Individuals
            </h1>
            <Button
                onClick={(event) => {
                    event.preventDefault();
                    setAdditionalIndividuals([
                        ...additionalIndividuals,
                    {} as unknown as AdditionalPerson,
                    ]);
                }}
                variant="secondary"
                className="rounded-full"
                >
                <Plus size={24} />
                Add Individual
            </Button>
        </div>
        <div className="flex flex-col-reverse gap-4">
      {additionalIndividuals.map((individual, index) => (
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
                setAdditionalIndividuals(
                  additionalIndividuals.filter((_, i) => i !== index)
                );
              }}
            >
              <Trash size={64} />
            </Button>
          </div>
          <FormItem>
            <Label htmlFor={`firstName-${index}`}>First Name</Label>
            <Input
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                const updatedIndividuals = [...additionalIndividuals];
                updatedIndividuals[index] = {
                  ...updatedIndividuals[index],
                  firstName: e.target.value,
                };
                setAdditionalIndividuals(updatedIndividuals);
              }}
              defaultValue={individual.firstName || ""}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor={`lastName-${index}`}>Last Name</Label>
            <Input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                const updatedIndividuals = [...additionalIndividuals];
                updatedIndividuals[index] = {
                  ...updatedIndividuals[index],
                  lastName: e.target.value,
                };
                setAdditionalIndividuals(updatedIndividuals);
              }}
              defaultValue={individual.lastName || ""}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth</Label>
            <Input
              type="date"
              placeholder="Date of Birth"
              onChange={(e) => {
                const updatedIndividuals = [...additionalIndividuals];
                updatedIndividuals[index] = {
                  ...updatedIndividuals[index],
                  dateOfBirth: e.target.value,
                };
                setAdditionalIndividuals(updatedIndividuals);
              }}
              defaultValue={individual.dateOfBirth || ""}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor={`relation-${index}`}>Relation</Label>
            <Popover >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={false}
                  className="w-full justify-between bg-card"
                >
                  {individual.relationship || "Select relation..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search relation..." />
                  <CommandList>
                    <CommandEmpty>No relation found.</CommandEmpty>
                    <CommandGroup>
                      {allowedRelations.map((relation) => (
                        <CommandItem
                          key={relation.value}
                          value={relation.value}
                          onSelect={(currentValue) => {
                            const updatedIndividuals = [...additionalIndividuals];
                            updatedIndividuals[index] = {
                              ...updatedIndividuals[index],
                              relationship: currentValue,
                            };
                            setAdditionalIndividuals(updatedIndividuals);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              individual.relationship === relation.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {relation.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        </div>
      ))}
      </div>
    </div>
  );
}