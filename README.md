[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/vtMjwcap)
# hw2-handling-input-events
This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/HkUibgmx3)

- 姓名：江宗翰
- Deploy連結：https://computational-physicality-lab.github.io/hw2-handling-input-events-chiangsteven/
- 加分項目：實作垂直大小變化。一次的雙指觸控改變大小只能改變一邊的方向，依兩手位置決定改變的方向。
- 處理程序控制策略：用的是大量全域變數控制事件流程狀態。根據事件會發生的順序(例如點擊會有touchstart -> touchend -> mousedown -> mouseup -> click)，然後設定狀態變數(布林值)來作條件判斷，因此才會有如 `isFollowMode` 和 `isFollowModeEnd` 這樣的變數來處理跟隨模式下最後點擊終止但又不觸發原本的功能(點到其他 div 會選取變藍色)。像是雙點觸控調整大小終止也是設定一個模式，用來確保手指都有離開後才可以執行其他原本的動作。關於觸控點擊沒特別取消預設的行為，為的就是利用原本的 click 事件，但這過程中要確保中間的 mousedown 和 mouseup 不會影響到結果。 另為針對點擊，也有採取原始位置和點擊發生位置來判斷是否為真的點擊，而不是拖曳(因為滑鼠點擊不考慮時間間隔)。
- 實作的網站的有趣之處：deploy 時發現設定好後要 commit 過才會有網址出來。踩到 js 型別轉換的坑了，這不有趣但值得生氣。關於移動時物件可以跟著移動的做法參考自[這裡](https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging)；其實還是不太懂 left 和 offsetLeft 的差別，不過在沒設定 margin 的情況他們的數值會是一樣的樣子(然後後者不會有px這樣的單位)。關於避免拖曳後引發 click event 參考[這裡](https://stackoverflow.com/questions/18032136/prevent-click-event-after-drag-in-jquery)。在各種交互作用下有時候出現了奇怪的結果時也有點難重現，因為要確定是什麼樣的事件順序才會導致這樣的結果。
- 若電腦使用的是 Edge 瀏覽器只要改輸入 edge://inspect/#devices 即可，手機端還是可以用 Chrome。
- 對了助教的作業說明兩次時間部份都是UTF+8，應該是UTC+8才對；同時這次作業二的「此外，請瀏覽 HW1-example.mp4來檢視本次作業所要求的行為及具體規範（2分21秒）。」文字上應該是HW2。
