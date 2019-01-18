function test(message) {
    console.group('test');
        console.log('Test 1:'+message);
    console.groupEnd('test')
}

export default test;