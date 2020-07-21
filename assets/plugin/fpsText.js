class FpsText extends Phaser.GameObjects.Text{
	constructor(scene) {
		super(scene, 0, 0, '', { color: 'white', fontSize: '8px' });
		scene.add.existing(this);
		this.setOrigin(0);
		this.setDepth(999);
	}

	update() {
		this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
	}
}

