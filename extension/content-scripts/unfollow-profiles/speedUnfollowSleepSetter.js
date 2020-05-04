const speedUnfollowSleepSetter = (profilesToUnfollowCount, store) => {
    if (profilesToUnfollowCount <= 6) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.xShort;
    if (profilesToUnfollowCount > 6 && profilesToUnfollowCount <= 12) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.short;
    if (profilesToUnfollowCount > 12 && profilesToUnfollowCount <= 30) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.medium;
    if (profilesToUnfollowCount > 30 && profilesToUnfollowCount <= 50) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.long;
    if (profilesToUnfollowCount > 50 && profilesToUnfollowCount <= 100) return store.igHelperStore.unfollowing.unfollowingConfig.sleepAfterUnfollow.long;
};

export default speedUnfollowSleepSetter;