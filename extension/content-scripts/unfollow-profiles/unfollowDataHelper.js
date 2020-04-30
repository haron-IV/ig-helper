const updateUnfollowResults = (unfollowResults, profile) => {
    unfollowResults.unfollowedProfilesCount++;
    const profileName = profile.replace("https://www.instagram.com/", "");
    unfollowResults.unfollowedProfiles.push( profileName.substring(0, profileName.length - 1) );
};

export { updateUnfollowResults };