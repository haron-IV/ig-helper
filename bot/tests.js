let testsResults = {
    localStorageTests: {
        test_BotDataStats: null,
        test_globalDataBot: null,
        test_CalendarData: null
    },


    failedTests: [],

    passed: 0,
    failed: 0
}

function addOnePassed () {
    testsResults.passed++;
}

function addOneFailed () {
    testsResults.failed++;
}

function addFailedTestName (test_name) {
    testsResults.failedTests.push(test_name)
}

// -------------------------------------------------------------------------------------------------------------- \\
//                                             localStorage tests

function test_BotDataStats () {
    const test_name = 'test_BotDataStats';

    if ( localStorage.getItem('CalendarData') ) {
        testsResults.localStorageTests.test_BotDataStats = true;
        addOnePassed();
    } else {
        testsResults.localStorageTests.test_BotDataStats = false;
        addOneFailed();
        addFailedTestName(test_name);
    }
}

function test_globalDataBot () {
    const test_name = 'test_globalDataBot';

    if ( localStorage.getItem('GlobalDataBot') ) {
        testsResults.localStorageTests.test_globalDataBot = true;
        addOnePassed();
    } else {
        testsResults.localStorageTests.test_globalDataBot = false;
        addOneFailed();
        addFailedTestName(test_name);
    }
}

function test_CalendarData () {
    const test_name = 'test_CalendarData';

    if ( localStorage.getItem('CalendarData') ) {
        testsResults.localStorageTests.test_CalendarData = true;
        addOnePassed();
    } else {
        testsResults.localStorageTests.test_CalendarData = false;
        addOneFailed();
        addFailedTestName(test_name);
    }
}

function initLocalStorageTests () {
    test_BotDataStats();
    test_globalDataBot();
    test_CalendarData();
}

//                                            END localStorage tests
// -------------------------------------------------------------------------------------------------------------- \\

function showTestLog () {
    const tr = testsResults;
}

function initTests () {
    initLocalStorageTests();
}