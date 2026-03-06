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

    // Inicializar funciones (Cambiamos initWaves por initNetworkAnimation)
    initNetworkAnimation();
    initScrollReveal();
});

// --- ANIMACIÓN DE CONSTELACIONES MULTICOLOR CON BRILLO (Estilo Escarcha ConectaIA) ---
function initNetworkAnimation() {
    const canvas = document.getElementById('waves-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    // Importante para que los brillos se sumen correctamente y se vea más intenso
    renderer.autoClear = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    // Paleta de colores Neón (Personalizada ConectaIA Gold)
    const neonPalette = [
        new THREE.Color(0x00E5FF), // Cian
        new THREE.Color(0x3366cc), // Azul más oscuro (profundo)
        new THREE.Color(0xFF00FF), // Fucsia (el que ya tenías)
        new THREE.Color(0xff99ff), // Rosa luminoso
        new THREE.Color(0x39FF14), // Verde Neón (el que ya tenías)
        new THREE.Color(0x8A2BE2), // Violeta (el que ya tenías)
    ];

    const particleCount = 130;
    const maxDistance = 4.0;

    // --- NUEVO: CREAR TEXTURA DE CÍRCULO CON HALO (Brillo) ---
    function createCircleGlowTexture() {
        const size = 64; // Tamaño de la textura en pixeles
        const canvasGlow = document.createElement('canvas');
        canvasGlow.width = size;
        canvasGlow.height = size;
        const ctx = canvasGlow.getContext('2d');

        // Dibujar un degradado radial: blanco intenso en el centro, transparente en el borde
        const centerX = size / 2;
        const centerY = size / 2;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size / 2);

        // El centro es blanco puro (para tomar el color del vértice después)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        // Se difumina rápido a blanco translúcido (el "cuerpo" del punto)
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        // El halo/brillo externo sutil
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        // Totalmente transparente en el borde (hace el punto redondo)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        const texture = new THREE.Texture(canvasGlow);
        texture.needsUpdate = true;
        return texture;
    }

    // --- ACTUALIZADO: MATERIAL DE PARTÍCULAS CON TEXTURA Y BLENDING ---
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.6, // Aumentamos el tamaño porque la textura tiene bordes transparentes
        transparent: true,
        opacity: 1.0, // Opacidad total, el degradado lo hace la textura
        vertexColors: true,
        map: createCircleGlowTexture(), // Aplicamos la textura redonda con brillo
        depthWrite: false, // Necesario para que el blending transparente funcione bien
        blending: THREE.AddBlending // IMPORTANTE: Suma los colores al superponerse, creando "luz"
    });

    const lineMaterial = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.15, // Líneas muy sutiles para que destaquen los nodos brillantes
        vertexColors: true,
        blending: THREE.AddBlending // También sumamos luz en las líneas
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    // Generar puntos y asignarles color
    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 40;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

        const randomColor = neonPalette[Math.floor(Math.random() * neonPalette.length)];
        particleColors[i * 3] = randomColor.r;
        particleColors[i * 3 + 1] = randomColor.g;
        particleColors[i * 3 + 2] = randomColor.b;

        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.015, // Movimiento un poco más lento para dar sensación de 'flow'
            y: (Math.random() - 0.5) * 0.015
        });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    function resize() {
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
    resize();

    function animate() {
        requestAnimationFrame(animate);

        const positions = particlesGeometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += particleVelocities[i].x;
            positions[i * 3 + 1] += particleVelocities[i].y;

            if (positions[i * 3] > 20 || positions[i * 3] < -20) particleVelocities[i].x *= -1;
            if (positions[i * 3 + 1] > 20 || positions[i * 3 + 1] < -20) particleVelocities[i].y *= -1;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        const linePositions = [];
        const lineColorsArray = [];

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistance * maxDistance) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                    lineColorsArray.push(
                        particleColors[i * 3], particleColors[i * 3 + 1], particleColors[i * 3 + 2],
                        particleColors[j * 3], particleColors[j * 3 + 1], particleColors[j * 3 + 2]
                    );
                }
            }
        }

        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        linesMesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColorsArray, 3));

        particles.rotation.y += 0.0002; // Rotación extremadamente sutil
        linesMesh.rotation.y += 0.0002;
        particles.rotation.x += 0.00005;
        linesMesh.rotation.x += 0.00005;

        // Limpiar manualmente antes de renderizar debido a autoClear = false
        renderer.clear();
        renderer.render(scene, camera);
    }

    animate();
}