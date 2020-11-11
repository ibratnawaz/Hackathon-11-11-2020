async function fetchUser() {
    try {
        let url = window.location.href.split('?');
        let user=url[1];
        let searchUserApi = `https://api.github.com/users/${user}`
        let res = await fetch(searchUserApi);
        let data = await res.json();
        console.log(data);
        document.getElementById('user-pic').src=`${data.avatar_url}`;
        document.getElementById('name').innerHTML=`${data.name}`;
        document.getElementById('username').innerHTML=`${data.login}`;
        document.getElementById('user-bio').innerHTML=`${data.bio}`;
        document.getElementById('following-count').innerHTML=`${data.followers}`;
        document.getElementById('followers-count').innerHTML=`${data.following}`;
        document.getElementById('following-link').href=`${data.following_url}`;
        document.getElementById('followers-link').href=`${data.followers_url}`;
        document.getElementById('btn-user-git').href=`${data.html_url}`;
        document.getElementById('location').innerHTML=`<i class='fas fa-map-marker-alt'></i> ${data.location}`;
    } catch (error) {
        console.error(error);
    }
}

fetchUser();