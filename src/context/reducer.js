const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'CLEAR_USER':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export default reducer;