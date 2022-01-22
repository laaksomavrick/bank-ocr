export const isError = (x: any): x is Error => {
    return x && x.message !== undefined;
};
