class Asteroid extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, typeAsteroid){
		super(scene, x, y);

		let option = this.getOption(typeAsteroid);
		this.option = option;

		this.winH = this.scene.sys.game.config.height;
		this.winW = this.scene.sys.game.config.width;

		this.setTexture(option.texture);
		this.setFrame(option.frame);
		this.setScale(option.scale.x,option.scale.y);
		this.setSize(this.width*this.scaleX,this.height*this.scaleY/2, true);
		this.setDepth(10);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.speed = Phaser.Math.GetSpeed(option.speed.y, 1);
		this.healt = option.healt;
		this.power = option.power;

		this.parts = scene.add.group({
			// maxSize: 30,
			runChildUpdate: true
		});

		for(let i=0; i<100; i++) {
			let part = scene.add.image(-scene.winW,-scene.winH,'weapon','parts');

			part.update = () => {
				if(part.alpha <=0) {
					part.destroy();
				}
				part.alpha -= 0.001;
			};

			this.parts.add(part);
		}
	}

	update(time, delta) {
		this.move(delta);
	}

	/**
	 * В зависимости типа астройда возвращает нужные параметры
	 * @param {'astr-1'} typeAsteroid
	 */
	getOption(typeAsteroid) {
		switch (typeAsteroid) {
			case 'astr-1': {
				return {
					texture: 'asteroids',
					frame: 'astr-p-1',
					scale: {
						x: 0.6,
						y: 0.7
					},
					speed: {
						rotation: 1,
						y: 40
					},
					healt: 100,
					power: 5,
					score: 30
				};
			}
		}
	}

	move(delta, speedRotat = this.option.speed.rotation){
		this.angle += speedRotat;
		this.y += this.speed * delta;

		if(this.y > (this.winH + this.height)){
			this.y = -this.height * 3;
			this.x = Phaser.Math.Between(0, this.winW);
		}
	}

	shothit() {
		this.y -= 2;
		// this.scene.tweens.add({
		// 	targets: this,
		// 	duration: 200,
		// 	alpha: 0.7,
		// 	loop:3,
		// 	// hold: 100,
		// 	// yoyo: true,
		// 	onComplete: () => {
		// 		this.alpha = 1;
		// 	}
		// });
	}

	hitDestroy(scene) {
		for(let part of this.parts.getChildren()){
			let speedX =  Phaser.Math.Between(-100, 100);
			let speedY =  Phaser.Math.Between(-100, 100);

			part.x = this.x;
			part.y = this.y;

			scene.physics.add.existing(part);
			part.body.setVelocity(speedX, speedY);
		}
	}
}