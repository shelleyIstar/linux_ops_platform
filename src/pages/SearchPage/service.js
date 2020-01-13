import { withPrefix } from '@/utils/request';
import { stringify } from 'qs';
const request = withPrefix();

export function getCpuList(data) {
    return request(`/api/cpu/list?${stringify(data)}`);
}

export function deleteCpuItem(values) {
    // console.log('values', values);
    return request(`/api/cpu/list`, {
        method: 'DELETE',
        body: {
            ip: values
        },
    });
}

// export function postSendData(values) {
//   // console.log('values', values);
//   return request(`/v1/service/api_test`, {
//     method: 'POST',
//     body: values,
//   });
// }

// export function getCallLogs(value) {
//   return request(`/v1/service/call_logs?pageNum=${value.pageNum}&pageSize=${value.pageSize}`);
// }

// export function getOwnCollectLog(data) {
//   return request(`/v1/service/call_logs?${data}`);
// }

// export function postCollect(values) {
//   return request(`/v1/service/update_call_logs`, {
//     method: 'POST',
//     body: values,
//   });
// }
