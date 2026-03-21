  
    /*
====================================
FLOW SKIN SYSTEM - VANILLA JAVASCRIPT
Water flow customization & shop system
====================================
*/

const FLOW_SKINS = {
  default: { id: "default", name: "Nước Tinh Khiết", icon: "💧", color: "#7fd9ffe9", glow: "#38bdf8", price: 0 },
  mud:     { id: "mud",     name: "Bùn Lầy",        icon: "🏜️", color: "#7a5230", glow: "#7a5230", price: 2000 },
  grass:   { id: "grass",   name: "Lá Mầm",         icon: "🍃", color: "#6bffa1", glow: "#6bffa1", price: 4000 },
  lava:    { id: "lava",    name: "Dung Nham",      icon: "🌋", color: "#ff6200", glow: "#ff6b00", price: 6000 },
  poison:  { id: "poison",  name: "Chất Độc",       icon: "☠️", color: "#22c55e", glow: "#22c55e", price: 8000 },
  mango:   { id: "mango",   name: "Nước Xoài",      icon: "🥭", color: "#ffcc00f2", glow: "#facc15", price: 10000 },
  orange:  { id: "orange",  name: "Nước Cam",       icon: "🥤", color: "#fb923c", glow: "#fb923c", price: 12000 },
  candy:   { id: "candy",   name: "Kẹo Ngọt",       icon: "🍭", color: "#ff67de", glow: "#ff4fd8", price: 14000 },
  blood:   { id: "blood",   name: "Dòng Máu",       icon: "🧛", color: "#ff0000", glow: "#be123c", price: 16000 },
  wine:    { id: "wine",    name: "Rượu Nho",       icon: "🍇", color: "#630e55", glow: "#7c2d12", price: 18000 },
  void:    { id: "void",    name: "Hư Không",       icon: "🌌", color: "#1e022e", glow: "#7c3aed", price: 20000 },
  ocean:   { id: "ocean",   name: "Biển Sâu",       icon: "🌊", color: "#1c3a8d", glow: "#1e3a8a", price: 22000 },
  frozen:  { id: "frozen",  name: "Băng Tuyết",     icon: "❄️", color: "#b1d0e4", glow: "#e0f2fe", price: 24000 },
  neon:    { id: "uv",    name: "Tia cực tím",     icon: "⚡", color: "#ff00eafa", glow: "#2dd4bf", price: 26000 },
  silver:  { id: "silver",  name: "Bạch Kim",       icon: "🥈", color: "#bee6e4", glow: "#94a3b8", price: 28000 },
  gold:    { id: "gold",    name: "Vàng Ròng",      icon: "🥇", color: "#fff700", glow: "#fbbf24", price: 30000 }
};

