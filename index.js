async function fetchUser() {
    try {
        document.getElementById('loading').style.display = 'inline';
        name = document.getElementById('search').value;
        // let searchUserApi=`https://api.github.com/`
        let searchUserApi = `https://api.github.com/search/users?q=${name}`
        let res = await fetch(searchUserApi);
        let data = await res.json();
        console.log(data);
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
                link.href = `${obj.html_url}`;
                link.target = 'blank';
                link.innerHTML = `Visit Github Profile`;
                cardBody.append(title, link);
                card.append(userImg, cardBody);
                container.appendChild(card);
            });
        } else {
            document.getElementById('error').style.display = 'inline';
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