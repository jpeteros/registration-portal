export default (state, action) =>{
    switch(action.type) {
        case 'DELETE':
            return {
                ...state,
                users: state.users.filter(user => {
                    return user.id !== action.payload;
                })
            }
        case 'ADD_USER' :
            return {
                ...state,
                users: [action.payload, ...state.users],
                isLogged: true
            }
        case 'EDIT_USER' :
            const updateUser = action.payload;
            const updateUsers = state.users.map(user=> {
                if(user.id === updateUser.id) {
                    return updateUser;
                }
                return user;
            });
            return {
                ...state,
                users: updateUsers
            }
            case 'LOGIN' :
                return {
                    ...state,
                    isLogged: true
                }
        default: 
        return state
    }
}