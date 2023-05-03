interface IContractor {
    name: string;
    address: string;
    regions: string[];
    weekdays: string[];
}

interface IContractorTable {
    header: string[];
    rows: IContractor[];
}

export { IContractor, IContractorTable };