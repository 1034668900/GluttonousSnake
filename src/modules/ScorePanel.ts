// 记分牌类
class ScorePanel {
    score: number = 0;
    level: number = 1;
    scoreElement: HTMLElement;
    levelElement: HTMLElement;
    // 最大难度等级
    maxLevel: number;
    // 每获得scoreStep分升级一个难度等级
    scoreStep: number;

    constructor(maxLevel: number = 10, scoreStep: number = 10) {
        this.scoreElement = document.getElementById('score')!;
        this.levelElement = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.scoreStep = scoreStep;
    }
    // 增长分数
    addScore() {
        this.scoreElement.innerHTML = ++this.score + ''
        console.log(this.score);
        
        if (this.score % this.scoreStep == 0) {
            this.upLevel()
        }
    }
    // 提升等级
    upLevel() {
        if (this.level < this.maxLevel) {
            this.levelElement.innerHTML = ++this.level + ''
        }
    }

}
// 测试代码
// const scorePanel = new ScorePanel()
// for(let i=0;i<9;i++){
//     scorePanel.addScore()
// }
export default ScorePanel