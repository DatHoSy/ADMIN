
export const listCustomer = {
    state: {
        customers: []
    },
    reducers: {
        setData(state, customers) {
            return {
                state,
                customers
            }
        },
    },
    effects: (dispatch) => ({
        async getAll() {
            const data = await fetch('https://dummyjson.com/users')
                .then(res => res.json());
            this.setData(data.users)
        }
    }),
};