// ===== SKIN DATA PERSISTENCE =====
    const SkinManager = {
        loadSkinData: function(playerName) {
        const key = `skin_data_${playerName}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
            return JSON.parse(saved);
            } catch (e) {
            return this.getDefaultSkinData();
            }
        }
        return this.getDefaultSkinData();
        },
        getDefaultSkinData: function() {
        return {
            ownedSkins: ["default"],
            equippedSkin: "default",
            coins: 0
        };
        },
        saveSkinData: function(playerName, data) {
        const key = `skin_data_${playerName}`;
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error("Failed to save skin data:", e);
            return false;
        }
        },
        getCurrentSkin: function(equippedSkinId) {
        return FLOW_SKINS[equippedSkinId] || FLOW_SKINS.default;
        },
    buySkin: function(playerName, skinId, currentCoins) {
        const skin = FLOW_SKINS[skinId];
        if (!skin) return { success: false, message: "Skin does not exist!" };
        let data = this.loadSkinData(playerName);
        if (data.ownedSkins.includes(skinId)) {
            return { success: false, message: "You already own this skin!" };
        }
        if (currentCoins < skin.price) {
            return { success: false, message: "Not enough coins!" };
        }
        data.ownedSkins.push(skinId);
        data.coins = currentCoins - skin.price;
        this.saveSkinData(playerName, data);
        return { 
            success: true, 
            message: `Successfully bought ${skin.name}!`,
            newCoins: data.coins,
            ownedSkins: data.ownedSkins
        };
    },
        equipSkin: function(playerName, skinId) {
        const data = this.loadSkinData(playerName);
        if (!data.ownedSkins.includes(skinId)) {
            return { success: false, message: "Skin not owned" };
        }
        data.equippedSkin = skinId;
        this.saveSkinData(playerName, data);
        return {
            success: true,
            message: `Equipped ${FLOW_SKINS[skinId].name}!`,
            equippedSkin: skinId
        };
        },
        updateCoins: function(playerName, totalCoins) {
        const data = this.loadSkinData(playerName);
        data.coins = totalCoins;
        this.saveSkinData(playerName, data);
        return totalCoins;
        },
applyEquippedSkin: function(playerName) {
const data = this.loadSkinData(playerName);
const equippedSkinId = data.equippedSkin || 'default';

// THAY THẾ: Thay vì querySelector, ta chỉ trả về ID 
// để React dùng ID này render màu trong vòng lặp gameGrid.map
return equippedSkinId;
},
    };

    // ===== DÁN NGUYÊN VĂN TOAST & SHOPUI (KHÔNG SỬA) =====
    function showSkinToast(message, type = 'success') {
        const wrapper = document.createElement('div');
        wrapper.className = 'fixed inset-x-0 top-6 z-[20000] flex justify-center pointer-events-none';
        const toast = document.createElement('div');
        let bgClass = 'bg-slate-700 text-white';
        if (type === 'success') bgClass = 'bg-green-500 text-white border-4 border-green-700';
        if (type === 'error') bgClass = 'bg-red-500 text-white border-4 border-red-700';
        toast.className = `px-6 py-3 text-sm md:text-lg font-black rounded-2xl shadow-2xl ${bgClass} animate-bounce`;
        toast.innerHTML = message;
        wrapper.appendChild(toast);
        document.body.appendChild(wrapper);
        setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px) scale(0.95)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => wrapper.remove(), 300);
        }, 2000);
    }

    const ShopUI = {
        isOpen: false,
        currentPlayerName: null,
        currentCoins: 0,
        createModalHTML: function() {
        const modal = document.createElement('div');
        modal.id = 'skinShopModal';
        modal.className = 'modal hidden';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
            <div class="modal-header">
                <h2>💧 Flow Skin Shop</h2>
                <button type="button" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div id="skinList" class="skin-grid"></div>
            </div>
            <div class="modal-footer">
                <div class="coins-display">
                <span class="coins-amount" id="coinsAmount">0</span>
                <span class="coins-icon">🪙</span>
                </div>
                <button type="button" class="modal-btn-close">Close</button>
            </div>
            </div>
        `;
        return modal;
        },
openShop: function(playerName, currentCoins, ownedSkins, equippedSkin) {
// --- CHỈ CẬP NHẬT SKIN, GIỮ NGUYÊN TIỀN ---
const savedData = SkinManager.loadSkinData(playerName);
if (savedData) {
    // Chỉ lấy danh sách skin và skin đang mặc từ máy
    ownedSkins = savedData.ownedSkins || ownedSkins;
    equippedSkin = savedData.equippedSkin || equippedSkin;
    // Nếu trong máy có lưu tiền, ta lấy số tiền lớn nhất giữa máy và React để tránh về 0
    currentCoins = Math.max(currentCoins, savedData.coins || 0);
}
// ------------------------------------------

this.currentPlayerName = playerName;
this.currentCoins = currentCoins;
let modal = document.getElementById('skinShopModal');
if (!modal) {
    modal = this.createModalHTML();
    document.body.appendChild(modal);
    modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeShop());
    modal.querySelector('.modal-close').addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.closeShop(); });
    modal.querySelector('.modal-btn-close').addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.closeShop(); });
}
document.getElementById('coinsAmount').textContent = currentCoins.toLocaleString();
this.renderSkinCards(playerName, currentCoins, ownedSkins, equippedSkin);
modal.classList.remove('hidden');
this.isOpen = true;
},
        closeShop: function() {
        const modal = document.getElementById('skinShopModal');
        if (modal) modal.classList.add('hidden');
        this.isOpen = false;
        },
        renderSkinCards: function(playerName, currentCoins, ownedSkins, equippedSkin) {
        const skinList = document.getElementById('skinList');
        skinList.innerHTML = '';
        Object.values(FLOW_SKINS).forEach(skin => {
            const isOwned = ownedSkins.includes(skin.id);
            const isEquipped = equippedSkin === skin.id;
            const canAfford = currentCoins >= skin.price;
            const card = document.createElement('div');
            card.className = `skin-card ${isEquipped ? 'equipped' : ''} ${isOwned ? 'owned' : ''}`;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `skin-action-btn ${isEquipped ? 'equipped' : ''} ${!isOwned && !canAfford ? 'disabled' : ''}`;
            button.disabled = !isOwned && !canAfford;
            button.innerHTML = isEquipped ? '✓ EQUIPPED' : isOwned ? 'EQUIP' : 'BUY';
            button.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            this.handleSkinAction(playerName, skin.id, currentCoins, isOwned);
            });
            card.innerHTML = `
            
            <div class="skin-preview" style="background-color: ${skin.color}; box-shadow: 0 0 15px ${skin.glow};"><div class="skin-card-header"><span class="skin-icon">${skin.icon}</span></div></div>
            <div class="skin-info">
                <h3>${skin.name}</h3>
                <p class="skin-price">${skin.price === 0 ? 'Default' : skin.price + ' 🪙'}</p>
            </div>
            `;
            card.appendChild(button);
            skinList.appendChild(card);
        });
        },
