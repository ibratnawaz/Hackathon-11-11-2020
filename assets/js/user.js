async function fetchUser() {
    try {
        let url = window.location.href.split('=');
        let user = url[1];
        let searchUserApi = `https://api.github.com/users/${user}`
        let res = await fetch(searchUserApi);
        let data = await res.json();
        console.log(data);
        document.getElementById('user-pic').src = `${data.avatar_url}`;
        document.getElementById('name').innerHTML = `${data.name}`;
        document.getElementById('username').innerHTML = `${data.login}`;
        document.getElementById('user-bio').innerHTML = `${data.bio}`;
        document.getElementById('repo-count').innerHTML = `${data.public_repos}`;
        document.getElementById('following-count').innerHTML = `${data.followers}`;
        document.getElementById('followers-count').innerHTML = `${data.following}`;
        document.getElementById('btn-user-git').href = `${data.html_url}`;
        document.getElementById('location').innerHTML = `<i class='fas fa-map-marker-alt'></i> ${data.location}`;
        await getRepo(data.repos_url);
    } catch (error) {
        console.error(error);
    }
}

async function getRepo(repoLink) {
    let res = await fetch(repoLink);
    let data = await res.json();
    console.log(data);
    let box = document.getElementById('repo-box');
    data.forEach(obj => {
        let div = createMyTag('div', 'border-tp mt-4');
        let name = createMyTag('a', 'repo text-primary');
        name.innerHTML = `${obj.name}`;
        name.href = `${obj.html_url}`;
        let timeBox = createMyTag('span', 'd-flex flex-row mt-2');
        let time = createMyTag('p', 'repo-list text-secondary');
        let dateTime=obj.updated_at.split('T');
        time.innerHTML = `Last Updated on  ${dateTime[0]}`;
        timeBox.appendChild(time);
        div.append(name, timeBox);
        box.appendChild(div);
    });
}

let createMyTag = (tagName, className = '') => {
    let ele = document.createElement(tagName);
    ele.setAttribute('class', className);
    return ele;
}

fetchUser();