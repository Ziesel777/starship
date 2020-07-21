class Shotgun extends Phaser.GameObjects.Sprite {
	constructor(scene){
		super(scene, -scene.winW, -scene.winH, 'weapon', 'shot-1');
		this.setDepth(100);

		let option = this.getOption('shot-1');
		this.option = option;

		// this.winH = this.scene.sys.game.config.height;
		// this.winW = this.scene.sys.game.config.width;

		// this.setTexture(option.texture);
		// this.setFrame(option.frame);
		// this.setSize(this.width*this.scaleX,this.height*this.scaleY, true);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		// this.anims.play("shot");

		this.speed = Phaser.Math.GetSpeed(300, 1);
		this.power = option.power;

		this.parts = scene.add.group({
			// maxSize: 30,
			runChildUpdate: true
		});

		for(let i=0; i<50; i++) {
			let part = scene.add.image(-scene.winW,-scene.winH,'weapon','parts');

			part.update = () => {
				if(part.alpha <=0 ){
					part.destroy();
				}
				part.alpha -= 0.01;
			};

			this.parts.add(part);
		}
	}

	getOption(typeGun) {
		switch (typeGun) {
			case 'shot-1': {
				return {
					texture: 'weapon',
					frame: 'shot-1',
					scale: {
						x: 1,
						y: 1
					},
					speed: {
						rotation: 0,
						y: 0.4
					},
					power: 10,
					score: 5
				};
			}
		}
	}

	fire(ship, countShots) {
		let posX = 20;
		let posY = 0;

		if(countShots%2==0) {
			this.setPosition(ship.x + posX, ship.y + posY);
		} else {
			this.setPosition(ship.x - posX, ship.y + posY);
		}


		this.setActive(true);
		this.setVisible(true);
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

	update(time, delta) {
		this.y -= this.speed * delta;

		if (this.y < -50)
		{
			this.setActive(false);
			this.setVisible(false);
		}

		this.createParts();
	}

	createParts() {
		let x = this.x + Phaser.Math.Between(-2, 2);
		let y = this.y;

		let part = this.scene.add.image(x,y,'weapon','parts');
		part.update = () => {
			if(part.alpha <=0 ){
				part.destroy();
			}
			part.alpha -= 0.05;
		};

		this.parts.add(part);
	}
}