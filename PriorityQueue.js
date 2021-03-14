// ヒープのためのライブラリ
class HeapLibrary{
    // 配列を受け取り、要素間を入れ替えて、配列を最大ヒープへ変換します。
    static buildMaxHeap(arr){
        let mid = HeapLibrary.parent(arr.length-1);
        for(let i = mid; i >= 0; i--){
            HeapLibrary.maxHeapify(arr, arr.length-1, i);
        }
    }

    // 要素iが最大ヒーププロパティを満たすように確認してください。
    static maxHeapify(arr, heapEnd, i){
        let l = HeapLibrary.left(i);
        let r = HeapLibrary.right(i);

        let biggest = i;

        if(l <= heapEnd && arr[l] > arr[i]) biggest = l;
        if(r <= heapEnd && arr[r] > arr[i]) biggest = r;

        if(i !== biggest){
            let temp = arr[i];
            arr[i] = arr[biggest];
            arr[biggest] = temp;
            return HeapLibrary.maxHeapify(arr, heapEnd, biggest);
        }
    }

    // iの左側の子を取得
    static left(i){
        return i*2+1;
    }

    // iの右側の子を取得
    static right(i){
        return i*2+2;
    }

    // iの親を取得
    static parent(i){
        return Math.floor((i-1)/2);
    }
}

class PriorityQueue{
    constructor(arr){
        // 配列のディープコピーを行います。これによって、arrの状態の変更を防ぎます。
        this.maxHeap =  [...arr];
        HeapLibrary.buildMaxHeap(this.maxHeap);
    }

    // 最も優先度の高い値を返します。最大ヒープを使用しているので、根ノードは常に最大値になります。
    top(){
        return this.maxHeap[0];
    }
    pop() {
        let arr = this.maxHeap;
        let popped = this.maxHeap[0];
        this.maxHeap[0] = this.maxHeap[arr.length-1];
        this.maxHeap.pop();
        console.log(this.maxHeap)
        HeapLibrary.maxHeapify(this.maxHeap, this.maxHeap.length-1, 0)
        return popped;
    }

}

let pq = new PriorityQueue([2,3,43,2,53,6,75,10,42]);
console.log(pq.maxHeap);
console.log(pq.pop())
console.log(pq.maxHeap)