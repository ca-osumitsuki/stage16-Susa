scene.onOverlapTile(SpriteKind.Player, assets.tile`ダイヤモンド`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
    music.setVolume(255)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`チェスト_開いてない`, function (sprite, location) {
    stage += 1
    init_stage(stage)
})
function init_stage (stage: number) {
    if (stage == 0) {
        tiles.setCurrentTilemap(tilemap`レベル_1`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 10))
    } else if (stage == 1) {
        tiles.setCurrentTilemap(tilemap`レベル_2`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 10))
    } else if (stage == 2) {
        tiles.setCurrentTilemap(tilemap`レベル_3`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 10))
    } else if (stage == 3) {
        tiles.setCurrentTilemap(tilemap`レベル_3`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 10))
    }
}
function damage () {
    info.changeLifeBy(-1)
    mySprite.startEffect(effects.fire)
    scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    mySprite.vy = -150
    music.setVolume(120)
    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
    controller.moveSprite(mySprite, 0, 0)
    pause(2000)
    controller.moveSprite(mySprite, 100, 0)
    scene.cameraFollowSprite(mySprite)
    effects.clearParticles(mySprite)
    init_stage(stage)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`ブロック1`)) {
        mySprite.vy = -200
    }
})
let mySprite: Sprite = null
let stage = 0
info.setScore(0)
info.setLife(3)
stage = 0
mySprite = sprites.create(assets.image`いぬたぬき_右`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
scene.setBackgroundColor(9)
scene.setBackgroundImage(assets.image`背景`)
scene.cameraFollowSprite(mySprite)
mySprite.ay = 500
init_stage(stage)
game.onUpdate(function () {
    if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`バネ`)) {
        mySprite.vy = -300
    }
})
forever(function () {
    if (mySprite.tilemapLocation().row >= 15) {
        damage()
    }
})
forever(function () {
    if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`トゲ1`)) {
        damage()
    }
})
forever(function () {
    if (mySprite.tileKindAt(TileDirection.Top, assets.tile`トゲ0`)) {
        damage()
    }
})
