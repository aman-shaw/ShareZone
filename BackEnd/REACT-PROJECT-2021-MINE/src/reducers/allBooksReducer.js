export default (state = [], action) => {
    switch (action.type) {
        case 'ALL_BOOKS':
            return action.payload;
        default:
            return state;
    }
}