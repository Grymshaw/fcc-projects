let url = 'https://api.twitch.tv/kraken/',
    cid = 'dzdzc39v7jd52plu6dh9t3hf2f10p4',
    headers = [
        { header: 'Accept', value: 'application/vnd.twitchtv.v5+json' },
        { header: 'Client-ID', value: cid }
    ];

let search = document.getElementsByClassName('search__input')[0];
let cardContainer = document.getElementsByClassName('card-container')[0];

search.addEventListener('keypress', (event) => {
    if(event.which === 13) {
        let searchTerm = search.value;
        let formattedData;
        get(`${url}/search/channels?query=${encodeURI(searchTerm)}`, headers).then((data) => {
            formattedData = formatSearchData(data);
            return Promise.resolve(
                formattedData.map((currentData) => {
                    return get(`${url}streams/${currentData.id}`, headers);
                })
            );
        }).then((newData) => {
            return Promise.all(newData);
        }).then((isStreamingData) => {
            formattedData = appendStreamingData(isStreamingData, formattedData);
            cardContainer.innerHTML = '';
            formattedData.forEach((user) => {
                appendStreamInfoElement(user);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
});

function appendStreamInfoElement(user) {
    cardContainer.innerHTML +=
        `<div class="card user-card">
            <div class="card__header">
                <img class="card__avatar" src="${user.userLogo}" alt=${"user icon for " + user.displayName}>
            </div>
            <div class="card__body">
                <span class="user-stat user-stat--name">
                    <a target="_blank" class="channel-link" href="${user.url}">${user.displayName}</a>
                    <span class="user-stat user-stat--status">
                        <span class="status-icon ${user.isStreaming ? "status-icon--online" : "status-icon--offline"}"></span>
                            ${user.isStreaming ? "Online" : "Offline"}
                        <span class="user-stat user-stat--viewers">${user.viewers}</span>
                        </span>
                    </span>
                </span>
                <span class="user-stat user-stat--title">${user.streamTitle}</span>
                <span class="user-stat user-stat--game">Playing ${user.game}</span>
            </div>
        </div>`
    ;
}

function appendStreamingData(streamData, existingData) {
    return existingData.map((current, index) => {
        console.log(streamData[index].stream);
        current.isStreaming = streamData[index].stream !== null;
        if(current.isStreaming) {
            current.viewers = streamData[index].stream.viewers;
        }
        else {
            current.viewers = 0;
        }
        return current;
    });
}

function formatSearchData(data) {
    if(data._total >= 1) {
        const formattedData = data.channels.map((current) => {
            return {
                displayName: current.display_name,
                game: current.game,
                userLogo: current.logo,
                streamTitle: current.status,
                url: current.url,
                id: current._id
            };
        });
        return formattedData;
    } else {
        return null;
    }
}

function getTwitchUserId(user) {
    return new Promise((resolve, reject) => {
        let req = get(url+'users?login='+user+'&client_id='+cid, headers);

    });
}

function get(url, headers) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        if(headers) {
            headers.map((current) => {
                xhr.setRequestHeader(current.header, current.value);
                return '';
            });
        }
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

function getUserData(username) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + 'users?login=summit1g' + '&client_id=' + cid);
        xhr.setRequestHeader('Accept', 'applicatoin/vnd.twitchtv.v5+json');
        xhr.onload = function() {
            resolve(JSON.parse(xhr.response));
        };
        xhr.onerror = function() {
            reject(xhr.statusText);
        };
        xhr.send();
    });
}
