export const GLOBALTYPES = {
    AUTH: 'AUTH',
    ALERT: 'ALERT',
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    USER_TYPE: 'USER_TYPE',
    SOCKET: 'SOCKET'
};

export const EditData = (data, id, post) => {
    // eslint-disable-next-line no-underscore-dangle
    const newData = data.map((item) => (item._id === id ? post : item));
    return newData;
};

export const DeleteData = (data, id) => {
    // eslint-disable-next-line no-underscore-dangle
    const newData = data.filter((item) => item._id !== id);
    return newData;
};