handleSkinAction: function(playerName, skinId, currentCoins, isOwned) {
if (isOwned === true) {
    const result = SkinManager.equipSkin(playerName, skinId);
    if (result.success) {
        showSkinToast(`✨ ${FLOW_SKINS[skinId].name} equipped!`, 'success');
        
        window.dispatchEvent(new CustomEvent('updateReactSkin', { 
            detail: { skinId: skinId } 
        }));

        const skinData = SkinManager.loadSkinData(playerName);
        // Vẫn dùng currentCoins cũ vì trang bị không làm thay đổi tiền
        this.renderSkinCards(playerName, currentCoins, skinData.ownedSkins, skinId);
    }
} else {
    const result = SkinManager.buySkin(playerName, skinId, currentCoins);
    if (result.success) {
        showSkinToast(`💰 ${FLOW_SKINS[skinId].name} purchased!`, 'success');
        
        // 1. Cập nhật biến "tiền hiện tại" của ShopUI bằng giá trị mới từ kết quả mua
        this.currentCoins = result.newCoins; 

        // 2. Gửi sự kiện để React cập nhật số tiền tổng (để khi thoát Shop tiền vẫn đúng)
        window.dispatchEvent(new CustomEvent('updateReactCoins', { 
            detail: { newCoins: result.newCoins } 
        }));

        // 3. Cập nhật con số hiển thị ngay trên Header của Shop dùng toLocaleString()
        const coinsDisplay = document.getElementById('coinsAmount');
        if (coinsDisplay) {
            // Ép hiển thị số tiền mới nhất vừa trừ xong
            coinsDisplay.textContent = result.newCoins.toLocaleString();
        }

        // 4. Vẽ lại các Card với số tiền MỚI để các nút BUY khác cập nhật trạng thái (enable/disable)
        this.renderSkinCards(
            playerName, 
            result.newCoins, 
            result.ownedSkins, 
            SkinManager.loadSkinData(playerName).equippedSkin
        );
    } else {
        showSkinToast(result.message, 'error');
    }
}
},
        updateFlowSkin: function(skinId) {
        const skin = FLOW_SKINS[skinId];
        if (!skin) return;
        const activeFlowElements = document.querySelectorAll('.pipe-active');
        activeFlowElements.forEach(el => {
            el.style.stroke = skin.color;
            el.style.filter = `drop-shadow(0 0 8px ${skin.glow})`;
        });
        }
    };


// ===== GLOBAL SKIN INITIALIZATION =====
let skinDebounceTimeout = null;

function initializeGameWithSkin(playerName) {
if (!playerName) return;

// Áp dụng lần đầu
SkinManager.applyEquippedSkin(playerName);

const observer = new MutationObserver(() => {
// Nếu game đang vẽ dở, hủy lịch trình cũ
if (skinDebounceTimeout) clearTimeout(skinDebounceTimeout);

// Lên lịch tô màu skin sau 50ms (khi game đã vẽ xong các ống nước mới)
skinDebounceTimeout = setTimeout(() => {
    SkinManager.applyEquippedSkin(playerName);
}, 50);
});

const svgContainer = document.querySelector('svg');
if (svgContainer) {
observer.observe(svgContainer, { 
    childList: true, 
    subtree: true 
});
}
}
// ===== FLOW SKIN SYSTEM COMPLETE =====

