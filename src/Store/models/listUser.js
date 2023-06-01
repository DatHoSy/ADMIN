import { dataUser } from "../../js/dataUser";

export const listUser = {
    state: {
        dataUser: []
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        setData(state, dataUser) {
            return {
                state,
                dataUser // cach 1: phai trung ten moi map vao list tren
            }
        },

        setAddData(state, addUser) {
            return {dataUser: [...addUser]}; // cach 2: trai mang ra, add vao list dataUser
        },

        // setRemoveData(state, removeUser) {
        // },
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        //   async incrementAsync(payload, rootState) {
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //     dispatch.count.increment(payload);
        //   },
        async getAll() {
            const data = await fetch('https://dummyjson.com/users')
                .then(res => res.json());
            this.setData(data.users)
        }
    }),
};