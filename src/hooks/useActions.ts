import { trackSlice } from './../store/trackSlice';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(trackSlice.actions, dispatch)
}