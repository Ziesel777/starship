
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "StarShip",
    "width": 800,
    "height": 450,
    "type": Phaser.AUTO,
    "backgroundColor": "#000",
    "parent": "game-container",
    "render": {"pixelArt": true},
	"physics": {
		default: "arcade",
		arcade: {
			// debug: true,
			debug: false,
		},
	},
    "scale": {
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
    }
	});
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/pack.json");
	}

	create() {
		this.scene.start("Scene1");
	}

}
