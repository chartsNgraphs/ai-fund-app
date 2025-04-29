import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface SocialsSubformProps {
    socials: Array<string>;
    setSocials: (socials: Array<string>) => void;
}

const SocialsSubform: React.FC<SocialsSubformProps> = ({ socials, setSocials }) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-primary">Socials & Links</h1>
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
        </div>
    );
};

export default SocialsSubform;