/*
====================================
PIPE PUZZLE AI SOLVER
Human-like realtime AI

This module implements the AI agent described in the project prompt.  The
solver behaves like a human puzzle player on a 2D pipe grid.  It respects the
following rules and priorities:

  • Cell types: SOURCE, SINK, PIPE, ROCK, EMPTY, COIN
  • Pipe shapes: straight, corner, tee, cross (all 4‑way rotations)
  • Rocks block water until destroyed using shovels (costs 1 shovel each)
  • Coins may be collected or spent to buy shovels

Available actions exposed to the solver:

  ROTATE(r,c,rotation)
  DESTROY(r,c)
  BUY_SHOVEL
  DO_NOTHING

Core solving logic:
  1. Try to connect SOURCE → SINK using only pipe rotations.
  2. If no rotation‑only path exists, destroy the minimum number of rocks.
  3. Minimise total rotations, then shovel usage, then coins spent.

Internal algorithm:
  - Connectivity check via BFS, following matching pipe openings.
  - Heuristic search (A*‑style) when obstacles prevent a straight solution.
  - Rock breaking tested one by one, only if rotation paths fail.
  - Resources (shovels/coins) are managed; the agent can buy shovels if
    needed and coins are sufficient.

The code below also supports an optional logger callback supplied by the
React UI; this lets the interface display realtime AI messages instead of
polluting the console.

====================================
*/

class PipeAI {

    constructor(getState, actions, logger){

        /*
        getState() must return the current game state object:
        {
            grid,          // 2D array of cells
            coins,         // current coin count
            shovels,       // current shovel count
            shovelCost     // cost per shovel
        }

        actions: an object exposing methods the AI can perform:
          rotate(r,c,rotation)    // rotation is quarter‑turn count (0..3)
          destroy(r,c)
          buy()                   // purchase one shovel

        logger: optional callback(msg:string) called when the agent
        chooses an action or reports status.  The React UI will pass
        its `setAiLogs` function here so messages appear in the log panel.
        */

        this.getState = getState;
        this.actions = actions;
        this.logger = logger || (()=>{});

        this.running = false;
        this.timer = null;

    }

    /* ========================= */
    /* CONTROL                   */
    /* ========================= */

    start(speed=400){

        if(this.running) return;

        this.running = true;

        this.timer = setInterval(()=>{
            this.step();
        },speed);

        console.log("AI STARTED");
        this.logger("🤖 AI STARTED");

    }

    stop(){

        if(!this.running && !this.timer) return;

        this.running = false;
        clearInterval(this.timer);
        this.timer = null;
        console.log("AI STOPPED");
        this.logger("🛑 AI STOPPED");

    }

    reset(){

        this.stop();
        this.lastMove = null;
        this.repeatCount = 0;
        this.rotationMap = new Map();
        this.lastMoves = [];
        this.stuckCount = 0;
        this.mode = "NORMAL";

    }

    isRunning(){
        return !!this.running;
    }

    toggle(){

        if(this.running) this.stop();
        else this.start();

    }

    /* ========================= */
    /* MAIN STEP LOOP            */
    /* ========================= */

