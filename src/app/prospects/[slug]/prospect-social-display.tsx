import { ProspectSocialLink } from "@/model/prospects/prospect";


export default function ProspectSocialDisplay(props: { socials: ProspectSocialLink[] }) {
    const { socials } = props;

    console.log("ProspectAddressInformation", socials);

    return (
        <div className="w-full">
            <h1 className="text-md font-medium">Social Media & Links</h1>
            <div className="flex flex-col gap-1">
                {socials.length ? socials.map((social, index) => (
                    <div key={index} className="flex flex-row gap-1 text-black-100">
                        <span className="text-sm font-medium">{`${social.type}`}</span>
                        <span className="text-sm pl-2">{`${social.url}`}</span>
                    </div>
                )):
                    <span className="text-sm pt-1 text-gray-600">No social media links added yet.</span>}
        </div>
        </div>
    )

}