import Phaser from 'phaser'
export default class MathFighterScene extends
Phaser.Scene
{
constructor()
{
    super('math-fighter-scene')
}
init()
{
    this.gameHalfWidth = this.scale.width * 0.5
    this.gameHalfHeight = this.scale.height * 0.5
    this.player = undefined // ini tadi sebelumnya sama sama player
    this.enemy = undefined
    this.slash = undefined
    this.startGame = false
    this.questionText = undefined
    this.resultText = undefined
    this.button1 = undefined
    this.button2 = undefined
    this.button3 = undefined
    this.button4 = undefined
    this.button5 = undefined
    this.button6 = undefined
    this.button7 = undefined
    this.button8 = undefined
    this.button9 = undefined
    this.button0 = undefined
    this.buttonDel = undefined
    this.buttonOk = undefined
    this.numberArray = []
    this.number = 0
    this.question = []

}
preload()
{
    this.load.image('background', 'images/bg_layer1.png')
    this.load.image('fight-bg', 'images/fight-bg.png')
    this.load.image('tile', 'images/tile.png')
    this.load.image('start-btn', 'images/start_button.png')

    this.load.spritesheet('player', 'images/warrior1.png',{
        frameWidth:80, frameHeight:80
    })

    this.load.spritesheet('enemy', 'images/warrior2.png',{       // ini tadi gambarnya salah adress, harusnya isi images/warrior2.png
        frameWidth:80, frameHeight:80
    })

    this.load.spritesheet('numbers', 'images/numbers.png',{
        frameWidth:131, frameHeight:71.25
    })

    this.load.spritesheet('slash', 'images/slash.png',{
        frameWidth:88, frameHeight:42
    })

    this.load.image('start-btn', 'images/start_button.png')
}

create()
{
    this.add.image(240, 320, 'background')
    const fight_bg = this.add.image(240,160,'fight-bg')
    const tile = this.physics.add.staticImage(240,fight_bg.height - 40,'tile')
    
    this.player = this.physics.add.sprite(  //ini tadi kamu buatnya this.enemy
        this.gameHalfWidth - 150,
        this.gameHalfHeight - 200,'player')
        .setOffset(-50,-8)
        .setBounce(0.2)
    
    this.physics.add.collider(this.player, tile) // yang ini juga kamu buatnya this.enemy harusnya this.player
    
    this.enemy = this.physics.add.sprite(
        this.gameHalfWidth + 150,
        this.gameHalfHeight - 200,'enemy')
        .setOffset(50,-8)
        .setBounce(0.2)
        .setFlipX(true) //kurang setflipX tadi
    
    this.physics.add.collider(this.enemy, tile)
    
    this.slash = this.physics.add.sprite(240, 60, 'slash')
    .setActive(false)
    .setVisible(false)
    .setGravityY(-500)
    .setOffset(0, -10)
    .setDepth(1)
    .setCollideWorldBounds(true)
    
    
    this.createAnimation()

    let start_button = this.add.image(this.gameHalfWidth, 
        this.gameHalfHeight + 181, 'start-btn').setInteractive()

        start_button.on('pointerdown', () => {
            this.gameStart()
            start_button.destroy()
        }, this)
    }

gameStart()
{
this.startGame = true
this.player.anims.play('player-standby', true)
this.enemy.anims.play('enemy-standby', true)
this.resultText = this.add.text(this.gameHalfWidth,200, '0', { fontSize : '32px', fill: '#000'})
this.questionText = this.add.text(this.gameHalfWidth,100, '0', { fontSize : '32px', fill: '#000'})
this.input.on('gameobjectdown', this.addNumber, this)

this.createButtons()
this.generateQuestion()
}


update()
{
}

createAnimation(){

    this.anims.create({
    key: 'player-die',
    frames: this.anims.generateFrameNumbers('player',
    { start: 0, end: 4 }),
    frameRate: 10,
    })
    this.anims.create({
    key: 'player-hit',
    frames: this.anims.generateFrameNumbers('player',
    { start: 5, end: 9 }),
    frameRate: 10,
    })
    this.anims.create({
    key: 'player-attack',
    frames: this.anims.generateFrameNumbers('player',
    { start: 10, end: 14 }),
    frameRate: 10
    })
    this.anims.create({
        key: 'player-standby',
        frames: this.anims.generateFrameNumbers('player',
        { start: 15, end: 19 }),
        frameRate: 10,
        repeat: -1
        })

        this.anims.create({
            key: 'enemy-die',
            frames: this.anims.generateFrameNumbers('enemy',
            { start: 0, end: 4 }),
            frameRate: 10,
            })
            this.anims.create({
            key: 'enemy-hit',
            frames: this.anims.generateFrameNumbers('enemy',
            { start: 5, end: 9 }),
            frameRate: 10,
            })
            this.anims.create({
            key: 'enemy-attack',
            frames: this.anims.generateFrameNumbers('enemy',
            { start: 10, end: 14 }),
            frameRate: 10
            })
            this.anims.create({
                key: 'enemy-standby',
                frames: this.anims.generateFrameNumbers('enemy',
                { start: 15, end: 19 }),
                frameRate: 10,
                repeat: -1
                })        
    }




    createButtons() {
        const startPositionY = this.scale.height - 246
        const widthDifference = 131
        const heightDifference = 71.25
        this.button2 = this.add.image(this.gameHalfWidth,
        startPositionY, 'numbers', 1)
        .setInteractive().setData('value', 2)
        this.button5 = this.add.image(this.gameHalfWidth,
        this.button2.y + heightDifference, 'numbers', 4)
        .setInteractive().setData('value', 5)
        this.button8 = this.add.image(this.gameHalfWidth,
        this.button5.y + heightDifference, 'numbers', 7)
        .setInteractive().setData('value', 8)
        this.button0 = this.add.image(this.gameHalfWidth,
        this.button8.y + heightDifference, 'numbers', 10)
        .setInteractive().setData('value', 0)

        this.button1 = this.add.image(this.button2.x -
            widthDifference, startPositionY, 'numbers', 0)
            .setInteractive().setData('value', 1)
            this.button4 = this.add.image(this.button5.x -
            widthDifference, this.button1.y +
            heightDifference, 'numbers', 3)
            .setInteractive().setData('value', 4)
            this.button7 = this.add.image(this.button8.x -
            widthDifference, this.button4.y +
            heightDifference, 'numbers', 6)
            .setInteractive().setData('value', 7)
            this.buttonDel = this.add.image(this.button0.x -
            widthDifference, this.button7.y +
            heightDifference,'numbers', 9)
            .setInteractive().setData('value', 'del')

            this.button3 = this.add.image(this.button2.x +
                widthDifference, startPositionY, 'numbers', 2)
                .setInteractive().setData('value', 3)
                this.button6 = this.add.image(this.button5.x +
                widthDifference, this.button3.y +
                heightDifference, 'numbers', 5)
                .setInteractive().setData('value', 6)
                this.button9 = this.add.image(this.button8.x +
                widthDifference, this.button6.y +
                heightDifference, 'numbers', 8)
                .setInteractive().setData('value', 9)
                this.buttonOk = this.add.image(this.button0.x +
                widthDifference, this.button9.y +
                heightDifference,'numbers', 11)
                .setInteractive().setData('value', 'ok')
}

addNumber(pointer, object, event) {
    let value = object.getData('value')
    if (isNaN(value)) {
    if(value == 'del') {
    this.numberArray.pop() 
    if(this.numberArray.length < 1) {
    this.numberArray[0] = 0 
    }
    }
    if(value == 'ok') {   
        this.checkAnswer() 
        this.numberArray = [] 
        this.numberArray[0] = 0 
    }
    } else {

        if (this.numberArray.length == 1 && this.numberArray[0] == 0){
            this.numberArray[0] = value
            } else {
            if (this.numberArray.length < 10){
            this.numberArray.push(value)
            }
    }
}
    this.number = parseInt(this.numberArray.join(''))
    this.resultText.setText(this.number)
    const textHalfWidth = this.resultText.width * 0.5
    this.resultText.setX(this.gameHalfWidth -
    textHalfWidth)
    event.stopPropagation()
}

getOperator()
    {
        const operator = ['+', '-', 'x', ':']
        return operator[Phaser.Math.Between(0,operator.length - 1)]
        }


        generateQuestion() {
            let numberA = Phaser.Math.Between(0,50)
            let numberB = Phaser.Math.Between(0,50)
            let operator = this.getOperator()

            if (operator === '+') {
            this.question[0] = `${numberA} + ${numberB}`
            this.question[1] = numberA + numberB
            }             
            if (operator === '-'){
              if (numberB > numberA) {
             this.question[0] = `${numberB} - ${numberA}`
             this.question[1] = numberB - numberA
            } else {
            this.question[0] = `${numberA} - ${numberB}`
            this.question[1] = numberA - numberB
            }
}

            if (operator === 'x'){
            this.question[0] = `${numberA} x ${numberB}`
            this.question[1] = numberA * numberB
            }


            if (operator === ':'){
            do {
            numberA = Phaser.Math.Between(0, 50)
            numberB = Phaser.Math.Between(0, 50)
            }
            while (!Number.isInteger(numberA/numberB))

            this.question[0] = `${numberA} : ${numberB}`
            this.question[1] = numberA / numberB
            }

            this.questionText.setText(this.question[0])
            const textHalfWidth = this.questionText.width * 0.5
            this.questionText.setX(this.gameHalfWidth -
            textHalfWidth)
}
}