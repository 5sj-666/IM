const {translate} = require('../src/utils/getEmoji');

test('翻译输入 微笑', async () => {
    let result = await translate('微笑');
    expect(result).toMatch('smile')
});
test('翻译输入 空值', async () => {
    let result = await translate('');
    expect(result).toMatch('empty_input')
})
test('翻译输入 undefined', async () => {
    let result = await translate(undefined);
    expect(result).toMatch('empty_input')
})