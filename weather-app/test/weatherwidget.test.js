const expect = require('chai').expect;
const should = require('chai').should();
import sinon from 'sinon';
import WeatherWidget from '../src/js/weather-widget.js';

describe('WeatherWidget', function() {
    const weatherWidget = new WeatherWidget();
    const requests = [];
    after(function() {
        jQuery.ajax.restore();
    });
    describe('#loadWeather(url, callback)', function() {
        it('makes a GET request for weather data', function() {
            const fakeUrl = 'url/to/visit';
            sinon.stub(jQuery, 'ajax');
            weatherWidget.loadWeather(fakeUrl, sinon.spy());
            assert(jQuery.ajax.calledWithMatch({ url: fakeUrl }));
        });
        it('should run the callback with url passed in', function() {
            const cb = sinon.spy();
            const proxy = weatherWidget.loadWeather('test', cb);
            proxy();

            expect(cb.called).to.be(true);
            expect(cb.callCount).to.equal(1);
            //expect(requests.length).to.be(1);
            //expect(requests[0].url).to.be('test');
        });
        it('should return an xhttp request', function() {
        });
    });
});
