(function () {
	'use strict';

	/*
	* Используется для анимации планеты на странице колонизации
	* https://xcraft.ru/colonization.html?sp=9
	* */


	var PLAYABLE = false;
	var READY = false;
	var PREPARING = false;

	var SCREEN_HEIGHT = $('#three_canvas').height(); // window.innerHeight;
	var SCREEN_WIDTH = $('#three_canvas').width(); // window.innerWidth;

	// Путь до картинок
	var IMAGES_PATH = '/images/planets/overview3d/';

	// Канвас уже есть на странице
	var $canvas = $('#three_canvas');

	var camera, scene, bg_1, bg_stars_1, bg_stars_2, renderer, cloud, planet, plane, sphere2;

	var TexLoader = new THREE.TextureLoader();

	var camera_position = {
		normal4 : {
			look: new THREE.Vector3(-28,24,0),
			position: new THREE.Vector3(0,0,150)
		}
	};

	var textures_cache = false;
	var textures = {
		"planet" : {
			"map" : "planet.jpg",
			"atmosphere" : "atmosphere.jpg",
			"glow" : "glow.png",
			"bump" : "bump.jpg"
		},
		"background" : {
			bg : {
				img : "background.jpg",
				gradient : "gradient.jpg"
			},
			stars_2 : {
				map : "stars_2.png",
				alpha : "stars_2.png"
			},
			stars_1 : {
				map : "stars_1.png",
				alpha : "stars_1.png"
			}
		}
	};

	if (Main.getConfig('isBattlePage')) {
		init();
	} else {
		// Запуск после каждой загрузки страницы
		$(window).on('postloadpage', bindAfterLoading);

		// Проверка после загрузки скрипта
		bindAfterLoading();
	}

	// Делает проверку и решает нужно ли запускать анимацию
	function bindAfterLoading() {
		if (!PREPARING && !READY && getPlanetImage()){
			PREPARING = true;
			init();
		}

		if (['overview', ''].indexOf(Main.getPage()) == -1 || !getPlanetImage()) {
			stop();
			return false;
		}

		if (getPlanetImage() != 'normal4'){
			stop();
			return false;
		}

		if (!Main.getConfig('anim3d') && Main.getPage() != "") {
			stop();
			return false;
		}

		if (READY){
			play();
		}
	}

	function Clone(obj) {
		if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
			return obj;

		var temp = obj.constructor(); // changed

		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				obj['isActiveClone'] = null;
				temp[key] = Clone(obj[key]);
				delete obj['isActiveClone'];
			}
		}

		return temp;
	}

	// Остановка анимации
	function stop() {
		PLAYABLE = false;
		$canvas.hide();
	}

	// Запуск анимации
	function play() {

		// Уже проигрывается
		if (PLAYABLE) {
			return true;
		}

		if (!READY){
			return true;
		}

		PLAYABLE = true;

		var planet_type = getPlanetImage();

		if (camera_position[planet_type]){
			if (Main.getPage() == ""){
				camera.position.x = 0;
				camera.position.y = 0;
				camera.position.z = 150;

				camera.lookAt(new THREE.Vector3(0,0,0));
			} else {
				camera.position.x = camera_position[planet_type].position.x;
				camera.position.y = camera_position[planet_type].position.y;
				camera.position.z = camera_position[planet_type].position.z;

				camera.lookAt(camera_position[planet_type].look);
			}
		} else {
			camera.position.x = 0;
			camera.position.y = 0;
			camera.position.z = 100;

			camera.lookAt(new THREE.Vector3(0,0,0));
		}

		render();
		$canvas.show();
	}

	function loadTextures (textures, cb){
		if (typeof textures == "object"){
			var count = 0;

			for (var k in textures){
				count ++;

				(function (k){
					loadTextures(textures[k], function (res){
						count--;

						if (res){
							textures[k] = res;
						}

						if (count == 0){
							cb();
						}
					});
				})(k);
			}

			return true;
		}

		TexLoader.load(IMAGES_PATH + getPlanetImage() + "/" + textures, cb);
	}

	function createScene(){
		//Камера орографическая (вид сверху)
		camera = new THREE.PerspectiveCamera(36, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1e7);

		window.CAMERA = camera;

		camera.position.z = 150;
		//camera.lookAt(new THREE.Vector3(-25, 29, 0));

		// Управление сценой
		/*controls = new THREE.TrackballControls(camera);

		controls.rotateSpeed = 5.0;
		controls.zoomSpeed = 1;
		controls.panSpeed = 1;

		controls.noRotate = true;
		controls.noZoom = true;
		controls.noPan = true;

		controls.minDistance = 100;
		controls.maxDistance = 900;

		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;*/

		scene = new THREE.Scene();

		renderer = new THREE.WebGLRenderer({canvas: $canvas[0], antialias: false, alpha: false});
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(window["devicePixelRatio"]);
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		renderer.sortObjects = false;

		// Легкий мягкий свет
		var ambient = new THREE.AmbientLight(0x333333);
		scene.add(ambient);

		// Направленный свет
		var light = new THREE.DirectionalLight(0xFFFFFF, 1.2);
		light.position.set(0,-25,15);
		scene.add(light);

		createObjects();

		window.addEventListener('resize', onWindowResize, false);

		/*controls.addEventListener('change', function(){
			// поворачиваем атмосферу чтобы смотрела в камеру
			if (plane){
				plane.lookAt(camera.position);
			}

			if (camera && planet){
				if (camera && planet){
					if (camera.position.distanceTo(planet.position) < 100){
						camera.position.normalize().multiplyScalar(100);
					}
				}
			}

			// двигаем фон
			if (bg_1){
				bg_1.position.x = camera.position.x;
				bg_1.position.y = camera.position.y;
				bg_1.position.z = camera.position.z;
			}

			if (sphere2){
				sphere2.position.x = camera.position.x;
				sphere2.position.y = camera.position.y;
				sphere2.position.z = camera.position.z;
			}

			return true;

			if (bg_stars_1){
				bg_stars_1.position.x = camera.position.x;
				bg_stars_1.position.y = camera.position.y;
				bg_stars_1.position.z = camera.position.z;
			}

			if (bg_stars_2){
				bg_stars_2.position.x = camera.position.x;
				bg_stars_2.position.y = camera.position.y;
				bg_stars_2.position.z = camera.position.z;
			}

			if (bg_cloud_1){
				bg_cloud_1.position.x = camera.position.x;
				bg_cloud_1.position.y = camera.position.y;
				bg_cloud_1.position.z = camera.position.z;
			}
		});*/
	}

	function createObjects(){
		createBackgroundSpace();
		createPlanet();
		createCloud();
		createGlow();

		READY = true;

		if (Main.getConfig('isBattlePage')) {
			play();
		} else {
			bindAfterLoading();
		}

	}

	// Инициализируем сцену
	function init() {
		stop();

		textures_cache = Clone(textures);

		loadTextures(textures_cache, createScene);
	}

	function createGlow() {
		var geometry = new THREE.PlaneGeometry( 70, 70, 1 );
		var material = new THREE.MeshBasicMaterial({
			map: textures_cache.planet.glow,
			alphaMap: textures_cache.planet.glow,
			transparent: true,
			side: THREE.DoubleSide
		});

		plane = new THREE.Mesh( geometry, material );

		plane.position.set(planet.position.x, planet.position.y, planet.position.z);

		scene.add(plane);

		plane.lookAt(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z));

		return plane;
	}

	function createPlanet() {
		var map = textures_cache.planet.map;
		var bump = textures_cache.planet.bump;

		var material = new THREE.MeshPhongMaterial({
			map: map,
			bumpMap: bump,
			bumpScale: 0.25,
			needsUpdate: true,
			fog: false
		});

		var geometry = new THREE.SphereGeometry(30, 64, 64);

		planet = new THREE.Mesh(geometry, material);
		scene.add(planet);

		return planet;
	}

	function createCloud() {
		var map = textures_cache.planet.atmosphere;

		var material = new THREE.MeshPhongMaterial({
			map: map,
			alphaMap: map,
			fog: false,
			transparent: true
		});

		var geometry = new THREE.SphereGeometry(30.2, 32, 32);
		cloud = new THREE.Mesh(geometry, material);

		scene.add(cloud);

		return cloud;
	}

	function createBackgroundSpace() {
		var texture = textures_cache.background.bg.img;

		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.x = 12;
		texture.repeat.y = 7;

		var materialBg = new THREE.MeshBasicMaterial({
			map: texture,
			fog: false,
			side: THREE.BackSide
		});

		var geometry1 = new THREE.SphereGeometry(26000, 32, 32);
		bg_1 = new THREE.Mesh(geometry1, materialBg);
		scene.add(bg_1);

		var texture_stars_2 = textures_cache.background.stars_2.map;

		texture_stars_2.wrapS = THREE.RepeatWrapping;
		texture_stars_2.wrapT = THREE.RepeatWrapping;
		texture_stars_2.repeat.x = 12;
		texture_stars_2.repeat.y = 7;

		// Звезды два
		var txt_bg_stars_2 = new THREE.MeshBasicMaterial({
			map: texture_stars_2 ,
			//alphaMap: textures_cache.background.stars_2.alpha,
			fog: false,
			side: THREE.BackSide,
			transparent: true
		});

		var geo_bg_stars_2 = new THREE.SphereGeometry(25000, 32, 32);
		bg_stars_2 = new THREE.Mesh(geo_bg_stars_2, txt_bg_stars_2);

		scene.add(bg_stars_2);

		var texture_stars_1 = textures_cache.background.stars_1.map;

		texture_stars_1.wrapS = THREE.RepeatWrapping;
		texture_stars_1.wrapT = THREE.RepeatWrapping;
		texture_stars_1.repeat.x = 4;
		texture_stars_1.repeat.y = 2;

		// Звезды два
		var txt_bg_stars_1 = new THREE.MeshBasicMaterial({
			map: texture_stars_1,
			//alphaMap: textures_cache.background.stars_2.alpha,
			fog: false,
			side: THREE.BackSide,
			transparent: true
		});

		var geo_bg_stars_1 = new THREE.SphereGeometry(24500, 32, 32);
		bg_stars_1 = new THREE.Mesh(geo_bg_stars_1, txt_bg_stars_1);

		scene.add(bg_stars_1);


		var gradient = new THREE.MeshPhongMaterial({
			color: 0x000000,
			alphaMap: textures_cache.background.bg.gradient,
			fog: false,
			side: THREE.BackSide,
			transparent: true
		});

		var geometry2 = new THREE.SphereGeometry(24000, 32, 32);
		sphere2 = new THREE.Mesh(geometry2, gradient);
		scene.add(sphere2);

		bg_1.position.x = sphere2.position.x = bg_stars_2.position.x = bg_stars_1.position.x = camera.position.x;
		bg_1.position.y = sphere2.position.y = bg_stars_2.position.y = bg_stars_1.position.y = camera.position.y;
		bg_1.position.z = sphere2.position.z = bg_stars_2.position.z = bg_stars_1.position.z = camera.position.z;
	}

	function onWindowResize() {
		if (Main.getPage() == ""){
			SCREEN_HEIGHT	= $(".canvas").innerHeight();
			SCREEN_WIDTH	= $(".canvas").innerWidth();

			renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

			camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
			camera.updateProjectionMatrix();
		} else {
			SCREEN_HEIGHT = window.innerHeight;
			SCREEN_WIDTH = window.innerWidth;

			renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

			camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
			camera.updateProjectionMatrix();
		}
	}

	function getPlanetImage() {
		if (Main.getPage() == ""){
			return "normal4";
		}

		if (Main.getConfig('isBattlePage')) {
			return Main.getConfig('planetImage')
		} else {
			return Animation.bg3d.getPlanetType()
		}
	}

	function canPlanetRotate() {
		if (Main.getPage() == ""){
			return true;
		}

		if (Main.getConfig('isBattlePage')) {
			return false;
		} else {
			return !Interface.BattleWatcher.isCombat()
		}

	}

	// TODO развел мусорник
	// Ограничение фпс
	var fps = 30;
	var then = Date.now();
	var interval = 1000 / fps;
	var delta;

	function render() {
		//controls.update();

		requestAnimationFrame(render);

		var now = + Date.now();
		delta = now - then;

		if (delta > interval) {
			then = now - (delta % interval);

			if (canPlanetRotate()) {
				planet.rotation.y -= 0.001;
				cloud.rotation.y += 0.0015;
			}

			bg_1.rotation.y += 0.0001;
			bg_stars_1.rotation.y -= 0.0001;
			bg_stars_2.rotation.y += 0.0002;
			bg_stars_2.rotation.x += 0.0001;

			renderer.render(scene, camera);
		}
	}
})();