    step(){

        if(this.lastMove===undefined) this.lastMove=null;
        if(this.repeatCount===undefined) this.repeatCount=0;
        if(!this.rotationMap) this.rotationMap = new Map();
        if(!this.lastMoves) this.lastMoves = [];
        if(this.stuckCount===undefined) this.stuckCount = 0;
        if(!this.mode) this.mode = "NORMAL";

        const state = this.getState();
        if(!state) return;

        const source = this.find(state.grid,"SOURCE");
        const sink   = this.find(state.grid,"SINK");
        if(!source || !sink) return;

        const flow = this.bfs(state.grid,source);
        const connected = flow.visited;
        const frontier = flow.frontier;

        if(this.has(connected,sink)){
            this.mode = "NORMAL";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.logger("✅ SOLVED");
            console.log("SOLVED");
            this.stop();
            return;
        }

        if(!frontier.length){
            this.logger("NO FRONTIER");
            return;
        }

        let target = sink;
        let plan = null;
        const isNearSink = (r, c) =>
            Math.abs(r - sink.r) + Math.abs(c - sink.c) <= 3;
        const sinkFocus =
            [...connected].some(k => {
                const [r,c] = k.split(",").map(Number);
                return isNearSink(r,c);
            }) ||
            frontier.some(p => isNearSink(p.r,p.c));
        const sinkPlan =
            this.findBestRock(state,connected,frontier,sink);
        const maxShovel =
            state.shovels + Math.floor(state.coins / state.shovelCost);
        const recent = this.lastMoves || [];
        const patternLoop =
            recent.length>=4 &&
            recent[recent.length-1]===recent[recent.length-3] &&
            recent[recent.length-2]===recent[recent.length-4] &&
            recent[recent.length-1]!==recent[recent.length-2];

        const rotateMove =
            this.findBestRotation(state,connected,frontier,target,sinkFocus);

        if(sinkFocus){
            this.mode = "SINK_FOCUS";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);

            if(sinkPlan && sinkPlan.rock){
                const rock = sinkPlan.rock;

                if(state.shovels>0){
                    this.lastMove={type:"DESTROY",r:rock.r,c:rock.c};
                    this.repeatCount=0;
                    this.stuckCount=0;
                    this.logger(`DESTROY (${rock.r},${rock.c})`);
                    this.actions.destroy(rock.r,rock.c);
                    return;
                }

                if(state.coins>=state.shovelCost){
                    this.lastMove={type:"BUY"};
                    this.repeatCount=0;
                    this.stuckCount=0;
                    this.logger(`BUY_SHOVEL`);
                    this.actions.buy();
                    return;
                }
            }
        }

