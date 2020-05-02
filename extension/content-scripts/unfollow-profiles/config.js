export default {
    //sleep after unfollow from to in seconds
    sleepAfterUnfollow: {
        xShort: [2, 8], 
        short:[3, 10], 
        medium: [5, 45], 
        long: [10, 90], 
        xLong: [10, 165]},
    sleepBeforeStartUnfollow: 2250 // 1250 - 2250 (2250+ for very slov connection or user agent performance)
};