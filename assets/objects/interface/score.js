class Score extends Phaser.GameObjects.Text{
	constructor(scene,x=10,y=10) {
		super(scene, x, y, '', { color: 'white', fontSize: '12px' });
		scene.add.existing(this);
		this.setOrigin(0);
		this.setDepth(999);

		this.scene = scene;
	}

	update() {
		this.setText(`score: ${this.scene.score}`);
	}
}
