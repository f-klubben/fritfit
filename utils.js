function hslToHex(h, s, l) {
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h * 360 / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function rbgToHex(r, g, b) {
    const f = n => (n * 255).toString().padStart(2, '0');
    return "#" + f(r) + f(g) + f(b);
}

function tinted(img, color) {
    // Create buffer
    const buffer = document.createElement('canvas');
    buffer.width = img.width;
    buffer.height = img.height;
    const bx = buffer.getContext('2d');

    // Draw color to buffer, then mask using the img
    bx.fillStyle = color
    bx.fillRect(0, 0, buffer.width, buffer.height);
    bx.globalCompositeOperation = 'destination-atop';
    bx.drawImage(img, 0, 0);

    return buffer
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}