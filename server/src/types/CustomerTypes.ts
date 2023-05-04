interface ICustomer {
    address: string;
    region: string;
    dates: string[];
}

interface ICustomerTable {
    header: string[];
    rows: ICustomer[];
}

export { ICustomer, ICustomerTable };