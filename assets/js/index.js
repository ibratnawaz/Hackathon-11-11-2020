async function fetchUser() {
    try {
        document.getElementById('error').style.display = 'none';
        document.getElementById('loading').style.display = 'inline';
        let name = document.getElementById('search').value;
        let searchUserApi = `https://api.github.com/search/users?q=${name}`
        let res = await fetch(searchUserApi);
        let data = await res.json();
        let container = document.getElementById('container');
        container.innerHTML = '';
        if (data.total_count > 0) {
            document.getElementById('loading').style.display = 'none';
            data.items.forEach(obj => {
                let card = createMyTag('div', 'card');
                let userImg = createMyTag('div', 'user-img');
                let img = createMyTag('div', 'img');
                img.style.backgroundImage = `url(${obj.avatar_url})`;
                userImg.appendChild(img);
                let cardBody = createMyTag('div', 'card-body');
                let title = createMyTag('h5', 'card-title');
                title.innerHTML = `${obj.login}`;
                let link = createMyTag('a', 'btn btn-primary');
                link.href = `user.html?user=${obj.login}`;
                link.target = 'blank';
                link.innerHTML = `See More`;
                cardBody.append(title, link);
                card.append(userImg, cardBody);
                container.appendChild(card);
            });
        } else {
            document.getElementById('error').style.display = 'inline';
            document.getElementById('loading').style.display = 'none';
        }

    } catch (error) {
        console.error(error);
    }
}

let createMyTag = (tagName, className = '') => {
    let ele = document.createElement(tagName);
    ele.setAttribute('class', className);
    return ele;
}