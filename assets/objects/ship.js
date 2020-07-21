class Ship extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, typeShip){
		super(scene, x, y);

		let option = this.getOption(typeShip);
		this.option = option;

		this.winH = this.scene.sys.game.config.height;
		this.winW = this.scene.sys.game.config.width;

		this.setTexture(option.texture);
		this.setFrame(option.frame);
		this.setScale(option.scale.x,option.scale.y);
		this.setSize(this.width*this.scaleX,this.height*this.scaleY, true);
		this.setDepth(1);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.createFlame(scene);

		this.healt = option.healt;
	}

	getOption(typeShip) {
		switch (typeShip) {
			case 'ship-1': {
				return {
					texture: 'ships',
					frame: 'ship-1',
					scale: {
						x: 0.7,
						y: 0.7
					},
					healt: 500,
				};
			}
		}
	}

	update(time, delta) {
		this.moveFlame();
	}

	moveFlame(){
		if(this.scene.cursors.left.isDown) {
			this.flame1.x = this.x-36;
			this.flame2.x = this.x+21;

			this.flame1.y = this.y+31;
			this.flame2.y = this.y+31;

		} else if(this.scene.cursors.right.isDown) {
			this.flame1.x = this.x-21;
			this.flame2.x = this.x+38;

			this.flame1.y = this.y+31;
			this.flame2.y = this.y+31;
		} else {
			this.flame1.x = this.x-33;
			this.flame2.x = this.x+33;

			this.flame1.y = this.y+33;
			this.flame2.y = this.y+33;
		}
	}

	createFlame(scene) {
		this.flame1 = scene.add.sprite(this.x-33, this.y+33, "special-fx", "flame1-1");
		this.flame1.anims.play("flame-ship");

		this.flame2 = scene.add.sprite(this.x+33, this.y+33, "special-fx", "flame1-1");
		this.flame2.anims.play("flame-ship");
	}
}