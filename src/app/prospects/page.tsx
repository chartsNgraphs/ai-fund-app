import ProspectSearchBar from "./prospect-search-bar";
import { DataTableDemo } from "./prospect-table";

export default async function Prospects() {


    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <ProspectSearchBar />
            <DataTableDemo />
        </div>
    );
}