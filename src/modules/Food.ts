// Food类
class Food {
    element: HTMLElement;
    constructor() {
        // 此处系统判断可能存在dom中没加载完成拿不到food的情况
        // 但是我们是直接在html中写的结构，incident不存在该情况，末尾加个!即可
        this.element = document.getElementById('food')!;
    }
    // 获取食物的X和Y坐标
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    // 随机生成食物的新位置
    generateXY() {
        const left = Math.round(Math.random() * 29) * 10;
        const top = Math.round(Math.random() * 29) * 10;
        // 修改食物的新位置
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food