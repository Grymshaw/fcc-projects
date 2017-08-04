export default class WeatherWidget {
    constructor(url = 'https://fcc-weather-api.glitch.me/') {
        this.url = url;
        this.data = {};
    }

    loadWeather(url, callback) {
        //$.ajax({
        //    url: url,
        //    success: function(data) {
        //        callback(null, data);
        //    }
        //});
        console.log('in loadWeather()');
        console.log('weather url: ' + this.url);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ( () => {
            if(this.readyState === 4 && this.status === 200) {
                callback(this);
            }
            xhr.open('GET', url);
            xhr.send();
        });
    }

    setData(xhr) {
        console.log("In setData()");
        const json = JSON.parse(xhr.responseText);
        console.log(json);
        this.data = {
            'temperature': json.main.temp,
            'main': json.weather[0].main,
            'desc': json.weather[0].description,
            'icon': json.weather[0].icon
        };
    }

    getData() {
        return this.data;
    }

    render() {
    }

    cacheDom() {
    }

}
