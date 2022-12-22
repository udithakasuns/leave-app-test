/* eslint-disable global-require */
type ImgName = 'logo' | 'user';

export const Img = (name: ImgName) => {
    switch (name) {
        case 'logo':
            return require('./Logo.png');
        case 'user':
            return require('./User.png');
        default:
            return null;
    }
};
