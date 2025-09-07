(function () {
    const old = document.getElementById('moddingHub');
    if (old) old.remove();

    const grabCursor = 'grab', grabbingCursor = 'grabbing';
    const dragHitbox = 15;
    let dragging = false, posX = 0, posY = 0;
    let darkTheme = false;

    // Create main container
    const hub = document.createElement('div');
    hub.id = 'moddingHub';
    Object.assign(hub.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '350px',
        padding: '15px',
        background: 'rgba(0, 128, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '3px solid #004d00',
        borderRadius: '14px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        color: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: 'none',
        cursor: 'default',
        zIndex: 9999,
        overflow: 'hidden',
        transition: 'width 0.3s ease, height 0.3s ease, padding 0.3s ease, background 0.4s ease, border-color 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    });

    // Header with title and controls
    const header = document.createElement('div');
    Object.assign(header.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    });

    const title = document.createElement('div');
    title.textContent = 'Epic Hub';
    Object.assign(title.style, {
        flex: '1',
        fontWeight: '700',
        fontSize: '22px',
        letterSpacing: '1.1px',
        userSelect: 'none',
        textShadow: '0 0 4px rgba(0,0,0,0.3)',
    });

    // Controls container for minimize, close, and theme toggle
    const controls = document.createElement('div');
    Object.assign(controls.style, {
        display: 'flex',
        gap: '10px',
    });

    // Button helper to create icon buttons
    function iconButton(symbol, hoverColor, titleText) {
        const btn = document.createElement('button');
        btn.textContent = symbol;
        btn.title = titleText || '';
        Object.assign(btn.style, {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            userSelect: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'color 0.3s, background-color 0.3s, transform 0.1s ease',
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.color = hoverColor;
            btn.style.backgroundColor = 'rgba(255,255,255,0.15)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.color = 'white';
            btn.style.backgroundColor = 'transparent';
            btn.style.transform = 'scale(1)';
        });
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1)';
        });

        return btn;
    }

    const minBtn = iconButton('−', 'orange', 'Minimize');
    const closeBtn = iconButton('×', 'red', 'Close');
    const themeBtn = iconButton('☀️', '#FFD700', 'Toggle Theme');

    controls.append(minBtn, closeBtn, themeBtn);
    header.append(title, controls);
    hub.append(header);

    // Container for buttons
    const btnContainer = document.createElement('div');
    Object.assign(btnContainer.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    });
    hub.append(btnContainer);

    // Button factory with gradient backgrounds and hover effects
    function btn(label, colors, onClick) {
        // colors: {start, end}
        const b = document.createElement('button');
        b.textContent = label;
        Object.assign(b.style, {
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            backgroundImage: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
            boxShadow: `0 4px 10px ${colors.end}88`,
            userSelect: 'none',
            transition: 'transform 0.1s ease, box-shadow 0.3s ease',
        });

        b.addEventListener('mouseenter', () => {
            b.style.filter = 'brightness(1.1)';
        });
        b.addEventListener('mouseleave', () => {
            b.style.filter = 'brightness(1)';
            b.style.transform = 'scale(1)';
        });
        b.addEventListener('mousedown', () => {
            b.style.transform = 'scale(0.95)';
            b.style.boxShadow = `0 2px 6px ${colors.end}bb`;
        });
        b.addEventListener('mouseup', () => {
            b.style.transform = 'scale(1)';
            b.style.boxShadow = `0 4px 10px ${colors.end}88`;
        });

        b.onclick = onClick;
        btnContainer.append(b);
        return b;
    }

    // Buttons with refined colors
    btn('🍪 Infinite Cookies', { start: '#3CAF50', end: '#2E7D32' }, () => {
        Game.cookies = Infinity;
        Game.Notify("∞ cookies!", "", "", 1, 1);
    });

    btn('👵 1 Trillion Grandmas', { start: '#FF4081', end: '#C2185B' }, () => {
        const g = Game.Objects?.Grandma;
        if (g) {
            g.amount = g.bought = 1e12;
            Game.BuildingsOwned += 1e12;
            Game.recalculateGains = 1;
            Game.Notify("1T Grandmas!", "", "", 1, 1);
        }
    });

    btn('🧍 1 Trillion You', { start: '#7B1FA2', end: '#4A148C' }, () => {
        const y = Game.Objects?.You;
        if (y) {
            y.amount = y.bought = 1e12;
            Game.BuildingsOwned += 1e12;
            Game.recalculateGains = 1;
            Game.Notify("1T You!", "", "", 1, 1);
        }
    });

    btn('🖱️ 10 Thousand Cursors', { start: '#2196F3', end: '#1565C0' }, () => {
        const c = Game.Objects?.Cursor;
        if (c) {
            c.amount = c.bought = 10000;
            Game.BuildingsOwned += 10000;
            Game.recalculateGains = 1;
            Game.Notify("10k Cursors!", "", "", 1, 1);
        }
    });

    btn('🍬 Infinite Sugar Lumps', { start: '#FB8C00', end: '#EF6C00' }, () => {
        Game.lumps = Infinity;
        Game.Notify("∞ Sugar Lumps!", "", "", 1, 1);
    });

    btn('🔓 Unlock All Upgrades', { start: '#43A047', end: '#2E7D32' }, () => {
        for (let i in Game.UpgradesById) {
            const upg = Game.UpgradesById[i];
            if (!upg.bought && upg.unlocked === 0) upg.unlock();
            if (!upg.bought && upg.unlocked) upg.buy();
        }
        Game.Notify("All upgrades unlocked!", "", "", 1, 1);
    });

    btn('🏆 Unlock All Achievements', { start: '#FBC02D', end: '#F57F17' }, () => {
        for (let i in Game.AchievementsById) {
            const ach = Game.AchievementsById[i];
            if (!ach.won) Game.Win(ach.name);
        }
        Game.Notify("All achievements unlocked!", "", "", 1, 1);
    });

    btn('📈 Level 1 Trillion Grandmas', { start: '#EF6C00', end: '#E65100' }, () => {
        const g = Game.Objects?.Grandma;
        if (g) {
            g.level = 1e12;
            g.refresh();
            Game.Notify("Grandmas leveled to 1T!", "", "", 1, 1);
        }
    });

    btn('📈 Level 1 Trillion Yous', { start: '#6A1B9A', end: '#4A148C' }, () => {
        const y = Game.Objects?.You;
        if (y) {
            y.level = 1e12;
            y.refresh();
            Game.Notify("Yous leveled to 1T!", "", "", 1, 1);
        }
    });

    // Minimize toggle logic
    let minimized = false;
    minBtn.onclick = () => {
        minimized = !minimized;
        btnContainer.style.display = minimized ? 'none' : 'flex';
        hub.style.width = minimized ? '200px' : '350px';
        hub.style.height = minimized ? '40px' : 'auto';
        hub.style.padding = minimized ? '10px 15px' : '15px';
        minBtn.textContent = minimized ? '+' : '−';
    };

    closeBtn.onclick = () => hub.remove();

    // Theme toggle logic (green <-> dark mode)
    themeBtn.onclick = () => {
        darkTheme = !darkTheme;
        if (darkTheme) {
            hub.style.background = 'rgba(20, 20, 20, 0.85)';
            hub.style.borderColor = '#808080';  // gray outline in dark mode
            title.style.textShadow = '0 0 5px #0f0';
            themeBtn.textContent = '🌙';
        } else {
            hub.style.background = 'rgba(0, 128, 0, 0.4)';
            hub.style.borderColor = '#004d00';
            title.style.textShadow = '0 0 4px rgba(0,0,0,0.3)';
            themeBtn.textContent = '☀️';
        }
    };

    // Dragging logic with 15px hitbox on edges
    hub.addEventListener('mousedown', (e) => {
        const r = hub.getBoundingClientRect();
        if (
            e.clientX <= r.left + dragHitbox ||
            e.clientX >= r.right - dragHitbox ||
            e.clientY <= r.top + dragHitbox ||
            e.clientY >= r.bottom - dragHitbox
        ) {
            dragging = true;
            posX = e.clientX;
            posY = e.clientY;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            e.preventDefault();
        }
    });

    hub.addEventListener('mousemove', (e) => {
        const r = hub.getBoundingClientRect();
        if (
            e.clientX <= r.left + dragHitbox ||
            e.clientX >= r.right - dragHitbox ||
            e.clientY <= r.top + dragHitbox ||
            e.clientY >= r.bottom - dragHitbox
        ) {
            hub.style.cursor = dragging ? grabbingCursor : grabCursor;
        } else {
            hub.style.cursor = dragging ? grabbingCursor : 'default';
        }
    });

    function drag(e) {
        if (!dragging) return;
        const dx = posX - e.clientX;
        const dy = posY - e.clientY;
        posX = e.clientX;
        posY = e.clientY;
        hub.style.top = (hub.offsetTop - dy) + 'px';
        hub.style.left = (hub.offsetLeft - dx) + 'px';
        hub.style.right = 'auto';
    }

    function stopDrag() {
        dragging = false;
        hub.style.cursor = 'default';
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }

    document.body.append(hub);
})();
