const uid = '879145354573000714'; 

document.getElementById('consentButton').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';

    const video = document.getElementById('backgroundVideo');
    video.muted = false; 
});

function fetchUserData(uid) {
    fetch(`https://discord-lookup-api-alpha.vercel.app/v1/user/${uid}`)
        .then(response => response.json())
        .then(data => {
            const { avatar, banner, global_name, banner_color } = data;

            let avatarUrl = avatar
                ? `https://cdn.discordapp.com/avatars/${uid}/${avatar.id}`
                : `https://cdn.discordapp.com/embed/avatars/${uid % 5}.png`; 
            if (avatar && avatar.is_animated) {
                avatarUrl += '.gif?size=1024'; 
            } else {
                avatarUrl += '.png?size=1024'; 
            }
            document.getElementById('avatar').src = avatarUrl;

            let displayUsername = global_name || "Anonymous";
            document.getElementById('username').innerHTML = displayUsername; 

            const avatarIsGif = avatar && avatar.is_animated;
            if (avatarIsGif) {
                document.getElementById('avatar').classList.add('gif-avatar');
            } else {
                document.getElementById('avatar').classList.remove('gif-avatar');
            }

            const bannerElement = document.getElementById('banner');
            if (banner) {
                let bannerUrl = `https://cdn.discordapp.com/banners/${uid}/${banner.id}`;
                if (banner.is_animated) {
                    bannerUrl += '.gif?size=1024'; 
                } else {
                    bannerUrl += '.png?size=1024'; 
                }
                bannerElement.style.backgroundImage = `url(${bannerUrl})`;
            } else {
                bannerElement.style.backgroundColor = banner_color || "#111214";
            }

        })
        .catch(error => {
            console.error('Error fetching Discord data:', error);

            document.getElementById('avatar').src = 'fallback-avatar-url.jpg'; // Local fallback avatar
            document.getElementById('username').textContent = 'Error loading data';
        });
}

fetchUserData(uid);
