import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene 
{       
    constructor()
    {
        super('game-over-scene')
    }

    init(data)
    {
        this.score = data.score
    }

    preload() 
    {
        this.load.image('background', 'images/bg_layer1.png')
        this.load.image('game-over-text', 'images/gameover.png')
        this.load.image('replay-button', 'images/replay.png')
    }

    create() 
    {
        this.add.image(240, 320, 'background')
        this.add.image(240, 280, 'game-over-text')
        
        this.replayButton = this.add.image(240, 420, 'replay-button').setInteractive()
        // berpindah ke bunny jump scene ketika button di klik
        this.replayButton.once('pointerup', () => { this.scene.start('math-fighter-scene')}, this)

        this.add.text(80, 150, 'SCORE:', { fontSize: '60px', fill: '#000'})
        // menambahkan nilai score
        this.add.text(300,150, this.score, {fontSize: '60px', fill: '#000'})
    }
}