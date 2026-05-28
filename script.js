// ========================================
// CANVAS DE TEIAS - FUNDO ANIMADO
// ========================================
const canvas = document.getElementById('webCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Pontos da teia
const points = [];
const NUM_POINTS = 80;
const CONNECTION_DISTANCE = 150;

class WebPoint {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff41';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff41';
        ctx.fill();
    }
}

// Inicializar pontos
for (let i = 0; i < NUM_POINTS; i++) {
    points.push(new WebPoint());
}

// Aranha principal (segue mouse)
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Desenhar teia
function drawWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualizar e desenhar pontos
    points.forEach(point => {
        point.update();
        point.draw();
    });

    // Desenhar conexões entre pontos
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < CONNECTION_DISTANCE) {
                const opacity = 1 - (distance / CONNECTION_DISTANCE);
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = `rgba(0, 255, 65, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#00ff41';
                ctx.stroke();
            }
        }
    }

    // Desenhar aranha central
    drawCyberSpider(mouseX, mouseY);
    
    requestAnimationFrame(drawWeb);
}

// Desenhar aranha cibernética
function drawCyberSpider(x, y) {
    const size = 15;
    
    // Corpo
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, '#00ff41');
    gradient.addColorStop(0.5, '#003300');
    gradient.addColorStop(1, '#000000');
    
    ctx.beginPath();
    ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00ff41';
    ctx.fill();

    // Olhos vermelhos
    ctx.beginPath();
    ctx.arc(x - 4, y - 2, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff0000';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 4, y - 2, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Patas com efeito cyber
    const legOffsets = [-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6];
    const legLength = size * 2.5;
    
    legOffsets.forEach((offset, i) => {
        const angle = (i / legOffsets.length) * Math.PI * 2 + Date.now() * 0.002;
        const endX = x + Math.cos(angle) * legLength;
        const endY = y + Math.sin(angle) * legLength * 0.8;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff41';
        ctx.stroke();

        // Ponta das patas
        ctx.beginPath();
        ctx.arc(endX, endY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    });
}

// Iniciar animação
drawWeb();

// ========================================
// EFEITO DE MATRIX (caindo nos cantos)
// ========================================
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const matrixCanvas = document.createElement('canvas');
matrixCanvas.style.position = 'fixed';
matrixCanvas.style.top = '0';
matrixCanvas.style.right = '0';
matrixCanvas.style.width = '100px';
matrixCanvas.style.height = '100%';
matrixCanvas.style.pointerEvents = 'none';
matrixCanvas.style.zIndex = '1';
matrixCanvas.style.opacity = '0.1';

const mCtx = matrixCanvas.getContext('2d');
matrixCanvas.width = 100;
matrixCanvas.height = window.innerHeight;

document.body.appendChild(matrixCanvas);

const drops = [];
for (let i = 0; i < 10; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    mCtx.fillStyle = '#00ff41';
    mCtx.font = '14px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        mCtx.fillText(text, i * 10, drops[i] * 10);
        
        if (drops[i] * 10 > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    
    requestAnimationFrame(drawMatrix);
}

drawMatrix();

// ========================================
// REDIMENSIONAR CANVAS
// ========================================
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrixCanvas.height = window.innerHeight;
});