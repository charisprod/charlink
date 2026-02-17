const bioData = [
    {
        name: 'Your Name',
        titleImg: "/logo.png",  // set to false or path to photo in public folder 
        online: true,
        url: '#', //redirect when someone click your online status
        avatar: '/avatar.jpg', //put your profile photo to public folder
        nftAvatar: true,
        description: 'About You',
        descShow: true,
        subdesc: 'OPTIONAL',
        subdescShow: true,
        spotify: true, //set to true/false
        spotifyText: 'Recently Played',
        // Use https://spotify-github-profile.kittinanx.com/api/login
        // check 'Open in Spotify'
        spotifyUrl: 'https://spotify-github-profile.kittinanx.com/api/view?uid=8glrlrg13vyc6hu8tgw6sfvez&redirect=true', // first url
        spotifyImg: 'https://spotify-github-profile.kittinanx.com/api/view?uid=8glrlrg13vyc6hu8tgw6sfvez&cover_image=true&theme=natemoo-re&show_offline=false&background_color=121212&interchange=false&profanity=false&bar_color=53b14f&bar_color_cover=false', // second url
        social: 'twitter, instagram, tiktok, youtube', // use coma to show multi-social
        socialUrl: 'https://x.com/agcrisbp/status/1904658124411429374, https://www.instagram.com/p/Ct16XZCpv7V, https://www.tiktok.com/@agcrisbp/video/6880275352669736193, https://youtu.be/RxYCX6P9EvI',
        bsky: true,
        bskyUname: 'aghea.xyz',
        bskyTheme: 'light',
    },
];

export default bioData;
