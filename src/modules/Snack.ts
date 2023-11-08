// 蛇类
class Snack {
    snackElement: HTMLElement;
    Head: HTMLElement;
    // 蛇身(包含蛇头) HTMLCollection可以跟着DOM随时更新
    Body: HTMLCollection;

    constructor() {
        this.snackElement = document.getElementById('snack')!;
        this.Head = document.querySelector('#snack > div')!;
        this.Body = this.snackElement.getElementsByTagName('div')
    }

    // 获取蛇头的位置
    get X() {
        return this.Head.offsetLeft
    }
    get Y() {
        return this.Head.offsetTop
    }

    // 设置蛇头的位置
    set X(x: number) {
        if (this.X == x) {
            return
        }
        if (x < 0 || x > 290) {
            throw Error('游戏结束')
        }

        // 掉头检测
        if (this.Body[1] && (this.Body[1] as HTMLElement).offsetLeft == x) {
            // 满足第二个节点存在且偏移量等于即将设置的头节点的偏移量说明发生掉头
            if (x > this.X) {
                // 向右掉头了，说明之前在向左运动
                x = this.X - 10
            } else {
                x = this.X + 10
            }
        }

        this.moveBody()
        this.Head.style.left = x + 'px'
        this.checkHeadAndBody()

    }
    set Y(y: number) {
        if (this.Y == y) {
            return
        }
        if (y < 0 || y > 290) {
            throw Error('游戏结束')
        }
          // 掉头检测
          if (this.Body[1] && (this.Body[1] as HTMLElement).offsetTop == y) {
            if (y > this.Y) {
                // 向下掉头了，说明之前在向上运动
                y = this.Y - 10
            } else {
                y = this.Y + 10
            }
        }

        // 先移蛇身，最后移动蛇头
        this.moveBody()
        this.Head.style.top = y + 'px'
        this.checkHeadAndBody()
    }

    // 添加蛇身
    addBody() {
        const divEle: HTMLElement = document.createElement('div')
        divEle.style.left = this.X + 'px';
        divEle.style.top = this.Y + 'px';
        this.snackElement.insertAdjacentElement('beforeend', divEle)
    }

    /**
     * 蛇身移动
     * 实现思路：从后往前，每个蛇身逐步替代前一个蛇身的位置
     */
    moveBody() {
        for (let i = this.Body.length - 1; i > 0; i--) {
            const body = this.Body[i - 1] as HTMLElement
            const curBody = this.Body[i] as HTMLElement
            let x = body.offsetLeft;
            let y = body.offsetTop;
            curBody.style.left = x + 'px';
            curBody.style.top = y + 'px';
        }
    }

    // 检查蛇头和蛇身是否碰撞
    checkHeadAndBody(){
        // 除了蛇头本身，其他的都可能会被撞到
        for(let i=1;i<this.Body.length;i++){
            let body = this.Body[i] as HTMLElement
            if(this.X === body.offsetLeft && this.Y === body.offsetTop){
                throw new Error("撞到自己了~游戏结束")
            }
        }
    }
}

export default Snack