import { useEffect, useRef } from 'react';

/**
 * MatrixRain — animated canvas with falling green ASCII/Katakana characters.
 */
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');
    const fontSize = 14;
    const drops = Array.from(
      { length: Math.floor(canvas.width / fontSize) },
      () => Math.random() * -100
    );

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.fillText(char, i * fontSize, y * fontSize);
        ctx.globalAlpha = 1;
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      });
    };

    const id = setInterval(draw, 35);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-80 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
