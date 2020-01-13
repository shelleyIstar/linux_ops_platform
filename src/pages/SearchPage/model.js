import { getCpuList, deleteCpuItem } from './service';

export default {
    namespace: 'cpu',
    state: {
        cpuData: {
            items: [],
            pageSize: 10,
            pageNum: 1,
            total: 0,
            _code: 200
        },
    },
    effects: {
        *fetchGetList({ payload, callback }, { call, put }) {
            const response = yield call(getCpuList, payload);
            if (callback && typeof callback === 'function') {
                callback(response);
            }
        },
        // *fetchOwnCollect({ payload, callback }, { call, put }) {
        //   const response = yield call(getOwnCollectLog, payload);
        //   if (callback && typeof callback === 'function') {
        //     callback(response);
        //   }
        // },
        *fetchItemDelete({ payload, callback }, { call, put }) {
            const response = yield call(deleteCpuItem, payload);
            if (callback && typeof callback === 'function') {
                callback(response);
            }
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
