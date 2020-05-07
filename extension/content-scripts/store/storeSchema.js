import unfollowingConfig from "../unfollow-profiles/config.js";

const storeSchema = {
    igHelperStore: {
        initialized: false, //change on first use extension or after clearing data
        following: {
            followedProfiles: []
        },
        unfollowing: {
            unfollowingConfig
        },
        savedProfiles: [],
        menu: {
            lastPosition: ""
        },
        userProfile: {
            profileLink: null,
            profileImg: null,
            followers: 0,
            followed: 0,
            archive: {} //archive there followers followed
        }
    }
};

export default storeSchema;