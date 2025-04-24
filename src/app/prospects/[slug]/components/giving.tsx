"use client";

import { Prospect } from "@/model/prospects/prospect";
import { PoliticalContribution } from "@/model/profiles/political-contribution";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export default function Giving(props: { politicalGifts: PoliticalContribution[] }) {

    const { politicalGifts } = props;

    const [gifts, setGifts] = useState<PoliticalContribution[]>(politicalGifts || []);

    useEffect(() => {
        const fakeContribution: PoliticalContribution = {
            candidateId: "12345",
            committee: {
                id: "67890",
                name: "Fake Committee",
                type: "PAC",
                state: "CA",
                city: "Los Angeles",
                zip: "90001",
                createdAt: "2023-01-01",
                cycle: 2024,
                party: "Independent"
            },
            candidateName: "John",
            candidateLastName: "Doe",
            candidateMiddleName: "A",
            contributionReceiptAmount: 500,
            contributorFirstName: "Jane",
            contributorLastName: "Smith",
            contributorAddress: {
                addressOne: "123 Main St",
                addressTwo: "Apt 4B",
                city: "Los Angeles",
                state: "CA",
                zip: "90001"
            },
            contributorEmployer: "Tech Corp",
            contributorOccupation: "Engineer",
            contributionReceiptDate: "2023-10-01"
        };

        setGifts([fakeContribution]);
    }, []);

    return (
        <Card className="w-full p-4 mt-8">
            <h2 className="text-xl font-semibold mb-4">Giving History</h2>
            <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value="political-gifts" className="w-full">
                    <AccordionTrigger className="font-medium text-md w-full">
                        Political Gifts ({gifts.length})
                    </AccordionTrigger>
                    <AccordionContent className="text-sm p-2 w-full">
                        {gifts.map((gift, index) => (
                            <div key={index} className="flex flex-col gap-1 border-b pb-2 mb-2">
                                <span className="text-sm font-medium">{`${gift.candidateName} ${gift.candidateLastName}`}</span>
                                <span className="text-sm">{`Amount: $${gift.contributionReceiptAmount}`}</span>
                                <span className="text-sm">{`Date: ${gift.contributionReceiptDate}`}</span>
                                <span className="text-sm">{`Committee: ${gift.committee.name}`}</span>
                                <span className="text-sm">{`Campaign Cycle: ${gift.committee.cycle}`}</span>
                                <span className="text-sm">{`Committee State: ${gift.committee.state}`}</span>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}