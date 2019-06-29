import Repository from "./Repository";

const endPoint = "/api/suppliers";

export default {
    async getSuppliers() {
        if (localStorage.getItem('suppliers')) {
            let storedData = JSON.parse(localStorage.getItem('suppliers'));
            console.log(storedData);
            if (storedData) {
                return storedData;
            }
        }

        let { data } = await Repository.get(`${endPoint}`)
        console.log('data = ' + data);
        const suppliers = data.map((supplier) => {
            return {
                value: supplier._id,
                text: supplier.name
            }
        });
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        return suppliers;
    }
};
