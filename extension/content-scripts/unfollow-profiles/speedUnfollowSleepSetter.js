const speedUnfollowSleepSetter = (profilesToUnfollowCount, store) => {
    if (profilesToUnfollowCount <= 3) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.xShort;
    if (profilesToUnfollowCount > 3 && profilesToUnfollowCount <= 6) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.short;
    if (profilesToUnfollowCount > 6 && profilesToUnfollowCount <= 20) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.medium;
    if (profilesToUnfollowCount > 20 && profilesToUnfollowCount <= 50) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.long;
    if (profilesToUnfollowCount > 50 && profilesToUnfollowCount <= 1000) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.long;
};

export default speedUnfollowSleepSetter;