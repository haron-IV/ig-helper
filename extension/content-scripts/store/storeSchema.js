import unfollowingConfig from "../unfollow-profiles/config.js";

const storeSchema = {
    igHelperStore: {
        initialized: false, //change on first use extension or after clearing data
        following: {
            followedProfiles: []
        },
        unfollowing: {
            unfollowingConfig
        }
    }
};

export default storeSchema;