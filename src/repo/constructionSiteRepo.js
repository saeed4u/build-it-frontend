import Repository from "./Repository";

const endPoint = "/api/construction-site";

export default {
    async getConstructionSites() {
        console.log('called')
        if (localStorage.getItem('cons')) {
            let storedData = JSON.parse(localStorage.getItem('cons'));
            console.log(storedData);
            if (storedData) {
                return storedData;
            }
        }

        let { data } = await Repository.get(`${endPoint}`)
        const cons = data.map((cons) => {
            return {
                value: cons._id,
                text: cons.address
            }
        });
        localStorage.setItem('cons', JSON.stringify(cons));
        return cons;
    }
}
