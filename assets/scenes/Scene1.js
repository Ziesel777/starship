/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {

	constructor() {
		super("Scene1");
	}

	_create() {

		var flaime1__1 = this.add.sprite(351.31946, 438.2733, "special-fx", "flaime1-1");
		flaime1__1.anims.play("flame-ship");

		var flaime1_1 = this.add.sprite(417.99307, 438.47113, "special-fx", "flaime1-1");
		flaime1_1.anims.play("flame-ship");

		var playerShip = this.add.sprite(384.0, 405.0, "ships", "ship-1");
		playerShip.setScale(0.7, 0.7);

		var astr_1 = this.add.sprite(384.0, -29.837713, "asteroids", "astr-p-1");
		astr_1.setScale(0.6, 0.7);

		this.add.image(368.69324, 380.7754, "weapon", "shot-1");

		var shot__1 = this.add.sprite(401.02454, 367.58728, "weapon", "shot-1");
		shot__1.anims.play("shot");

		this.fPlayerShip = playerShip;
		this.fAstr_1 = astr_1;

	}



	/* START-USER-CODE */
	initOptionGame() {
		this.winH = this.sys.game.config.height;
		this.winW = this.sys.game.config.width;
		this.debug = this.sys.game.config.physics.arcade.debug;

		this.pSpeed = 200;

		this.creatAstrTime = 10000;
	}

	initGlobalVariable() {
		this.lastCreateTime = 5000;
		this.lastFired = 0;
		this.countShots = 0;
		this.score = 0;
	}

	preload() {
		this.initOptionGame();
		this.initGlobalVariable();
	}

	create() {
		if(this.debug) {
			this.fpsText = new FpsText(this);
		}

		this.textScore = new Score(this);
		this.playerShip = new Ship(this,384.0, 405.0, "ship-1");

		this.asteroids = this.add.group({
			maxSize: 5,
			runChildUpdate: true
		});

		this.bullets = this.add.group({
			classType: Shotgun,
			maxSize: 10,
			runChildUpdate: true
		});


		this.physics.add.overlap(this.playerShip, this.asteroids, this.hitShipToAstr);
		this.physics.add.overlap(this.bullets, this.asteroids, this.hitBulletToAstr);

		this.cursors = this.input.keyboard.createCursorKeys();

		this.drawSpace();
	}

	update(time,delta) {
		if(this.debug) {
			this.fpsText.update();
		}
		this.textScore.update();

		// Создание астеройдов
		if(this.lastCreateTime && time > this.lastCreateTime) {
			this.asteroids.add(this.createAsteroid());
			this.lastCreateTime = time + this.creatAstrTime;
		}

		this.playerShip.update();
		this.initKeyPlayer(time);
	}

	// отрисовка космоса
	drawSpace() {
		this.parts = this.add.group({
			runChildUpdate: true
		});

		for(let i=0; i<100; i++) {
			let posX = Phaser.Math.Between(0, this.winW);
			let posY = Phaser.Math.Between(0, this.winH);
			let scale = Phaser.Math.Between(7, 11);
			let alpha = Phaser.Math.Between(30, 100);

			let speed = Phaser.Math.GetSpeed(50, 1);

			let part = this.add.image(posX,posY,'weapon','parts');
			part.setScale(scale/10);
			part.alpha = alpha/100;
			part.setDepth(-1);

			part.update = (time, delta) => {
				part.y += speed * delta;
				posX = Phaser.Math.Between(0, this.winW);

				if(part.y > this.winH) {
					part.y = 0;
					part.x = posX;
				}
			};

			this.parts.add(part);

		}
	}

	createAsteroid() {
		let x = Phaser.Math.Between(0, this.winW);
		let y = -this.winH/3;

		let astr = new Asteroid(this, x, y, 'astr-1');

		return astr;
	}

	hitShipToAstr(ship, astr) {
		let scene = astr.scene;

		astr.y = -astr.height * 3;
		astr.x = Phaser.Math.Between(0, astr.scene.winW);
		astr.scene.cameras.main.shake(500,0.003);

		scene.score -= astr.option.score*2;
	}
	hitBulletToAstr(bullet,astr){
		let scene = astr.scene;

		astr.healt -= bullet.power;
		scene.score += bullet.option.score;

		bullet.destroy();
		astr.shothit();
		bullet.hitDestroy(astr.scene);
		astr.scene.cameras.main.shake(100,0.001);

		if(astr.healt < 0) {
			astr.hitDestroy(astr.scene);
			astr.destroy();

			scene.score += astr.option.score;
		}
	}

	initKeyPlayer(time){
		if(this.cursors.left.isDown) {
			this.playerShip.body.setVelocityX(-this.pSpeed);
			this.playerShip.body.setAccelerationX(this.pSpeed + 50);
			this.playerShip.setFrame('ship-1-left');
		} else if(this.cursors.right.isDown) {
			this.playerShip.body.setVelocityX(this.pSpeed);
			this.playerShip.body.setAccelerationX(-this.pSpeed - 50);
			this.playerShip.setFrame('ship-1-rigth');
		} else {
			this.playerShip.setFrame('ship-1');
		}

		if (this.cursors.space.isDown && time > this.lastFired){
			let bullet = this.bullets.get();

			if (bullet){
				bullet.fire(this.playerShip, this.countShots);

				this.lastFired = time + 100;
				this.countShots++;
			}
		}

		if(this.playerShip.body.velocity.x > -1 && this.playerShip.body.velocity.x < 1) {
			this.playerShip.body.setVelocityX(0);
			this.playerShip.body.setAccelerationX(0);
		}
		if(this.playerShip.x < this.playerShip.width/2) {
			this.playerShip.x = this.playerShip.width/2;
			this.playerShip.body.setVelocityX(0);
			this.playerShip.body.setAccelerationX(0);
		}

		if(this.playerShip.x > (this.winW - this.playerShip.width/2)) {
			this.playerShip.x = (this.winW - this.playerShip.width/2);
			this.playerShip.body.setVelocityX(0);
			this.playerShip.body.setAccelerationX(0);
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
