const randomTimeAfterUnfollow = (from, to) => {
    from = from * 1000;
    to = to * 1000;
    return Math.floor(Math.random() * (to - from + 1) + from);
};

export default randomTimeAfterUnfollow;