// script.js - Lógica sin frameworks 

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('conversion-form');
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', async (e) => {
            // Prevenir recarga del navegador (comportamiento por defecto)
            e.preventDefault();

            // Extraer datos del formulario
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                source: 'ConectaIA Gold VSL Landing',
                timestamp: new Date().toISOString()
            };

            // Estado UI: "Procesando..." (Feedback visual claro para prevenir múltiples clics)
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'PROCESANDO...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            submitBtn.style.cursor = 'wait';

            // Ocultar mensajes previos
            messageDiv.classList.add('hidden');
            messageDiv.className = 'form-message hidden';

            try {
                // Mock Fetch API (Apuntando a N8N genérico como solicitado)
                // Usualmente el endpoint sería: 'https://tu-n8n-webhook-url.com/catch'
                const webhookUrl = 'https://tu-n8n-webhook-url.com/catch';

                // NOTA: Para propósitos de demostración al abrir en local, si el webhook falla  
                // o no existe, de todas formas mostraremos un éxito simulado tras 1.5s.
                // Si tienes un webhook real corriendo, puedes descomentar la constante 'response'.

                /*
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Error en la red al enviar datos');
                */

                // Simulacro de carga para la demostración
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mostrar mensaje de éxito
                messageDiv.textContent = '¡Gracias por dar el paso! Revisa tu correo electrónico para las instrucciones de acceso.';
                messageDiv.classList.add('success');
                messageDiv.classList.remove('hidden');

                // Limpiar formulario tras el éxito
                form.reset();

            } catch (error) {
                console.error("Error al procesar el formulario:", error);

                // Mostrar mensaje de error
                messageDiv.textContent = 'Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo más tarde o revisa tu conexión.';
                messageDiv.classList.add('error');
                messageDiv.classList.remove('hidden');
            } finally {
                // Restaurar estado del botón
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        });
    }

    // --- EFECTO DE REVELADO + STAGGER (Intersection Observer) ---
    function initScrollReveal() {
        // === 1. Observer para SECCIONES completas (.reveal) ===
        // Se activa y desactiva según entre/salga del viewport
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active'); // reset al salir
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(el => {
            sectionObserver.observe(el);
        });

        // === 2. Observer para cada ITEM individualmente (.stagger-item) ===
        // Aparece al entrar, desaparece al salir — se re-anima al volver a bajar
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active'); // reset al salir
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -20px 0px'
        });

        document.querySelectorAll('.stagger-item').forEach(item => {
            itemObserver.observe(item);
        });
    }

    // Inicializar funciones
    initWaves();
    initScrollReveal();
});

// --- ANIMACIÓN DE OLAS (Estilo DominIA Academy - Versión Neon Suave) ---
function initWaves() {
    const canvas = document.getElementById('waves-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Paleta Neon basada en el logo (Cian, Púrpura, Verde Lima, Amarillo)
    const neonColors = [
        0x00E5FF, // Cian Neon
        0x9D00FF, // Púrpura Neon
        0x00FF99, // Turquesa/Verde
        0xC6FF00  // Lima/Amarillo
    ];

    // Parámetros de la animación
    const count = 40; // Un poco menos de líneas para limpieza
    const segments = 120; // Más segmentos para curvas más suaves
    const lines = [];

    for (let i = 0; i < count; i++) {
        const points = [];
        for (let j = 0; j <= segments; j++) {
            points.push(new THREE.Vector3((j / segments) * 20 - 10, 0, 0));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Asignar un color aleatorio de la paleta neon
        const color = neonColors[Math.floor(Math.random() * neonColors.length)];
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.15 // Muy sutil para no distraer
        });

        const line = new THREE.Line(geometry, material);

        // Posicionamiento inicial aleatorio
        line.position.y = (Math.random() - 0.5) * 12;
        line.position.z = (Math.random() - 0.5) * 5;

        // Guardamos metadatos para la animación (Ralentizada)
        line.userData = {
            offset: Math.random() * Math.PI * 2,
            speed: 0.0003 + Math.random() * 0.0005, // Mucho más lento
            amplitude: 0.8 + Math.random() * 1.8,
            yBase: line.position.y
        };

        scene.add(line);
        lines.push(line);
    }

    function resize() {
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
    resize();

    function animate(time) {
        requestAnimationFrame(animate);

        lines.forEach((line) => {
            const positions = line.geometry.attributes.position.array;
            const { offset, speed, amplitude, yBase } = line.userData;

            for (let i = 0; i <= segments; i++) {
                const x = (i / segments) * 20 - 10;
                // Velocidad reducida drásticamente (time*0.0004)
                const y = Math.sin(x * 0.4 + time * 0.0002 + offset) * amplitude;

                positions[i * 3 + 1] = y;
            }
            line.geometry.attributes.position.needsUpdate = true;

            // Movimiento vertical de la línea completa casi imperceptible
            line.position.y = yBase + Math.sin(time * 0.0002 + offset) * 0.3;
        });

        renderer.render(scene, camera);
    }

    animate(0);
}
