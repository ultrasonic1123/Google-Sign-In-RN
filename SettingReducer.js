const initialState = {
    darkMode: false
}

export default SettingReducer = ( state = initialState, data ) => {
    //console.log('setting reducer', data)
    switch (data.type) {
        case 'CHANGE_THEME':
            return { ...state, darkMode: data.data }
        default:
            return state;
    }

};