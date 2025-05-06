import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WealthSnapshotDisplay(props: {data: WealthSnapshot}) {
    const { data } = props;

    return (
        <Card className="w-full h-full p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 md:col-span-2">
                    <h2 className="text-xl font-semibold">{`Wealth Snapshot`}</h2>
                    <div>
                        <span className="text-sm font-medium">{`Net Worth: $${data.estimatedNetWorth.toLocaleString()}`}</span>
                        <Progress value={data.estimatedNetWorth / 10000000 * 100} className="w-full mt-2" />
                    </div>
                    <div>
                        <span className="text-sm font-medium">{`Giving Potential: $${data.givingPotential.toLocaleString()}`}</span>
                        <Progress value={data.givingPotential * 15} className="w-full mt-2" />
                    </div>
                    <div className="mt-4">
                        <p className="text-sm">{data.summary}</p>
                    </div>
                </div>
                {/* Giving Quality Card */}
                <div className="h-full border rounded-lg p-4 flex flex-col items-center justify-center bg-muted">
                    <h1 className="text-primary text-2xl">{data.prospectGivingScore}</h1>
                    <span className="flex items-center gap-1 mt-2">
                        <h2 className="text-sm font-semibold text-muted-foreground">Donor Quality Score</h2>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Info className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground"/>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-2">
                                <p className="text-sm">This score is based on a combination of factors, including net worth, giving potential, and other financial indicators.</p>
                            </PopoverContent>
                        </Popover>
                    </span>
                </div>
            </div>
        </Card>
    );
}