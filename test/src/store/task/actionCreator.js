// import Api from '../../api';
// import actions from './actionTypes';
// import * as keyCode from '../../api/keyCode';

export default {
	GET_TASKLIST: (callback) => {
		return (dispatch) => {
			// Api.getTaskList('?page=1&search=').then((res) => {
			// 	if(res.code === keyCode.SUCCESS){
			// 		res.data.forEach((task) => (task['checked'] = false));
			// 		callback && callback(res)
			// 		dispatch({
			// 			type: actions.SET_TASKLIST,
			// 			list: res.data,
			// 			page_sum: res.page_sum
			// 		});
			// 	}
			// })
		};
	}
};
