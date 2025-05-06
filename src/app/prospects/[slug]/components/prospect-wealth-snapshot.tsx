import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Prospect } from "@/model/prospects/prospect";

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
                    <h2 className="text-sm font-semibold text-muted-foreground">Donor Quality Score</h2>
                </div>
            </div>
        </Card>
    );
}