        if(rotateMove){
            const moveKey = `${rotateMove.r},${rotateMove.c}`;

            this.mode = sinkFocus ? "SINK_FOCUS" : "NORMAL";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels} EXPAND=${rotateMove.expandScore}`);
            this.lastMove={
                type:"ROTATE",
                r:rotateMove.r,
                c:rotateMove.c
            };
            this.lastMoves.push(moveKey);
            if(this.lastMoves.length>5) this.lastMoves.shift();

            if(rotateMove.expand>connected.size){
                this.stuckCount=0;
                this.rotationMap.set(moveKey,1);
            }else{
                this.stuckCount++;
                this.rotationMap.set(
                    moveKey,
                    (this.rotationMap.get(moveKey)||0)+1
                );
            }

            this.logger(`ROTATE (${rotateMove.r},${rotateMove.c}) -> ${rotateMove.rot}`);
            this.actions.rotate(
                rotateMove.r,
                rotateMove.c,
                rotateMove.rot
            );
            return;
        }

        const noExpandMove =
            this.stuckCount>=3 || patternLoop;
        const lackResource =
            !!sinkPlan &&
            sinkPlan.rocksNeeded > maxShovel;
        const shouldHint =
            noExpandMove &&
            lackResource &&
            state.coins>=400 &&
            state.coins<1000;

        if(shouldHint && !sinkFocus){
            this.mode = "ESCAPE";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            if(this.actions.hint){
                this.lastMove={type:"HINT"};
                this.stuckCount=0;
                this.logger(state.coins>=700 ? "USE_HINT_STRONG" : "USE_HINT");
                this.actions.hint();
                return;
            }
            this.logger("HINT_UNAVAILABLE");
        }

        if(lackResource && noExpandMove && !sinkFocus){
            this.mode = "RESOURCE";
            let bestCoin = null;

            connected.forEach(k=>{
                const [r,c]=k.split(",").map(Number);
                const cell = state.grid[r][c];
                if(cell?.hasCoin){
                    const score = this.manhattan({r,c},sink);
                    if(!bestCoin || score<bestCoin.score){
                        bestCoin={r,c,score};
                    }
                }
            });

            if(bestCoin){
                target = {r:bestCoin.r,c:bestCoin.c};
                plan = { rock:null, rocksNeeded:0, score:bestCoin.score };
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            }else{
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
                this.logger("NO REACHABLE COIN");
                return;
            }
        }else{
            this.mode = sinkFocus ? "SINK_FOCUS" : "ESCAPE";
            plan = sinkPlan;
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
        }

        if(plan && plan.rock){
            const rock = plan.rock;
            if(state.shovels>0){
                this.mode = sinkFocus ? "SINK_FOCUS" : "ESCAPE";
                this.lastMove={type:"DESTROY",r:rock.r,c:rock.c};
                this.repeatCount=0;
                this.stuckCount=0;
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
                this.logger(`DESTROY (${rock.r},${rock.c})`);
                this.actions.destroy(rock.r,rock.c);
                return;
            }
            if(state.coins>=state.shovelCost){
                this.mode = sinkFocus ? "SINK_FOCUS" : "ESCAPE";
                this.lastMove={type:"BUY"};
                this.repeatCount=0;
                this.stuckCount=0;
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
                this.logger(`BUY_SHOVEL`);
                this.actions.buy();
                return;
            }
            if(!sinkFocus && state.coins>=400 && state.coins<1000 && this.actions.hint){
                this.mode = "ESCAPE";
                this.lastMove={type:"HINT"};
                this.stuckCount=0;
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
                this.logger(state.coins>=700 ? "USE_HINT_STRONG" : "USE_HINT");
                this.actions.hint();
                return;
            }
            this.logger("ESCAPE BLOCKED");
            return;
        }

        this.stuckCount++;
        if(this.stuckCount>=4){
            if(!sinkFocus && state.coins>=400 && state.coins<1000 && this.actions.hint){
                this.mode = "ESCAPE";
                this.lastMove={type:"HINT"};
                this.stuckCount=0;
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
                this.logger(state.coins>=700 ? "USE_HINT_STRONG" : "USE_HINT");
                this.actions.hint();
                return;
            }
            this.logger("STUCK STOP");
            return;
        }
        this.logger("NO VALID MOVE");

    }

    /* ========================= */
    /* BFS CONNECTIVITY          */
    /* ========================= */

    bfs(grid,start){

        const dirs = [
            {dr:-1,dc:0},
            {dr:0,dc:1},
            {dr:1,dc:0},
            {dr:0,dc:-1}
        ];

        const getConns = (cell) => {
            if(!cell) return [0,0,0,0];

            const type = String(cell.type || "").toUpperCase();
            const rot = ((cell.rotation || 0) % 4 + 4) % 4;
            const baseMap = {
                SOURCE: [0,1,0,0],
                SINK: [0,0,0,1],
                STRAIGHT: [0,1,0,1],
                ELBOW: [0,1,1,0],
                TEE: [0,1,1,1],
                CROSS: [1,1,1,1],
                DIRT: [0,0,0,0]
            };

            const base = baseMap[type] || [0,0,0,0];
            return [
                base[(0 - rot + 4) % 4],
                base[(1 - rot + 4) % 4],
                base[(2 - rot + 4) % 4],
                base[(3 - rot + 4) % 4]
            ];
        };

        const q=[start];
        const visited=new Set([this.key(start)]);
        const frontierMap=new Map();

        while(q.length){

            const cur=q.shift();
            const curCell = grid[cur.r][cur.c];
            const curConns = getConns(curCell);

            for(let i=0;i<dirs.length;i++){

                if(!curConns[i]) continue;

                const {dr,dc} = dirs[i];
                const n={r:cur.r+dr,c:cur.c+dc};

                if(
                    n.r<0||n.c<0||
                    n.r>=grid.length||
                    n.c>=grid[0].length
                ) continue;

                const nextCell = grid[n.r][n.c];
                const nextType = String(nextCell.type || "").toUpperCase();
                const nextConns = getConns(nextCell);
                const opposite = (i+2)%4;

                if(nextType==="DIRT"){
                    frontierMap.set(this.key(n), {r:n.r,c:n.c,type:"ROCK"});
                    continue;
                }

                if(!nextConns[opposite]){
                    frontierMap.set(this.key(n), {r:n.r,c:n.c,type:"PIPE"});
                    continue;
                }

                const nk=this.key(n);
                if(visited.has(nk)) continue;

                visited.add(nk);
                q.push(n);

            }

        }

        return {
            visited,
            frontier:[...frontierMap.values()]
        };

    }

    connect(grid,a,b){

        const A=grid[a.r][a.c];
        const B=grid[b.r][b.c];

        if(B.type==="ROCK") return false;

        const dr=b.r-a.r;
        const dc=b.c-a.c;

        return(
            this.open(A,dr,dc)
            &&
            this.open(B,-dr,-dc)
        );

    }

    open(pipe,dr,dc){

        if(pipe.type==="ROCK") return false;

        const o=this.openings(pipe);

        return o.some(x=>x.dr===dr&&x.dc===dc);

    }

    openings(pipe){

        // rotation stored as quarter-turn count (0..3)
        const rot=(pipe.rotation||0);

        const map={

            straight:[
                [{dr:0,dc:1},{dr:0,dc:-1}],
                [{dr:1,dc:0},{dr:-1,dc:0}]
            ],

            corner:[
                [{dr:0,dc:1},{dr:1,dc:0}],
                [{dr:1,dc:0},{dr:0,dc:-1}],
                [{dr:0,dc:-1},{dr:-1,dc:0}],
                [{dr:-1,dc:0},{dr:0,dc:1}]
            ],

            cross:[
                [
                    {dr:0,dc:1},
                    {dr:0,dc:-1},
                    {dr:1,dc:0},
                    {dr:-1,dc:0}
                ]
            ]

        };

        if(pipe.pipeType==="cross")
            return map.cross[0];

        if(pipe.pipeType==="straight")
            return map.straight[rot%2];

        if(pipe.pipeType==="corner")
            return map.corner[rot%4];

        return [];

    }

    /* ========================= */
    /* ROTATION HEURISTIC        */
    /* ========================= */

    findBestRotation(state,connected,frontier,target,targetLocked=false){

        let best=null;
        let bestExpand=-1;
        let bestScore=999999;

        const grid=state.grid;
        const pipeFrontier = frontier.filter(p => p.type==="PIPE");
        const recent = this.lastMoves || [];
        const hasABAB =
            recent.length>=4 &&
            recent[recent.length-1]===recent[recent.length-3] &&
            recent[recent.length-2]===recent[recent.length-4] &&
            recent[recent.length-1]!==recent[recent.length-2];

        for(const p of pipeFrontier){

            const cell=grid[p.r][p.c];
            const cellType = String(cell.type || "").toUpperCase();
            if(cellType==="DIRT" || cellType==="SOURCE" || cellType==="SINK") continue;

            const cellKey = this.key(p);
            if((this.rotationMap?.get(cellKey) || 0) >= 3) continue;
            if(hasABAB && recent.includes(cellKey)) continue;
            if(
                this.lastMove &&
                this.lastMove.type==="ROTATE" &&
                this.lastMove.r===p.r &&
                this.lastMove.c===p.c
            ) continue;

            const original=cell.rotation||0;
            const maxRot = cellType==="CROSS" ? 1 : 4;

            for(let rot=0;rot<maxRot;rot++){
                if(rot===original) continue;

                cell.rotation=rot;

                const flow=this.bfs(
                    grid,
                    this.find(grid,"SOURCE")
                );
                const newSet=flow.visited;

                if(!newSet.has(this.key(p))) continue;
                const expandScore = newSet.size - connected.size;
                const distanceAfter = this.distanceSet(newSet,target);
                if(expandScore<=0 && !targetLocked) continue;
                if(targetLocked && distanceAfter > 3) continue;

                const score=
                    distanceAfter
                    +
                    this.manhattan(p,target);

                if(expandScore<bestExpand) continue;
                if(expandScore===bestExpand && score>=bestScore) continue;

                bestExpand=expandScore;
                bestScore=score;
                best={
                    r:p.r,
                    c:p.c,
                    rot,
                    expand:newSet.size,
                    expandScore
                };
            }

            cell.rotation=original;
        }

        return best;

    }

    /* ========================= */
    /* ROCK HEURISTIC            */
    /* ========================= */

    findBestRock(state,connected,frontier,sink){

        const starts = frontier.filter(p => p.type==="PIPE" || p.type==="ROCK");
        if(!starts.length) return null;

        const grid = state.grid;
        const rows = grid.length;
        const cols = grid[0].length;
        const open = [];
        const gScore = new Map();
        const fScore = new Map();
        const parent = new Map();
        const closed = new Set();

        for(const start of starts){
            const key=this.key(start);
            const cost=start.type==="ROCK" ? 1 : 0;
            gScore.set(key,cost);
            fScore.set(key,cost+this.manhattan(start,sink));
            open.push({r:start.r,c:start.c});
        }

        while(open.length){
            let bestIndex=0;
            for(let i=1;i<open.length;i++){
                const a=fScore.get(this.key(open[i])) ?? 999999;
                const b=fScore.get(this.key(open[bestIndex])) ?? 999999;
                if(a<b) bestIndex=i;
            }

            const current=open.splice(bestIndex,1)[0];
            const currentKey=this.key(current);

            if(closed.has(currentKey)) continue;
            closed.add(currentKey);

            if(current.r===sink.r && current.c===sink.c){
                const path=[];
                let walk=currentKey;
                while(walk){
                    const [r,c]=walk.split(",").map(Number);
                    path.push({r,c});
                    walk=parent.get(walk)||null;
                }
                path.reverse();

                let firstRock=null;
                let rocksNeeded=0;

                for(const node of path){
                    const cell=grid[node.r][node.c];
                    if(String(cell.type || "").toUpperCase()==="DIRT"){
                        rocksNeeded++;
                        if(!firstRock){
                            firstRock={r:node.r,c:node.c};
                        }
                    }
                }

                return {
                    rock:firstRock,
                    rocksNeeded,
                    score:
                        this.manhattan(path[0],sink)
                        +
                        rocksNeeded*100
                        +
                        Math.max(
                            0,
                            (rocksNeeded-state.shovels)*state.shovelCost
                        ),
                    target:sink,
                    pathLen:path.length
                };
            }

            for(const next of this.neighbors(grid,current)){
                const nextKey=this.key(next);
                if(closed.has(nextKey) || connected.has(nextKey)) continue;

                const cell=grid[next.r][next.c];
                const stepCost=
                    String(cell.type || "").toUpperCase()==="DIRT" ? 1 : 0;
                const tentative=(gScore.get(currentKey) ?? 999999) + stepCost;

                if(tentative >= (gScore.get(nextKey) ?? 999999)) continue;

                parent.set(nextKey,currentKey);
                gScore.set(nextKey,tentative);
                fScore.set(nextKey,tentative + this.manhattan(next,sink));
                open.push({r:next.r,c:next.c});
            }
        }

        return null;

    }

    /* ========================= */
    /* HELPERS                   */
    /* ========================= */

    neighbors(grid,p){

        const d=[
            [1,0],[-1,0],[0,1],[0,-1]
        ];

        const out=[];

        for(const [dr,dc] of d){

            const r=p.r+dr;
            const c=p.c+dc;

            if(
                r>=0&&c>=0&&
                r<grid.length&&
                c<grid[0].length
            ){

                out.push({r,c});

            }

        }

        return out;

    }

    find(grid,type){

        for(let r=0;r<grid.length;r++)
        for(let c=0;c<grid[0].length;c++)
            if(grid[r][c].type===type)
                return {r,c};

        return null;

    }

    key(p){
        return p.r+","+p.c;
    }

    has(set,p){
        return set.has(this.key(p));
    }

    manhattan(a,b){

        return Math.abs(a.r-b.r)
        +
        Math.abs(a.c-b.c);

    }

    distanceSet(set,sink){

        let min=999999;

        set.forEach(k=>{

            const [r,c]=k.split(",").map(Number);

            const d=this.manhattan(
                {r,c},sink
            );

            if(d<min) min=d;

        });

        return min;

    }

}

/*
====================================
GLOBAL INIT
====================================
*/

window.initPipeAI=function(config){

if(window.pipeAI){
    window.pipeAI.stop();
    window.pipeAI = null;
}

window.pipeAI=new PipeAI(
    config.getState,
    config.actions,
    config.logger
);

};

/*
====================================
BUTTON SUPPORT
====================================
*/

window.toggleAI=function(){

if(!window.pipeAI){

alert("AI chưa init");
return;

}

window.pipeAI.toggle();
return window.pipeAI.isRunning();

};

window.resetPipeAI=function(){

if(!window.pipeAI) return false;

window.pipeAI.reset();
return true;

};

window.isPipeAIRunning=function(){

if(!window.pipeAI) return false;

return window.pipeAI.isRunning();

};
