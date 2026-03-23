  
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
  neon:    { id: "neon",    name: "Tia cực tím",     icon: "⚡", color: "#fff870", glow: "#fff870", price: 26000 },
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
        this.resetRuntimeState();

    }

    resetRuntimeState(){
        this.lastMove = null;
        this.repeatCount = 0;
        this.rotationMap = new Map();
        this.lastMoves = [];
        this.stuckCount = 0;
        this.mode = "NORMAL";
        this.noProgressSteps = 0;
        this.loopCount = 0;
        this.lastBestDistance = 999999;
        this.lastFlowSize = 0;
        this.sinkLockActive = false;
        this.sinkLockRadius = 7;
        this.sinkZoneAttempts = 0;
        this.sinkZoneRotationAttempts = new Map();
        this.lastSinkZoneStrategy = null;
        this.aiTick = 0;
        this.lastHintTick = -999;
        this.hintCooldownTicks = 8;
        this.postHintZone = null;
        this.postHintCoins = [];
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
        this.resetRuntimeState();

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
        if(this.noProgressSteps===undefined) this.noProgressSteps = 0;
        if(this.loopCount===undefined) this.loopCount = 0;
        if(this.lastBestDistance===undefined) this.lastBestDistance = 999999;
        if(this.lastFlowSize===undefined) this.lastFlowSize = 0;
        if(this.sinkLockActive===undefined) this.sinkLockActive = false;
        if(this.sinkLockRadius===undefined) this.sinkLockRadius = 7;
        if(this.sinkZoneAttempts===undefined) this.sinkZoneAttempts = 0;
        if(!this.sinkZoneRotationAttempts) this.sinkZoneRotationAttempts = new Map();
        if(this.lastSinkZoneStrategy===undefined) this.lastSinkZoneStrategy = null;
        if(this.aiTick===undefined) this.aiTick = 0;
        if(this.lastHintTick===undefined) this.lastHintTick = -999;
        if(this.hintCooldownTicks===undefined) this.hintCooldownTicks = 8;
        if(!this.mode) this.mode = "NORMAL";
        this.aiTick++;

        const state = this.getState();
        if(!state) return;

        const source = this.find(state.grid,"SOURCE");
        const sink = this.find(state.grid,"SINK");
        if(!source || !sink) return;

        const sinkEntry = this.getSinkEntry(state.grid, sink);
        const flow = this.bfs(state.grid,source);
        const connected = flow.visited;
        const frontier = flow.frontier;
        const distanceToSink = this.distanceSet(connected,sink);
        const distanceToEntry = this.distanceSet(connected,sinkEntry);
        const terminalAware = distanceToEntry <= 2 || distanceToSink <= 2;
        const nearSink = distanceToEntry <= 4 || distanceToSink <= 3;
        const inSinkZone = distanceToSink <= 7;
        const hintCoins = this.getRemainingHintCoins(state.grid, connected);
        const recoveringHint = hintCoins.length > 0;
        const hintTarget = recoveringHint
            ? this.pickBestHintCoinTarget(hintCoins, connected, sinkEntry)
            : null;
        const sinkEntryCell = state.grid[sinkEntry.r]?.[sinkEntry.c];
        const sinkEntryBlocked = String(sinkEntryCell?.type || "").toUpperCase() === "DIRT";

        this.updateProgress(distanceToEntry, connected.size);

        if(this.has(connected,sink)){
            this.mode = "NORMAL";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.logger("✅ SOLVED");
            console.log("SOLVED");
            this.stop();
            return;
        }

        const sinkZoneContext = inSinkZone
            ? this.buildSinkZoneContext(state.grid, connected, frontier, sink)
            : null;

        if(terminalAware){
            this.activateSinkLock(2);
        }else if(nearSink){
            this.activateSinkLock(3);
        }

        const forcedMove = this.findForcedCompletion(
            state,
            source,
            sink,
            this.sinkLockActive ? this.sinkLockRadius : 2
        );
        if(forcedMove){
            this.mode = "FORCED_FINISH";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeRotate(forcedMove, connected.size);
            return;
        }

        if(sinkEntryBlocked){
            this.mode = "SINK_ENTRY";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            if(state.shovels > 0){
                this.executeDestroy(sinkEntry);
                return;
            }
            if(state.coins >= state.shovelCost){
                this.executeBuy();
                return;
            }
            const sinkZoneRockPressure = this.countZoneRocks(state.grid, sink, 7);
            if(inSinkZone && sinkZoneRockPressure >= 3 && this.canUseHint(state, { inSinkZone:true })){
                this.mode = "SINK_ENTRY_HINT";
                this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
                this.executeHint(state, connected, sink);
                return;
            }
        }

        const patternLoop = this.isPatternLoop();
        const maxShovel = state.shovels + Math.floor(state.coins / Math.max(1, state.shovelCost || 1));
        const zoneOptions = this.sinkLockActive
            ? { restrictToZone:true, zoneRadius:this.sinkLockRadius }
            : {};
        const emergencyCoinTarget =
            sinkEntryBlocked && state.coins < state.shovelCost
                ? this.findNearestReachableCoin(state.grid, connected, sinkEntry)
                : null;
        const target = recoveringHint ? hintTarget : emergencyCoinTarget || sinkEntry;
        const sinkStatePlan = inSinkZone
            ? this.searchSinkZoneStateSpace(state, sinkZoneContext)
            : null;

        if(sinkStatePlan){
            this.mode = "SINK_STATE_SEARCH";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels} COST=${sinkStatePlan.cost}`);
            if(sinkStatePlan.type==="ROTATE"){
                this.executeRotate({
                    r:sinkStatePlan.r,
                    c:sinkStatePlan.c,
                    rot:sinkStatePlan.rot,
                    expand:connected.size + 1,
                    score:sinkStatePlan.score,
                    zoneMode:"STATE_SEARCH"
                }, connected.size);
                return;
            }
            if(sinkStatePlan.type==="DESTROY"){
                if(state.shovels > 0){
                    this.executeDestroy({r:sinkStatePlan.r, c:sinkStatePlan.c});
                    return;
                }
                if(state.coins >= state.shovelCost){
                    this.executeBuy();
                    return;
                }
            }
        }

        let rotateMove = inSinkZone
            ? this.findSinkZoneRotation(state, connected, sinkZoneContext)
            : this.findBestRotation(
                state,
                connected,
                frontier,
                target,
                {
                    sink,
                    sinkEntry,
                    nearSink,
                    inSinkZone,
                    terminalAware,
                    recoveringHint,
                    blockSinkZoneBeforeEntry: !inSinkZone,
                    ...zoneOptions
                }
            );

        let plan = this.findBestRock(
            state,
            connected,
            frontier,
            sink,
            {
                goal:sinkEntry,
                ...zoneOptions
            }
        );

        let zoneHasPlan = !!rotateMove || !!plan;
        if(this.sinkLockActive && !zoneHasPlan && !terminalAware){
            this.releaseSinkLock();
            rotateMove = inSinkZone
                ? this.findSinkZoneRotation(state, connected, sinkZoneContext)
                : this.findBestRotation(
                    state,
                    connected,
                    frontier,
                    target,
                    {
                        sink,
                        sinkEntry,
                        nearSink,
                        inSinkZone,
                        terminalAware:false,
                        blockSinkZoneBeforeEntry: !inSinkZone
                    }
                );
            plan = this.findBestRock(
                state,
                connected,
                frontier,
                sink,
                { goal:sinkEntry }
            );
            zoneHasPlan = !!rotateMove || !!plan;
        }

        const noProgress = this.noProgressSteps >= 5;
        const shouldHint = this.shouldUseHint(state, {
            nearSink,
            terminalAware,
            inSinkZone,
            noProgress,
            patternLoop,
            noValidAction: !rotateMove && !(plan && plan.rock),
            zoneFailed: this.sinkLockActive && !zoneHasPlan,
            lackResource: !!plan && plan.rocksNeeded > maxShovel
        });
        const immediateHint = terminalAware && shouldHint;
        const flowAdjustmentMove = inSinkZone
            ? this.findSinkZoneFlowAdjustment(state, connected, sinkZoneContext)
            : null;
        const sinkZoneRockAction = inSinkZone
            ? this.findSinkZoneRockAction(state, connected, sinkZoneContext)
            : null;
        const backwardMove = inSinkZone
            ? this.findSinkZoneBackwardMove(state, connected, sinkZoneContext)
            : null;

        if(rotateMove){
            this.mode = recoveringHint ? "COLLECT_AFTER_HINT" : terminalAware ? "TERMINAL" : this.sinkLockActive ? "SINK_LOCK" : "NORMAL";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels} SCORE=${rotateMove.score}`);
            this.executeRotate(rotateMove, connected.size);
            return;
        }

        if(flowAdjustmentMove){
            this.mode = "FLOW_ADJUST";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeRotate(flowAdjustmentMove, connected.size);
            return;
        }

        if(sinkZoneRockAction){
            this.mode = "ZONE_BREAK";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            if(state.shovels > 0){
                this.executeDestroy(sinkZoneRockAction.rock);
                return;
            }
            if(state.coins >= state.shovelCost){
                this.executeBuy();
                return;
            }
        }

        if(backwardMove){
            this.mode = "BACKWARD_LINK";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeRotate(backwardMove, connected.size);
            return;
        }

        if(plan && plan.rock){
            this.mode = terminalAware ? "TERMINAL" : this.sinkLockActive ? "SINK_LOCK" : "ESCAPE";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels} ROCKS=${plan.rocksNeeded}`);
            if(state.shovels>0){
                this.executeDestroy(plan.rock);
                return;
            }
            if(state.coins>=state.shovelCost){
                this.executeBuy();
                return;
            }
        }

        if(immediateHint){
            this.mode = terminalAware ? "TERMINAL_HINT" : "ESCAPE";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeHint(state, connected, sink);
            return;
        }

        if(inSinkZone && this.sinkZoneAttempts >= 12 && this.canUseHint(state, { inSinkZone:true })){
            this.mode = "SINK_ZONE_HINT";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeHint(state, connected, sink);
            return;
        }

        const fallbackMove = inSinkZone ? null : this.findFallbackRotation(
            state,
            connected,
            sink,
            {
                recoverHint: recoveringHint,
                hintTarget,
                inSinkZone,
                nearSink,
                terminalAware,
                blockSinkZoneBeforeEntry: !inSinkZone
            }
        );
        if(fallbackMove){
            this.mode = recoveringHint ? "COLLECT_AFTER_HINT" : "ANTI_STUCK";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeRotate(fallbackMove, connected.size);
            return;
        }

        if(shouldHint){
            this.mode = "ANTI_STUCK_HINT";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeHint(state, connected, sink);
            return;
        }

        this.softResetStrategy(inSinkZone ? 4 : 3);
        const emergencyMove = inSinkZone ? null : this.findFallbackRotation(
            state,
            connected,
            sink,
            {
                recoverHint: recoveringHint,
                hintTarget,
                inSinkZone,
                nearSink:false,
                terminalAware:false,
                ignoreHistory:true,
                blockSinkZoneBeforeEntry: !inSinkZone
            }
        );
        if(emergencyMove){
            this.mode = "RECOVERY";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeRotate(emergencyMove, connected.size);
            return;
        }

        const randomMove = inSinkZone ? null : this.findRandomValidRotation(state, sink, {
            blockSinkZoneBeforeEntry: !inSinkZone
        });
        if(randomMove){
            this.mode = "RANDOM_RECOVERY";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeRotate(randomMove, connected.size);
            return;
        }

        const desperationRock = this.findNearestRock(frontier, sinkEntry, sink, !inSinkZone);
        if(desperationRock && state.shovels > 0){
            this.mode = "DEADLOCK_BREAK";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeDestroy(desperationRock);
            return;
        }
        if(desperationRock && state.coins >= state.shovelCost){
            this.mode = "DEADLOCK_BUY";
            this.logger(`MODE=${this.mode} FLOW=${connected.size} COINS=${state.coins} SHOVELS=${state.shovels}`);
            this.executeBuy();
            return;
        }

        this.stuckCount++;
        this.logger(this.sinkLockActive ? "SINK_ZONE_BLOCKED" : "EMERGENCY_REEVAL");

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

    findBestRotation(state,connected,frontier,target,options={}){

        let best = null;
        let bestScore = -999999999;

        const grid = state.grid;
        const pipeFrontier = frontier.filter(p => p.type==="PIPE");
        const recent = this.lastMoves || [];
        const hasABAB = this.isPatternLoop();
        const currentTargetDistance = this.distanceSet(connected, target);
        const currentSinkDistance = this.distanceSet(connected, options.sink || target);

        for(const p of pipeFrontier){

            if(options.restrictToZone && !this.isInSinkZone(p, options.sink, options.zoneRadius)) continue;
            if(options.blockSinkZoneBeforeEntry && this.isInSinkZone(p, options.sink, 7)) continue;

            const cell = grid[p.r][p.c];
            const cellType = String(cell.type || "").toUpperCase();
            if(cellType==="DIRT" || cellType==="SOURCE" || cellType==="SINK") continue;

            const cellKey = this.key(p);
            const repeatCount = this.rotationMap?.get(cellKey) || 0;
            if(repeatCount >= 3 && !options.terminalAware) continue;
            if(hasABAB && recent.includes(cellKey) && !options.terminalAware) continue;
            if(
                this.lastMove &&
                this.lastMove.type==="ROTATE" &&
                this.lastMove.r===p.r &&
                this.lastMove.c===p.c &&
                !options.terminalAware
            ) continue;

            const original = cell.rotation || 0;
            const maxRot = cellType==="CROSS" ? 1 : 4;

            for(let rot=0;rot<maxRot;rot++){
                if(rot===original) continue;

                cell.rotation = rot;

                const flow = this.bfs(grid, this.find(grid,"SOURCE"));
                const newSet = flow.visited;
                const expandScore = newSet.size - connected.size;
                const targetDistanceAfter = this.distanceSet(newSet,target);
                const sinkDistanceAfter = this.distanceSet(newSet, options.sink || target);
                const coinGain = this.countNewCoins(grid, connected, newSet);
                const score = this.scoreRotationCandidate({
                    p,
                    repeatCount,
                    expandScore,
                    currentTargetDistance,
                    currentSinkDistance,
                    targetDistanceAfter,
                    sinkDistanceAfter,
                    coinGain,
                    nearSink: !!options.nearSink,
                    inSinkZone: !!options.inSinkZone,
                    terminalAware: !!options.terminalAware,
                    recoveringHint: !!options.recoveringHint
                });

                if(expandScore<=0 && !options.terminalAware && !options.nearSink){
                    cell.rotation = original;
                    continue;
                }

                if(score > bestScore){
                    bestScore = score;
                    best = {
                        r:p.r,
                        c:p.c,
                        rot,
                        expand:newSet.size,
                        expandScore,
                        score
                    };
                }

                cell.rotation = original;
            }
        }

        return best;

    }

    /* ========================= */
    /* ROCK HEURISTIC            */
    /* ========================= */

    findBestRock(state,connected,frontier,sink,options={}){

        const starts = frontier.filter(p => p.type==="PIPE" || p.type==="ROCK");
        if(!starts.length) return null;

        const grid = state.grid;
        const goal = options.goal || sink;
        const open = [];
        const gScore = new Map();
        const fScore = new Map();
        const parent = new Map();
        const closed = new Set();

        for(const start of starts){
            if(options.restrictToZone && !this.isInSinkZone(start, sink, options.zoneRadius)) continue;
            const key=this.key(start);
            const cost=start.type==="ROCK" ? 1 : 0;
            gScore.set(key,cost);
            fScore.set(key,cost+this.manhattan(start,goal));
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

            if(current.r===goal.r && current.c===goal.c){
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
                        this.manhattan(path[0],goal)
                        +
                        rocksNeeded*100
                        +
                        Math.max(
                            0,
                            (rocksNeeded-state.shovels)*state.shovelCost
                        ),
                    target:goal,
                    pathLen:path.length
                };
            }

            for(const next of this.neighbors(grid,current)){
                const nextKey=this.key(next);
                if(closed.has(nextKey) || connected.has(nextKey)) continue;
                if(options.restrictToZone && !this.isInSinkZone(next, sink, options.zoneRadius)) continue;

                const cell=grid[next.r][next.c];
                const stepCost=
                    String(cell.type || "").toUpperCase()==="DIRT" ? 1 : 0;
                const tentative=(gScore.get(currentKey) ?? 999999) + stepCost;

                if(tentative >= (gScore.get(nextKey) ?? 999999)) continue;

                parent.set(nextKey,currentKey);
                gScore.set(nextKey,tentative);
                fScore.set(nextKey,tentative + this.manhattan(next,goal));
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

    updateProgress(bestDistance, flowSize){

        if(bestDistance < this.lastBestDistance || flowSize > this.lastFlowSize){
            this.noProgressSteps = 0;
        }else{
            this.noProgressSteps++;
        }

        this.lastBestDistance = bestDistance;
        this.lastFlowSize = flowSize;

        if(this.isPatternLoop()){
            this.loopCount++;
        }else{
            this.loopCount = 0;
        }

    }

    isPatternLoop(){
        const recent = this.lastMoves || [];
        return (
            recent.length >= 4 &&
            recent[recent.length-1] === recent[recent.length-3] &&
            recent[recent.length-2] === recent[recent.length-4] &&
            recent[recent.length-1] !== recent[recent.length-2]
        );
    }

    activateSinkLock(radius){
        this.sinkLockActive = true;
        this.sinkLockRadius = radius;
    }

    releaseSinkLock(){
        this.sinkLockActive = false;
        this.sinkLockRadius = 3;
    }

    getSinkEntry(grid, sink){
        const left = { r:sink.r, c:sink.c - 1 };
        if(
            left.r >= 0 &&
            left.c >= 0 &&
            left.r < grid.length &&
            left.c < grid[0].length
        ){
            return left;
        }
        return sink;
    }

    isInSinkZone(p, sink, radius=7){
        if(!sink) return true;
        return this.manhattan(p, sink) <= radius;
    }

    countNewCoins(grid, oldSet, newSet){
        let total = 0;
        newSet.forEach(k => {
            if(oldSet.has(k)) return;
            const [r,c] = k.split(",").map(Number);
            if(grid[r]?.[c]?.hasCoin) total++;
        });
        return total;
    }

    distanceFromSetToPoint(set, point){
        let min = 999999;
        set.forEach(k => {
            const [r,c] = k.split(",").map(Number);
            min = Math.min(min, this.manhattan({r,c}, point));
        });
        return min;
    }

    computeHintZone(state, connected, sink){
        const grid = state.grid;
        const coins = state.coins;
        const zoneCells = [];
        const pushCell = (r,c) => {
            if(r<0 || c<0 || r>=grid.length || c>=grid[0].length) return;
            zoneCells.push({r,c});
        };

        if(coins >= 1000){
            for(let r=0;r<grid.length;r++){
                for(let c=0;c<grid[0].length;c++) pushCell(r,c);
            }
        }else if(coins >= 700){
            const startR = Math.max(0, sink.r - 6);
            const startC = Math.max(0, sink.c - 6);
            for(let r=startR;r<=sink.r;r++){
                for(let c=startC;c<=sink.c;c++) pushCell(r,c);
            }
        }else if(coins >= 400){
            let bestRegion = {r:0,c:0,count:-1};
            for(let r=0;r<=grid.length-5;r++){
                for(let c=0;c<=grid[0].length-10;c++){
                    let count = 0;
                    for(let ir=r;ir<r+5;ir++){
                        for(let ic=c;ic<c+10;ic++){
                            if(grid[ir][ic].type === "DIRT") count++;
                        }
                    }
                    if(count > bestRegion.count) bestRegion = {r,c,count};
                }
            }
            for(let r=bestRegion.r;r<bestRegion.r+5;r++){
                for(let c=bestRegion.c;c<bestRegion.c+10;c++) pushCell(r,c);
            }
        }else{
            const activeCells = [];
            connected.forEach(k => {
                const [r,c] = k.split(",").map(Number);
                activeCells.push({r,c});
            });
            const dirts = [];
            for(let r=0;r<grid.length;r++){
                for(let c=0;c<grid[0].length;c++){
                    if(grid[r][c].type === "DIRT"){
                        const dist = activeCells.length
                            ? Math.min(...activeCells.map(a => this.manhattan(a, {r,c})))
                            : 999999;
                        dirts.push({r,c,dist});
                    }
                }
            }
            dirts.sort((a,b)=>a.dist-b.dist);
            const limit = coins >= 200 ? 3 : 1;
            dirts.slice(0, limit).forEach(cell => pushCell(cell.r, cell.c));
        }

        const keySet = new Set(zoneCells.map(cell => this.key(cell)));
        return {
            keySet,
            cells: zoneCells,
            createdAt: Date.now()
        };
    }

    getRemainingHintCoins(grid, connected){
        if(!this.postHintZone?.keySet) return [];

        const coins = [];
        this.postHintZone.keySet.forEach(k => {
            const [r,c] = k.split(",").map(Number);
            const cell = grid[r]?.[c];
            if(cell?.hasCoin){
                coins.push({
                    r,
                    c,
                    reachable: connected.has(k),
                    distance: this.distanceFromSetToPoint(connected, {r,c})
                });
            }
        });

        this.postHintCoins = coins;
        if(!coins.length){
            this.postHintZone = null;
        }

        return coins;
    }

    pickBestHintCoinTarget(coins, connected, sinkEntry){
        const scored = [...coins].sort((a,b) => {
            if(a.reachable !== b.reachable) return a.reachable ? -1 : 1;
            if(a.distance !== b.distance) return a.distance - b.distance;
            return this.manhattan(a, sinkEntry) - this.manhattan(b, sinkEntry);
        });
        return scored[0] || null;
    }

    findNearestReachableCoin(grid, connected, sinkEntry){
        let best = null;
        connected.forEach(k => {
            const [r,c] = k.split(",").map(Number);
            const cell = grid[r]?.[c];
            if(!cell?.hasCoin) return;
            const score = this.manhattan({r,c}, sinkEntry);
            if(!best || score < best.score){
                best = { r, c, score };
            }
        });
        return best ? { r:best.r, c:best.c } : null;
    }

    findNearestRock(frontier, sinkEntry, sink, blockSinkZoneBeforeEntry=false){
        const rocks = frontier.filter(node => node.type === "ROCK");
        let best = null;
        for(const rock of rocks){
            if(blockSinkZoneBeforeEntry && this.isInSinkZone(rock, sink, 7)) continue;
            const score = this.manhattan(rock, sinkEntry);
            if(!best || score < best.score){
                best = { r:rock.r, c:rock.c, score };
            }
        }
        return best ? { r:best.r, c:best.c } : null;
    }

    countZoneRocks(grid, sink, radius=7){
        let total = 0;
        for(let r=0;r<grid.length;r++){
            for(let c=0;c<grid[0].length;c++){
                if(!this.isInSinkZone({r,c}, sink, radius)) continue;
                if(String(grid[r][c]?.type || "").toUpperCase()==="DIRT") total++;
            }
        }
        return total;
    }

    getSinkRotationAttemptKey(node, rot, mode){
        return `${mode}:${node.r},${node.c}:${rot}`;
    }

    getSinkRotationAttemptCount(node, rot, mode){
        const key = this.getSinkRotationAttemptKey(node, rot, mode);
        return this.sinkZoneRotationAttempts?.get(key) || 0;
    }

    recordSinkRotationAttempt(node, rot, mode){
        const key = this.getSinkRotationAttemptKey(node, rot, mode);
        this.sinkZoneRotationAttempts.set(
            key,
            (this.sinkZoneRotationAttempts.get(key) || 0) + 1
        );
    }

    resetSinkRotationAttempts(strategy=null){
        this.sinkZoneRotationAttempts = new Map();
        this.lastSinkZoneStrategy = strategy;
    }

    searchSinkZoneStateSpace(state, context){
        if(!context) return null;

        if(this.lastSinkZoneStrategy !== "STATE_SEARCH"){
            this.resetSinkRotationAttempts("STATE_SEARCH");
        }

        const initialGrid = JSON.parse(JSON.stringify(state.grid));
        const depthLimit = 12;
        const expandLimit = 140;
        const open = [];
        const visited = new Map();
        const start = this.makeSinkSearchNode(
            initialGrid,
            {
                coins: state.coins,
                shovels: state.shovels,
                shovelCost: state.shovelCost
            },
            context,
            0,
            null
        );

        open.push(start);
        visited.set(start.key, 0);

        let best = null;
        let expanded = 0;

        while(open.length && expanded < expandLimit){
            open.sort((a,b)=>a.priority-b.priority || a.heuristic-b.heuristic);
            const current = open.shift();
            expanded++;

            if(current.goal){
                return current.firstAction;
            }

            if(!best || current.heuristic < best.heuristic){
                best = current;
            }

            if(current.depth >= depthLimit) continue;

            const actions = this.generateSinkSearchActions(current, context);
            for(const action of actions){
                const next = this.applySinkSearchAction(current, action, context);
                if(!next) continue;
                const known = visited.get(next.key);
                if(known !== undefined && known <= next.cost) continue;
                visited.set(next.key, next.cost);
                open.push(next);
            }
        }

        return best?.firstAction || null;
    }

    makeSinkSearchNode(grid, resources, context, depth, firstAction){
        const source = this.find(grid, "SOURCE");
        const flow = this.bfs(grid, source);
        const connected = flow.visited;
        const frontier = flow.frontier;
        const distanceToEntry = this.distanceSet(connected, context.sinkEntry);
        const distanceToSink = this.distanceSet(connected, context.sink);
        const reachedEntry = connected.has(this.key(context.sinkEntry));
        const reachedSink = connected.has(this.key(context.sink));
        const blockedRocks = this.countZoneRocks(grid, context.sink, 7);
        const flowHead = this.getClosestFlowCellToTarget(connected, context.sinkEntry);
        const flowDirection = this.getFlowDirection(grid, flowHead, context.sinkEntry);
        const heuristic =
            distanceToEntry * 25 +
            distanceToSink * 10 +
            blockedRocks * 18 +
            (flowDirection.aligned ? 0 : 12) +
            depth * 6;

        return {
            grid,
            resources,
            connected,
            frontier,
            depth,
            cost: depth,
            heuristic,
            priority: depth + heuristic,
            goal: reachedSink || reachedEntry,
            firstAction,
            key: this.serializeSinkSearchState(grid, resources, context, flowHead, flowDirection),
            flowHead,
            flowDirection
        };
    }

    serializeSinkSearchState(grid, resources, context, flowHead, flowDirection){
        const zone = [];
        for(const node of context.zoneCells){
            const cell = grid[node.r]?.[node.c];
            zone.push(`${node.r},${node.c}:${cell?.type || ""}:${cell?.rotation || 0}`);
        }
        return [
            zone.join("|"),
            resources.coins,
            resources.shovels,
            flowHead ? `${flowHead.r},${flowHead.c}` : "none",
            flowDirection.index
        ].join("#");
    }

    getClosestFlowCellToTarget(connected, target){
        let best = null;
        let bestDist = 999999;
        connected.forEach(k => {
            const [r,c] = k.split(",").map(Number);
            const d = this.manhattan({r,c}, target);
            if(d < bestDist){
                bestDist = d;
                best = {r,c};
            }
        });
        return best;
    }

    getFlowDirection(grid, node, target){
        if(!node){
            return { index:-1, aligned:false };
        }
        const dirs = [
            {dr:-1,dc:0},
            {dr:0,dc:1},
            {dr:1,dc:0},
            {dr:0,dc:-1}
        ];
        const bestIndex = dirs.reduce((best, dir, index) => {
            const next = { r: node.r + dir.dr, c: node.c + dir.dc };
            const score = this.manhattan(next, target);
            if(!best || score < best.score) return { index, score };
            return best;
        }, null);
        const desired =
            Math.abs(target.c - node.c) >= Math.abs(target.r - node.r)
                ? (target.c >= node.c ? 1 : 3)
                : (target.r >= node.r ? 2 : 0);
        return {
            index: bestIndex?.index ?? -1,
            aligned: bestIndex?.index === desired
        };
    }

    generateSinkSearchActions(node, context){
        const actions = [];
        const candidateKeys = new Set([
            ...context.flowZoneSet,
            ...context.flowNeighborSet
        ]);

        for(const key of candidateKeys){
            if(!context.zoneSet.has(key)) continue;
            const [r,c] = key.split(",").map(Number);
            const cell = node.grid[r]?.[c];
            const type = String(cell?.type || "").toUpperCase();
            if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
            for(const rot of this.getCandidateRotationsForCell(cell)){
                if(this.getSinkRotationAttemptCount({r,c}, rot, "STATE_SEARCH") >= 3) continue;
                actions.push({ type:"ROTATE", r, c, rot });
            }
        }

        const rockAction = this.findSinkSearchRockCandidate(node, context);
        if(rockAction){
            actions.push(rockAction);
        }

        return actions;
    }

    findSinkSearchRockCandidate(node, context){
        const rockPlan = this.findBestRock(
            {
                grid: node.grid,
                shovels: node.resources.shovels,
                shovelCost: node.resources.shovelCost
            },
            node.connected,
            context.frontierZone,
            context.sink,
            {
                goal: context.sinkEntry,
                restrictToZone: true,
                zoneRadius: 7
            }
        );

        if(!rockPlan?.rock) return null;
        const rock = rockPlan.rock;
        const rockKey = this.key(rock);
        const useful =
            context.flowNeighborSet.has(rockKey) ||
            this.manhattan(rock, context.sinkEntry) <= 2 ||
            context.frontierZone.some(node => this.key(node)===rockKey);

        if(!useful) return null;
        if(node.resources.shovels <= 0) return null;

        return { type:"DESTROY", r:rock.r, c:rock.c };
    }

    applySinkSearchAction(current, action, context){
        const grid = JSON.parse(JSON.stringify(current.grid));
        const resources = { ...current.resources };

        if(action.type==="ROTATE"){
            grid[action.r][action.c].rotation = action.rot;
        }else if(action.type==="DESTROY"){
            if(resources.shovels <= 0) return null;
            resources.shovels -= 1;
            grid[action.r][action.c].type = "STRAIGHT";
            grid[action.r][action.c].rotation = 0;
        }else{
            return null;
        }

        const firstAction = current.firstAction || {
            ...action,
            score: Math.max(1, 1000 - current.heuristic),
            cost: current.depth + 1
        };

        return this.makeSinkSearchNode(
            grid,
            resources,
            context,
            current.depth + 1,
            firstAction
        );
    }

    buildSinkZoneContext(grid, connected, frontier, sink){
        const sinkEntry = this.getSinkEntry(grid, sink);
        const zoneCells = [];
        const zoneSet = new Set();
        const flowZoneCells = [];
        const flowZoneSet = new Set();
        const flowNeighborSet = new Set();
        const frontierZone = [];

        for(let r=0;r<grid.length;r++){
            for(let c=0;c<grid[0].length;c++){
                const node = {r,c};
                if(!this.isInSinkZone(node, sink, 7)) continue;
                zoneCells.push(node);
                zoneSet.add(this.key(node));
            }
        }

        connected.forEach(k => {
            const [r,c] = k.split(",").map(Number);
            const node = {r,c};
            if(!this.isInSinkZone(node, sink, 7)) return;
            flowZoneCells.push(node);
            flowZoneSet.add(k);
            this.neighbors(grid, node).forEach(next => {
                if(this.isInSinkZone(next, sink, 7)){
                    flowNeighborSet.add(this.key(next));
                }
            });
        });

        frontier.forEach(node => {
            if(this.isInSinkZone(node, sink, 7)) frontierZone.push(node);
        });

        return {
            sink,
            sinkEntry,
            zoneCells,
            zoneSet,
            flowZoneCells,
            flowZoneSet,
            flowNeighborSet,
            frontierZone
        };
    }

    getCandidateRotationsForCell(cell){
        const type = String(cell.type || "").toUpperCase();
        const original = cell.rotation || 0;
        const maxRot = type==="CROSS" ? 1 : 4;
        const rotations = [];
        for(let rot=0;rot<maxRot;rot++){
            if(rot===original) continue;
            rotations.push(rot);
        }
        return rotations;
    }

    findSinkZoneRotation(state, connected, context){
        if(!context) return null;

        if(this.lastSinkZoneStrategy !== "FLOW_CONNECT"){
            this.resetSinkRotationAttempts("FLOW_CONNECT");
        }

        const grid = state.grid;
        const candidates = [];
        const directKeys = new Set([
            this.key(context.sinkEntry),
            ...context.frontierZone.map(node => this.key(node)),
            ...context.flowZoneCells.map(node => this.key(node)),
            ...context.flowNeighborSet
        ]);

        for(const key of directKeys){
            const [r,c] = key.split(",").map(Number);
            if(!context.zoneSet.has(key)) continue;
            const cell = grid[r]?.[c];
            const type = String(cell?.type || "").toUpperCase();
            if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
            for(const rot of this.getCandidateRotationsForCell(cell)){
                const score = this.evaluateSinkZoneRotation(state, connected, context, {r,c}, rot, "FLOW_CONNECT");
                if(score) candidates.push(score);
            }
        }

        candidates.sort((a,b)=>b.score-a.score);
        return candidates[0] || null;
    }

    findSinkZoneFlowAdjustment(state, connected, context){
        if(!context || !context.flowZoneCells.length) return null;

        if(this.lastSinkZoneStrategy !== "FLOW_ADJUST"){
            this.resetSinkRotationAttempts("FLOW_ADJUST");
        }

        const grid = state.grid;
        const candidates = [];

        for(const node of context.flowZoneCells){
            const cell = grid[node.r]?.[node.c];
            const type = String(cell?.type || "").toUpperCase();
            if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
            for(const rot of this.getCandidateRotationsForCell(cell)){
                const score = this.evaluateSinkZoneRotation(state, connected, context, node, rot, "FLOW_ADJUST");
                if(score) candidates.push(score);
            }
        }

        candidates.sort((a,b)=>b.score-a.score);
        return candidates[0] || null;
    }

    findSinkZoneBackwardMove(state, connected, context){
        if(!context) return null;

        if(this.lastSinkZoneStrategy !== "BACKWARD"){
            this.resetSinkRotationAttempts("BACKWARD");
        }

        const grid = state.grid;
        const backwardTargets = [context.sinkEntry, ...this.neighbors(grid, context.sinkEntry)
            .filter(node => context.zoneSet.has(this.key(node)))];
        const candidates = [];

        for(const node of backwardTargets){
            const key = this.key(node);
            if(!context.zoneSet.has(key)) continue;
            const cell = grid[node.r]?.[node.c];
            const type = String(cell?.type || "").toUpperCase();
            if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
            for(const rot of this.getCandidateRotationsForCell(cell)){
                const score = this.evaluateSinkZoneRotation(state, connected, context, node, rot, "BACKWARD");
                if(score) candidates.push(score);
            }
        }

        candidates.sort((a,b)=>b.score-a.score);
        return candidates[0] || null;
    }

    findSinkZoneRockAction(state, connected, context){
        if(!context) return null;

        const rockPlan = this.findBestRock(
            state,
            connected,
            context.frontierZone,
            context.sink,
            {
                goal: context.sinkEntry,
                restrictToZone: true,
                zoneRadius: 7
            }
        );

        if(!rockPlan?.rock) return null;

        const rock = rockPlan.rock;
        const rockKey = this.key(rock);
        const nearSink = this.manhattan(rock, context.sinkEntry) <= 2;
        const blocksFlow = context.frontierZone.some(node => this.key(node) === rockKey);
        const nearFlow = context.flowNeighborSet.has(rockKey);

        if(!nearSink && !blocksFlow && !nearFlow){
            return null;
        }

        return {
            rock,
            rocksNeeded: rockPlan.rocksNeeded,
            score: (nearSink ? 300 : 0) + (blocksFlow ? 220 : 0) + (nearFlow ? 180 : 0)
        };
    }

    evaluateSinkZoneRotation(state, connected, context, node, rot, mode){
        const grid = state.grid;
        const cell = grid[node.r]?.[node.c];
        if(!cell) return null;
        if(this.getSinkRotationAttemptCount(node, rot, mode) >= 3){
            return null;
        }

        const original = cell.rotation || 0;
        cell.rotation = rot;

        const flow = this.bfs(grid, this.find(grid, "SOURCE"));
        const newSet = flow.visited;
        const expandScore = newSet.size - connected.size;
        const distanceToEntryAfter = this.distanceSet(newSet, context.sinkEntry);
        const distanceToSinkAfter = this.distanceSet(newSet, context.sink);
        const reachedEntry = newSet.has(this.key(context.sinkEntry));
        const reachedSink = newSet.has(this.key(context.sink));
        const nodeOnFlow = newSet.has(this.key(node));

        cell.rotation = original;

        if(reachedSink){
            return {
                r:node.r,
                c:node.c,
                rot,
                expand:newSet.size,
                expandScore,
                score:999999,
                zoneMode:mode
            };
        }

        if(!nodeOnFlow && mode!=="BACKWARD") return null;

        let score =
            (20 - distanceToEntryAfter) * 140 +
            (20 - distanceToSinkAfter) * 80 +
            expandScore * 75;

        if(reachedEntry) score += 800;
        if(mode==="FLOW_ADJUST") score += 120;
        if(mode==="BACKWARD") score += 180;
        if(this.manhattan(node, context.sinkEntry) <= 1) score += 90;

        if(score <= 0) return null;

        return {
            r:node.r,
            c:node.c,
            rot,
            expand:newSet.size,
            expandScore,
            score,
            zoneMode:mode
        };
    }

    scoreRotationCandidate(params){
        const {
            p,
            repeatCount,
            expandScore,
            currentTargetDistance,
            currentSinkDistance,
            targetDistanceAfter,
            sinkDistanceAfter,
            coinGain,
            nearSink,
            inSinkZone,
            terminalAware,
            recoveringHint
        } = params;

        const distanceWeight = terminalAware ? 260 : inSinkZone ? 150 : nearSink ? 120 : 32;
        const sinkWeight = terminalAware ? 320 : inSinkZone ? 240 : nearSink ? 180 : 40;
        const coinWeight = recoveringHint ? 140 : terminalAware ? 0 : inSinkZone ? 0 : nearSink ? 4 : 24;
        const expandWeight = recoveringHint ? 85 : terminalAware ? 90 : nearSink ? 70 : 60;
        const backtrackPenalty =
            sinkDistanceAfter > currentSinkDistance
                ? (terminalAware ? 450 : inSinkZone ? 280 : nearSink ? 220 : 60)
                : 0;
        const repeatPenalty = repeatCount * (terminalAware ? 140 : 70);
        const localPenalty =
            this.lastMove &&
            this.lastMove.r===p.r &&
            this.lastMove.c===p.c
                ? 15
                : 0;

        return (
            (currentTargetDistance - targetDistanceAfter) * distanceWeight +
            (currentSinkDistance - sinkDistanceAfter) * sinkWeight +
            expandScore * expandWeight +
            coinGain * coinWeight -
            backtrackPenalty -
            repeatPenalty -
            localPenalty
        );
    }

    findForcedCompletion(state, source, sink, radius=2){
        const grid = state.grid;
        const sinkEntry = this.getSinkEntry(grid, sink);
        const candidates = [];

        for(let r=0;r<grid.length;r++){
            for(let c=0;c<grid[0].length;c++){
                const cell = grid[r][c];
                const type = String(cell.type || "").toUpperCase();
                if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
                if(this.manhattan({r,c},sink) > radius) continue;
                candidates.push({
                    r,
                    c,
                    priority:this.manhattan({r,c},sinkEntry)
                });
            }
        }

        candidates.sort((a,b)=>a.priority-b.priority);

        for(const candidate of candidates){
            const cell = grid[candidate.r][candidate.c];
            const cellType = String(cell.type || "").toUpperCase();
            const original = cell.rotation || 0;
            const maxRot = cellType==="CROSS" ? 1 : 4;

            for(let rot=0;rot<maxRot;rot++){
                if(rot===original) continue;
                cell.rotation = rot;

                const flow = this.bfs(grid, source);
                if(flow.visited.has(this.key(sink))){
                    cell.rotation = original;
                    return { r:candidate.r, c:candidate.c, rot, score:999999, expand:999999 };
                }
            }

            cell.rotation = original;
        }

        return null;
    }

    shouldUseHint(state, context){
        if(!this.canUseHint(state, context)) return false;

        if(context.terminalAware && context.zoneFailed) return true;
        if(context.nearSink && context.noProgress) return true;
        if(context.patternLoop) return true;
        if(context.noProgress) return true;
        if(context.noValidAction) return true;
        if(context.lackResource) return true;

        return false;
    }

    findFallbackRotation(state, connected, sink, options={}){
        const grid = state.grid;
        const candidates = [];

        for(let r=0;r<grid.length;r++){
            for(let c=0;c<grid[0].length;c++){
                const cell = grid[r][c];
                const type = String(cell.type || "").toUpperCase();
                if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
                if(this.sinkLockActive && !this.isInSinkZone({r,c}, sink, this.sinkLockRadius)) continue;
                if(options.blockSinkZoneBeforeEntry && this.isInSinkZone({r,c}, sink, 7)) continue;
                if(options.recoverHint && this.postHintZone?.keySet?.size){
                    const closeToHint = this.postHintZone.keySet.has(this.key({r,c})) ||
                        (options.hintTarget && this.manhattan({r,c}, options.hintTarget) <= 2);
                    if(!closeToHint && options.inSinkZone) continue;
                }

                const original = cell.rotation || 0;
                const cellKey = this.key({r,c});
                const maxRot = type==="CROSS" ? 1 : 4;
                for(let rot=0;rot<maxRot;rot++){
                    if(rot===original) continue;
                    const repeatPenalty = options.ignoreHistory ? 0 : (this.rotationMap.get(cellKey) || 0) * 25;
                    const sinkPenalty = options.inSinkZone
                        ? this.manhattan({r,c}, this.getSinkEntry(grid, sink)) * 12
                        : this.manhattan({r,c}, sink) * 4;
                    const hintBonus = options.recoverHint && options.hintTarget
                        ? Math.max(0, 80 - this.manhattan({r,c}, options.hintTarget) * 18)
                        : 0;
                    const randomness = Math.random() * 10;
                    candidates.push({
                        r,
                        c,
                        rot,
                        expand: connected.size,
                        score: hintBonus - repeatPenalty - sinkPenalty + randomness
                    });
                }
            }
        }

        candidates.sort((a,b)=>b.score-a.score);
        return candidates[0] || null;
    }

    findRandomValidRotation(state, sink, options={}){
        const grid = state.grid;
        const candidates = [];

        for(let r=0;r<grid.length;r++){
            for(let c=0;c<grid[0].length;c++){
                const cell = grid[r][c];
                const type = String(cell.type || "").toUpperCase();
                if(type==="DIRT" || type==="SOURCE" || type==="SINK") continue;
                if(this.sinkLockActive && !this.isInSinkZone({r,c}, sink, this.sinkLockRadius)) continue;
                if(options.blockSinkZoneBeforeEntry && this.isInSinkZone({r,c}, sink, 7)) continue;
                const original = cell.rotation || 0;
                const maxRot = type==="CROSS" ? 1 : 4;
                for(let rot=0;rot<maxRot;rot++){
                    if(rot===original) continue;
                    candidates.push({
                        r,
                        c,
                        rot,
                        expand: this.lastFlowSize,
                        score: Math.random() * 100
                    });
                }
            }
        }

        if(!candidates.length) return null;
        candidates.sort((a,b)=>b.score-a.score);
        return candidates[0];
    }

    softResetStrategy(sinkLockRadius=3){
        this.rotationMap = new Map();
        this.lastMoves = [];
        this.noProgressSteps = 0;
        this.loopCount = 0;
        this.resetSinkRotationAttempts(this.lastSinkZoneStrategy);
        if(this.sinkLockActive){
            this.sinkLockRadius = sinkLockRadius;
        }
    }

    canUseHint(state, context={}){
        if(!this.actions.hint) return false;
        if((this.aiTick - this.lastHintTick) < this.hintCooldownTicks) return false;
        const requiredCoins = context.inSinkZone ? 700 : 50;
        return state.coins >= requiredCoins;
    }

    executeRotate(move, connectedSize){
        const moveKey = `${move.r},${move.c}`;
        this.lastMove = { type:"ROTATE", r:move.r, c:move.c };
        this.lastMoves.push(moveKey);
        if(this.lastMoves.length>6) this.lastMoves.shift();
        if(move.zoneMode){
            this.sinkZoneAttempts++;
            this.recordSinkRotationAttempt({r:move.r, c:move.c}, move.rot, move.zoneMode);
            this.lastSinkZoneStrategy = move.zoneMode;
        }else{
            this.sinkZoneAttempts = 0;
        }

        if(move.expand>connectedSize){
            this.stuckCount = 0;
        }else{
            this.stuckCount++;
        }

        this.rotationMap.set(moveKey, (this.rotationMap.get(moveKey)||0)+1);

        this.logger(`ROTATE (${move.r},${move.c}) -> ${move.rot}`);
        this.actions.rotate(move.r, move.c, move.rot);
    }

    executeDestroy(rock){
        this.lastMove = { type:"DESTROY", r:rock.r, c:rock.c };
        this.repeatCount = 0;
        this.stuckCount = 0;
        this.noProgressSteps = 0;
        this.sinkZoneAttempts = 0;
        this.resetSinkRotationAttempts();
        this.logger(`DESTROY (${rock.r},${rock.c})`);
        this.actions.destroy(rock.r,rock.c);
    }

    executeBuy(){
        this.lastMove = { type:"BUY" };
        this.repeatCount = 0;
        this.stuckCount = 0;
        this.sinkZoneAttempts = 0;
        this.resetSinkRotationAttempts();
        this.logger("BUY_SHOVEL");
        this.actions.buy();
    }

    executeHint(state, connected, sink){
        this.lastMove = { type:"HINT" };
        this.stuckCount = 0;
        this.noProgressSteps = 0;
        this.sinkZoneAttempts = 0;
        this.resetSinkRotationAttempts();
        this.postHintZone = this.computeHintZone(state, connected, sink);
        this.lastHintTick = this.aiTick;
        this.logger(state.coins>=700 ? "USE_HINT_STRONG" : "USE_HINT");
        this.actions.hint();
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
