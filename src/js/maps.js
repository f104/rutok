import $ from 'jquery';
import Scrollbar from 'smooth-scrollbar';

let maps = {

    cnts: [],
    zoom: 15,

    init: function () {
        maps.app = this;

        this.document.ready(() => {
            maps.cnts = document.querySelectorAll('.js-map');
            if (maps.cnts.length) {
                maps.loadYmaps();
            }
        });

    },

    initMap(cnt) {
        const mapCnt = cnt.querySelector('.js-map__cnt');
        if (!mapCnt) {
            return;
        }
        mapCnt.id = app.uniqID();
        const map = new ymaps.Map(mapCnt.id, {
            center: [55.753215, 37.622504],
            zoom: 11,
            controls: []
        }, {
            suppressMapOpenBlock: true,
            // autoFitToViewport: 'always',
        });
        // map.behaviors.disable('scrollZoom');
        const tplPlacemark = ymaps.templateLayoutFactory.createClass(
            `<div id="pm_{{ properties.id }}" class="placemark {{ properties.active }}">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28"><path d="M14 0c-2.054 0-4.107.441-6.01 1.324C4.146 3.11 1.324 6.522.36 10.596A13.47 13.47 0 002.876 22l1.086 1.387c.58.74 1.22 1.432 1.918 2.068l6.486 5.912a2.424 2.424 0 003.266 0l6.486-5.912a16.843 16.843 0 001.918-2.068L25.123 22a13.47 13.47 0 002.518-11.404c-.965-4.074-3.787-7.487-7.631-9.272A14.273 14.273 0 0014 0z" fill="currentColor"/><path d="M14.003 5.471a7.536 7.536 0 00-3.162.694l-.05.024a2.053 1.997 0 00-.002 0c-1.996.922-3.452 2.683-3.95 4.777a6.92 6.92 0 001.432 6.027 7.397 7.397 0 005.685 2.647h.09c2.212 0 4.301-.98 5.686-2.647a6.92 6.92 0 001.432-6.027c-.498-2.094-1.954-3.855-3.95-4.777a2.053 1.997 0 00-.002 0l-.05-.024a7.526 7.526 0 00-3.16-.694z" fill="#fff"/></svg>
            </div>`
        );

        const om = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 128,
            geoObjectOpenBalloonOnClick: false,
        });
        om.objects.options.set({
            iconLayout: tplPlacemark,
            iconImageSize: [34, 48],
            iconShape: {
                type: 'Rectangle',
                // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                coordinates: [
                    [-14, -32], [14, 0]
                ]
            }
        });
        om.clusters.options.set({
            preset: 'islands#darkBlueClusterIcons',
            hasBalloon: false,
            hasHint: false,
        });

        let items = [];
        let geoItems = {
            type: 'FeatureCollection',
            features: [],
        }
        cnt.querySelectorAll('[data-geo]').forEach((item, index) => {
            let geo = item.dataset.geo;
            if (geo) {
                geo = geo.split(',');
                if (geo.length === 2) {
                    geo[0] = parseFloat(geo[0].trim());
                    geo[1] = parseFloat(geo[1].trim());
                    geoItems.features.push({
                        type: 'Feature',
                        id: index,
                        geometry: { type: 'Point', coordinates: geo },
                        properties: {
                            id: `${mapCnt.id}_${index}`,
                            // active: index == 0 ? '_active' : '',
                        }
                    });
                    items.push(item);
                }
            }
        });
        om.add(geoItems);

        map.geoObjects.events.once('add', (e) => {
            setTimeout(() => {
                let selectedId = items.findIndex(item => {
                    return item.querySelector('input:checked');
                });
                this.selectObject(mapCnt, items, selectedId);
            }, 200);
        });
        map.geoObjects.add(om);

        this.setBounds(map);

        om.objects.events.add('click', e => this.selectObject(mapCnt, items, e.get('objectId'), true));
        items.forEach((item, id) => {
            item.addEventListener('click', () => {
                map.setCenter(om.objects.getById(id).geometry.coordinates, this.zoom)
                    .then(() => {
                        setTimeout(() => {
                            this.selectObject(mapCnt, items, id)
                        }, 200);
                    });
            });
        });

        if (!$(mapCnt).is(':visible')) {
            app.document.one(app.tabChangedEventName, (e, $tab) => {
                this.setBounds(map);
                setTimeout(() => {
                    let selectedId = items.findIndex(item => {
                        return item.querySelector('input:checked');
                    });
                    this.selectObject(mapCnt, items, selectedId);
                }, 200);
            });
        }

    },

    setBounds(map) {
        map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 30
        });
    },

    selectObject(mapCnt, items, objectId, scroll = false) {
        mapCnt.querySelectorAll('.placemark').forEach(el => el.classList.remove('_active'));
        mapCnt.querySelector(`#pm_${mapCnt.id}_${objectId}`)?.classList.add('_active');
        items[objectId].querySelector('input').checked = true;
        if (scroll && items[objectId].parentNode.parentNode.parentNode.classList.contains('js-scrollbar')) {
            let scrollbarCnt = items[objectId].parentNode.parentNode.parentNode;
            if (scrollbarCnt.classList.contains('js-scrollbar')) {
                let scrollbar = Scrollbar.get(scrollbarCnt);
                scrollbar.scrollTo(0, items[objectId].offsetTop, 200);
            }
        }
    },

    initMaps() {
        maps.cnts.forEach(cnt => maps.initMap(cnt));
    },

    loadYmaps() {
        if (typeof (ymaps) === 'undefined') {
            $.ajax({
                url: `//api-maps.yandex.ru/2.1/?apikey=${app.yandexKey}&lang=ru_RU`,
                dataType: 'script',
                cache: true,
                success: () => ymaps.ready(this.initMaps),
            });
        } else {
            ymaps.ready(this.initMaps);
        }
    },



};

export default maps;
