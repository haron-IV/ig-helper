let testsResults = {
    localStorageTests: {
        test_BotDataStats: null,
        test_globalDataBot: null,
        test_CalendarData: null
    }
}

// -------------------------------------------------------------------------------------------------------------- \\
//                                             localStorage tests

function test_BotDataStats () {
    if ( localStorage.getItem('CalendarData') ) {
        testsResults.localStorageTests.test_BotDataStats = true;
    } else {
        testsResults.localStorageTests.test_BotDataStats = false;
    }
}

function test_globalDataBot () {
    if ( localStorage.getItem('GlobalDataBot') ) {
        testsResults.localStorageTests.test_globalDataBot = true;
    } else {
        testsResults.localStorageTests.test_globalDataBot = false;
    }
}

function test_CalendarData () {
    if ( localStorage.getItem('CalendarData') ) {
        testsResults.localStorageTests.test_CalendarData = true;
    } else {
        testsResults.localStorageTests.test_CalendarData = false;
    }
}

function initLocalStorageTests () {
    test_BotDataStats();
    test_globalDataBot();
    test_CalendarData();
}

//                                            END localStorage tests
// -------------------------------------------------------------------------------------------------------------- \\


function initTests () {
    initLocalStorageTests();
}