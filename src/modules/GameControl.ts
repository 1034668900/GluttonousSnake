import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snack from "./Snack";

class GameControl {
    // 蛇
    snack: Snack;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;
    // 记录运动方向
    direction: string = '';
    oldDirection: string = '';
    // 记录游戏是否结束
    isLive: boolean = true;
    constructor() {
        this.snack = new Snack()
        this.scorePanel = new ScorePanel(10, 2)
        this.food = new Food()
    }

    // 初始化游戏（绑定键盘事件）
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.snackRun()
    }

    // 键盘事件
    keydownHandler(event: KeyboardEvent) {
        // 取消键盘事件的默认行为
        event.preventDefault()
        let legalKey: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        // 合法性校验
        if (legalKey.indexOf(event.key) !== -1) {
            this.oldDirection = this.direction
            this.direction = event.key
        }
    }

    // 蛇是否吃到食物
    isEatFood() {
        if (this.snack.X == this.food.X && this.snack.Y == this.food.Y) {
            // 重置食物
            this.food.generateXY()
            // 分数增加
            this.scorePanel.addScore()
            // 增加蛇身
            this.snack.addBody()
        }
    }

    // 蛇头运动
    snackRun() {
        // 获取蛇头当前坐标
        let x = this.snack.X
        let y = this.snack.Y

        // 根据当前方向修改坐标
        switch (this.direction) {
            case "ArrowUp":
                y -= 10;
                break
            case "ArrowDown":
                y += 10;
                break
            case "ArrowLeft":
                x -= 10;
                break
            case "ArrowRight":
                x += 10;
                break
        }

        try {
            this.snack.X = x
            this.snack.Y = y
            // 检查是否吃到食物
            this.isEatFood()
        } catch (error: any) {
            alert(error.message)
            this.isLive = false
        }
        this.isLive && setTimeout(this.snackRun.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }
}

export default GameControl