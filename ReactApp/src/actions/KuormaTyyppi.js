
import api from './api';


export const ACTION_TYPES = {

    FETCH_ALL_FORCETYPE: 'FETCH_ALL_FORCETYPE'
}



export const fetchAll2 = () => dispatch => {
    api.KuormaTyyppi().fetchAll2()
        .then(response => {
            console.log(response)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_FORCETYPE,
                payload: response.data
            })
        }
        )
        .catch(err => console.log(err))
}
