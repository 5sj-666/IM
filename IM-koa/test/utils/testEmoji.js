
// import {getImgNames} from '../../src/utils/getEmoji';
const { getImgNames, translate, saveImg } = require('../../src/utils/getEmoji');

saveImg().then(
    res => {
        console.log(res);
    }
)