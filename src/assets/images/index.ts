/* eslint-disable global-require */
type ImgName = 'logo';

export const Img = (name: ImgName) => {
    switch (name) {
        case 'logo':
            return require('./Logo.png');
        default:
            return null;
    }
};
