
export const listProduct = {
    state: {
        products: []
    },
    reducers: {
        setData(state, products) {
            return {
                state,
                products
            }
        },
    },
    effects: (dispatch) => ({
        async getAll() {
            const data = await fetch('https://dummyjson.com/products')
                .then(res => res.json());
            this.setData(data.products)
        }
    }),
};