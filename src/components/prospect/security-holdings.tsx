import { SecurityHolding } from "@/model/profiles/sec-data";
import { Table, TableRow, TableCell, TableBody, TableHeader, TableFooter } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

/**
 * Display the total holdings of insider securities.
 * @param props - The list of security holdings to display.
 * @returns 
 */
export default function SecurityHoldingsDisplay(props: {holdings: SecurityHolding[]}) {

    if (!props.holdings || props.holdings.length === 0) {
        return (
            <Card className="w-full h-full p-4">
                <h2 className="text-xl font-semibold">{`Security Holdings`}</h2>
                <p className="text-sm">No known current holdings.</p>
            </Card>
        );
    }

    const totalValueSum = props.holdings.reduce((sum, holding) => sum + holding.totalValue, 0);

    return (
        <Card className="w-full h-full p-4">
            <h2 className="text-xl font-semibold">{`Security Holdings`}</h2>
            <Table className="w-full mt-4">
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Ticker</TableCell>
                        <TableCell>Shares Owned</TableCell>
                        <TableCell>Total Value</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.holdings.map((holding, index) => (
                        <TableRow key={index}>
                            <TableCell>{holding.name}</TableCell>
                            <TableCell>{holding.ticker}</TableCell>
                            <TableCell>{holding.sharesOwned.toLocaleString()}</TableCell>
                            <TableCell>{holding.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="font-semibold">Total</TableCell>
                        <TableCell>{totalValueSum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    );

}